use std::{
    cell::{Cell, RefCell},
    rc::Rc,
    time::Duration,
};

use leptos::{ev, prelude::*};
use web_sys::wasm_bindgen::JsCast;
use web_sys::{js_sys, Element, HtmlElement};

use crate::constants::content::admin::ROBOT_CHATTER;

#[derive(Clone, Copy)]
pub struct RobotCursor(pub RwSignal<bool>);

const CURSOR_STORAGE_KEY: &str = "robot-cursor";
const PARTY_STORAGE_KEY: &str = "robot-party";

// The clamp keeps the index in bounds even if `random()` returns exactly 1.0.
#[allow(
    clippy::cast_precision_loss,
    clippy::cast_possible_truncation,
    clippy::cast_sign_loss
)]
#[must_use]
pub fn random_index(len: usize) -> usize {
    ((js_sys::Math::random() * len as f64).floor() as usize).min(len.saturating_sub(1))
}

fn slots() -> Vec<HtmlElement> {
    let mut out = Vec::new();
    if let Ok(list) = document().query_selector_all(".sprite-slot") {
        for i in 0..list.length() {
            if let Some(el) = list
                .get(i)
                .and_then(|node| node.dyn_into::<HtmlElement>().ok())
            {
                out.push(el);
            }
        }
    }
    out
}

fn console_log(message: &str, style: &str) {
    web_sys::console::log_2(&format!("%c{message}").into(), &style.into());
}

fn query_param(name: &str) -> Option<String> {
    let search = window().location().search().ok()?;
    web_sys::UrlSearchParams::new_with_str(&search)
        .ok()?
        .get(name)
}

fn init_eyes() {
    let _ = window_event_listener(ev::mousemove, |event| {
        for slot in slots() {
            let rect = slot.get_bounding_client_rect();
            let dx = f64::from(event.client_x()) - (rect.left() + rect.width() / 2.0);
            let dy = f64::from(event.client_y()) - rect.height().mul_add(0.38, rect.top());
            let distance = dx.hypot(dy).max(1.0);
            let reach = (distance / 40.0).min(1.0) * 2.5;
            let Ok(eyes) = slot.query_selector_all(".sprite-eye") else {
                continue;
            };
            for i in 0..eyes.length() {
                if let Some(eye) = eyes
                    .get(i)
                    .and_then(|node| node.dyn_into::<HtmlElement>().ok())
                {
                    let _ = eye.style().set_property(
                        "translate",
                        &format!("{}px {}px", dx / distance * reach, dy / distance * reach),
                    );
                }
            }
        }
    });
}

fn antenna_flasher() -> Rc<dyn Fn(&str)> {
    let pending: Rc<Cell<Option<TimeoutHandle>>> = Rc::new(Cell::new(None));
    Rc::new(move |color: &str| {
        for slot in slots() {
            let _ = slot.style().set_property("--tx-color", color);
            let _ = slot.class_list().add_1("typing");
        }
        if let Some(handle) = pending.take() {
            handle.clear();
        }
        let handle = set_timeout_with_handle(
            || {
                for slot in slots() {
                    let _ = slot.class_list().remove_1("typing");
                }
            },
            Duration::from_millis(300),
        );
        pending.set(handle.ok());
    })
}

fn init_clicks(flash: Rc<dyn Fn(&str)>) {
    let taps = Rc::new(Cell::new(0_u32));
    let last_tap = Rc::new(Cell::new(0.0_f64));

    let _ = window_event_listener(ev::click, move |event| {
        let slot = event
            .target()
            .and_then(|target| target.dyn_into::<Element>().ok())
            .and_then(|el| el.closest(".sprite-slot").ok().flatten())
            .and_then(|el| el.dyn_into::<HtmlElement>().ok());
        let Some(slot) = slot else {
            flash("var(--signal-blue)");
            return;
        };
        if party_active() {
            set_party(false);
            return;
        }
        if slot.class_list().contains("party") {
            return;
        }
        let _ = slot.class_list().remove_1("jump");
        let _ = slot.offset_width(); // restart the animation
        let _ = slot.class_list().add_1("jump");

        if slot.closest(".home-hero").ok().flatten().is_some() {
            let now = js_sys::Date::now();
            let count = if now - last_tap.get() < 1500.0 {
                taps.get() + 1
            } else {
                1
            };
            last_tap.set(now);
            taps.set(count);
            if count >= 7 {
                taps.set(0);
                let _ = slot.class_list().remove_1("jump");
                set_party(true);
            }
        }
    });

    let _ = window_event_listener(ev::animationend, |event| {
        if event.animation_name() == "robot-jump" {
            if let Some(slot) = event
                .target()
                .and_then(|target| target.dyn_into::<Element>().ok())
                .and_then(|el| el.closest(".sprite-slot").ok().flatten())
            {
                let _ = slot.class_list().remove_1("jump");
            }
        }
    });
}

const SNOOP_NOTE: &str = "  ▄▄▄▄▄▄▄▄\n  █ ◉  ◉ █   whoami here. caught you snooping.\n  ▀▄▄▄▄▄▄▀   since you're here, a hint:\n   ▐▌  ▐▌    ↑ ↑ ↓ ↓ ← → ← → B A\n             (the big one also answers to seven quick taps)\n             arbi@kullakshi:~$ say hi → contact@arbikullakshi.com";

fn snoop_watcher() -> Rc<dyn Fn()> {
    let last = Rc::new(Cell::new(0.0_f64));
    let caught: Rc<dyn Fn()> = Rc::new(move || {
        let now = js_sys::Date::now();
        if now - last.get() < 10_000.0 {
            return;
        }
        last.set(now);
        for slot in slots() {
            let _ = slot.class_list().add_1("alert");
            set_timeout(
                move || {
                    let _ = slot.class_list().remove_1("alert");
                },
                Duration::from_secs(4),
            );
        }
        console_log(
            SNOOP_NOTE,
            "color:#2dd4bf;font-family:monospace;font-size:12px;line-height:1.5",
        );
    });

    let poll = Rc::clone(&caught);
    let _ = set_interval_with_handle(
        move || {
            let win = window();
            let dim = |value: Result<
                web_sys::wasm_bindgen::JsValue,
                web_sys::wasm_bindgen::JsValue,
            >| { value.ok().and_then(|v| v.as_f64()).unwrap_or(0.0) };
            let gap = (dim(win.outer_width()) - dim(win.inner_width()))
                .max(dim(win.outer_height()) - dim(win.inner_height()));
            if gap > 170.0 {
                poll();
            }
        },
        Duration::from_millis(700),
    );

    caught
}

fn freeze_pose_and_slump(slot: &HtmlElement) {
    // Freeze the current animated pose as inline styles first, so the
    // transition into the slump starts from where the robot visually is.
    let (mut tx, mut ty) = (0.0_f64, 0.0_f64);
    if let Ok(Some(computed)) = window().get_computed_style(slot) {
        let transform = computed.get_property_value("transform").unwrap_or_default();
        if let Some(parts) = transform.strip_prefix("matrix(") {
            let parts: Vec<&str> = parts.trim_end_matches(')').split(',').collect();
            tx = parts
                .get(4)
                .and_then(|p| p.trim().parse().ok())
                .unwrap_or(0.0);
            ty = parts
                .get(5)
                .and_then(|p| p.trim().parse().ok())
                .unwrap_or(0.0);
        }
        let translate = computed.get_property_value("translate").unwrap_or_default();
        if !translate.is_empty() && translate != "none" {
            let mut parts = translate.split_whitespace();
            let px = |part: Option<&str>| {
                part.and_then(|p| p.trim_end_matches("px").parse::<f64>().ok())
                    .unwrap_or(0.0)
            };
            tx += px(parts.next());
            ty += px(parts.next());
        }
        let rotate = computed.get_property_value("rotate").unwrap_or_default();
        let frozen = if rotate.is_empty() || rotate == "none" {
            "0deg"
        } else {
            &rotate
        };
        let _ = slot.style().set_property("rotate", frozen);
    }
    let _ = slot
        .style()
        .set_property("translate", &format!("{tx}px {ty}px"));
    let _ = slot.class_list().remove_1("drowsy");
    let _ = slot.class_list().add_1("asleep");
    let _ = slot.offset_width(); // commit the frozen pose
    let _ = slot.style().remove_property("rotate");
    let _ = slot.style().remove_property("translate");
}

fn sleep_manager() -> Rc<dyn Fn()> {
    let drowsy: Rc<Cell<Option<TimeoutHandle>>> = Rc::new(Cell::new(None));
    let asleep: Rc<Cell<Option<TimeoutHandle>>> = Rc::new(Cell::new(None));

    Rc::new(move || {
        for slot in slots() {
            if slot.class_list().contains("asleep") {
                let _ = slot.class_list().add_1("waking");
                let waking = slot.clone();
                set_timeout(
                    move || {
                        let _ = waking.class_list().remove_1("waking");
                    },
                    Duration::from_millis(1150),
                );
            }
            let _ = slot.class_list().remove_2("drowsy", "asleep");
        }
        if let Some(handle) = drowsy.take() {
            handle.clear();
        }
        if let Some(handle) = asleep.take() {
            handle.clear();
        }
        drowsy.set(
            set_timeout_with_handle(
                || {
                    for slot in slots() {
                        let _ = slot.class_list().add_1("drowsy");
                    }
                },
                Duration::from_secs(18),
            )
            .ok(),
        );
        asleep.set(
            set_timeout_with_handle(
                || {
                    for slot in slots() {
                        freeze_pose_and_slump(&slot);
                    }
                },
                Duration::from_secs(30),
            )
            .ok(),
        );
    })
}

const KONAMI: [&str; 10] = [
    "arrowup",
    "arrowup",
    "arrowdown",
    "arrowdown",
    "arrowleft",
    "arrowright",
    "arrowleft",
    "arrowright",
    "b",
    "a",
];

fn init_keys(flash: Rc<dyn Fn(&str)>, caught: Rc<dyn Fn()>, robot_cursor: RwSignal<bool>) {
    let position = Rc::new(Cell::new(0_usize));
    let _ = window_event_listener(ev::keydown, move |event| {
        let key = event.key();
        match key.as_str() {
            "Backspace" | "Delete" => flash("var(--flash-red)"),
            "Enter" => flash("var(--flash-green)"),
            _ => flash("var(--signal-warm)"),
        }

        let lower = key.to_lowercase();
        if key == "F12"
            || (event.ctrl_key() && event.shift_key() && matches!(lower.as_str(), "i" | "j" | "c"))
        {
            caught();
        }

        let pos = position.get();
        let next = if lower == KONAMI[pos] {
            pos + 1
        } else {
            usize::from(lower == KONAMI[0])
        };
        if next >= KONAMI.len() {
            position.set(0);
            robot_cursor.update(|active| *active = !*active);
        } else {
            position.set(next);
        }
    });
}

fn apply_robot_cursor(active: bool, quiet: bool) {
    if let Some(body) = document().body() {
        let _ = body.class_list().toggle_with_force("robot-cursor", active);
    }
    if let Ok(Some(storage)) = window().local_storage() {
        if active {
            let _ = storage.set_item(CURSOR_STORAGE_KEY, "1");
        } else {
            let _ = storage.remove_item(CURSOR_STORAGE_KEY);
        }
    }
    if quiet {
        return;
    }
    for slot in slots() {
        let _ = slot.class_list().add_1("party");
        set_timeout(
            move || {
                let _ = slot.class_list().remove_1("party");
            },
            Duration::from_millis(if active { 4000 } else { 1200 }),
        );
    }
    console_log(
        if active {
            "whoami: beep boop — welcome to the collective."
        } else {
            "whoami: powering down — see you around, human."
        },
        "color:#2dd4bf;font-family:monospace;font-size:12px",
    );
}

fn party_active() -> bool {
    document()
        .body()
        .is_some_and(|body| body.class_list().contains("robot-party"))
}

fn set_party(active: bool) {
    if let Some(body) = document().body() {
        let _ = body.class_list().toggle_with_force("robot-party", active);
    }
    if let Ok(Some(storage)) = window().local_storage() {
        if active {
            let _ = storage.set_item(PARTY_STORAGE_KEY, "1");
        } else {
            let _ = storage.remove_item(PARTY_STORAGE_KEY);
        }
    }
}

fn stored_party_active() -> bool {
    window()
        .local_storage()
        .ok()
        .flatten()
        .and_then(|storage| storage.get_item(PARTY_STORAGE_KEY).ok().flatten())
        .is_some()
}

fn stored_cursor_active() -> bool {
    window()
        .local_storage()
        .ok()
        .flatten()
        .and_then(|storage| storage.get_item(CURSOR_STORAGE_KEY).ok().flatten())
        .is_some()
}

struct Chatter {
    phase: ChatterPhase,
    deadline: f64,
    line: &'static str,
    typed: usize,
}

enum ChatterPhase {
    Waiting,
    Typing,
    Showing,
}

fn chatter_host() -> Option<HtmlElement> {
    let doc = document();
    doc.query_selector(".home-hero .sprite-slot")
        .ok()
        .flatten()
        .or_else(|| doc.query_selector(".nav-robot").ok().flatten())
        .and_then(|el| el.dyn_into::<HtmlElement>().ok())
}

fn chatter_bubble(host: &HtmlElement) -> Option<HtmlElement> {
    if let Ok(Some(bubble)) = host.query_selector(".robot-bubble") {
        return bubble.dyn_into::<HtmlElement>().ok();
    }
    let bubble = document().create_element("div").ok()?;
    bubble.set_class_name("robot-bubble");
    let _ = bubble.set_attribute("aria-hidden", "true");
    let _ = host.append_child(&bubble);
    bubble.dyn_into::<HtmlElement>().ok()
}

fn chatter_tick(state: &Rc<RefCell<Chatter>>) {
    let now = js_sys::Date::now();
    let mut chatter = state.borrow_mut();
    if now < chatter.deadline {
        return;
    }
    let Some(host) = chatter_host() else {
        chatter.deadline = now + 10_000.0;
        return;
    };
    match chatter.phase {
        ChatterPhase::Waiting => {
            let class = host
                .query_selector(".sprite-slot")
                .ok()
                .flatten()
                .map_or_else(|| host.class_name(), |slot| slot.class_name());
            if ["asleep", "drowsy", "party", "alert"]
                .iter()
                .any(|s| class.contains(s))
            {
                chatter.deadline = now + 10_000.0;
                return;
            }
            chatter.line = ROBOT_CHATTER[random_index(ROBOT_CHATTER.len())];
            chatter.typed = 0;
            chatter.phase = ChatterPhase::Typing;
        }
        ChatterPhase::Typing => {
            chatter.typed += 1;
            let text: String = chatter.line.chars().take(chatter.typed).collect();
            if let Some(bubble) = chatter_bubble(&host) {
                let _ = bubble.class_list().add_1("show");
                bubble.set_text_content(Some(&text));
            }
            if chatter.typed >= chatter.line.chars().count() {
                chatter.phase = ChatterPhase::Showing;
                chatter.deadline = now + 3800.0;
            } else {
                chatter.deadline = js_sys::Math::random().mul_add(28.0, now + 22.0);
            }
        }
        ChatterPhase::Showing => {
            if let Some(bubble) = chatter_bubble(&host) {
                let _ = bubble.class_list().remove_1("show");
            }
            chatter.phase = ChatterPhase::Waiting;
            chatter.deadline = js_sys::Math::random().mul_add(40_000.0, now + 35_000.0);
        }
    }
}

fn init_chatter() {
    let first_delay = if query_param("chatter").as_deref() == Some("now") {
        300.0
    } else {
        js_sys::Math::random().mul_add(13_000.0, 12_000.0)
    };
    let state = Rc::new(RefCell::new(Chatter {
        phase: ChatterPhase::Waiting,
        deadline: js_sys::Date::now() + first_delay,
        line: "",
        typed: 0,
    }));
    let _ = set_interval_with_handle(move || chatter_tick(&state), Duration::from_millis(40));
}

#[component]
pub fn Behaviors() -> impl IntoView {
    let robot_cursor = expect_context::<RobotCursor>().0;
    let quiet_next = StoredValue::new(true);

    Effect::new(move |_| {
        let flash = antenna_flasher();
        let caught = snoop_watcher();
        let restart_sleep = sleep_manager();

        // Log the note once at startup: browsers buffer console output, so it
        // is always waiting whenever the console is opened — the size-gap and
        // shortcut detection only cover *docked* devtools and can miss (e.g.
        // right-click → Inspect into an undocked window).
        console_log(
            SNOOP_NOTE,
            "color:#2dd4bf;font-family:monospace;font-size:12px;line-height:1.5",
        );

        init_eyes();
        init_clicks(Rc::clone(&flash));
        init_keys(flash, caught, robot_cursor);
        init_chatter();

        let restart = Rc::clone(&restart_sleep);
        let _ = window_event_listener(ev::mousemove, move |_| restart());
        let restart = Rc::clone(&restart_sleep);
        let _ = window_event_listener(ev::keydown, move |_| restart());
        let restart = Rc::clone(&restart_sleep);
        let _ = window_event_listener(ev::click, move |_| restart());
        let restart = Rc::clone(&restart_sleep);
        let _ = window_event_listener(ev::scroll, move |_| restart());
        let restart = Rc::clone(&restart_sleep);
        let _ = window_event_listener(ev::touchstart, move |_| restart());
        restart_sleep();

        if stored_party_active() {
            set_party(true);
        }
        if stored_cursor_active() {
            robot_cursor.set(true);
            apply_robot_cursor(true, true);
        }
    });

    Effect::new(move |prev: Option<bool>| {
        let active = robot_cursor.get();
        if prev.is_none() {
            return active;
        }
        let quiet = quiet_next.get_value() && active;
        quiet_next.set_value(false);
        apply_robot_cursor(active, quiet);
        active
    });
}
