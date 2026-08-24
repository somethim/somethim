use std::time::Duration;

use leptos::prelude::*;

/// Types `text` character by character after mount. Server and hydration both
/// render the slot empty — the same as the design prototype — so the text
/// never flashes complete and then retypes ("double load").
#[component]
pub fn TypedText(text: &'static str, #[prop(default = 60)] step_ms: u64) -> impl IntoView {
    let total = text.chars().count();
    let shown = RwSignal::new(0);
    let ticker = StoredValue::new(None::<IntervalHandle>);

    Effect::new(move |_| {
        let handle = set_interval_with_handle(
            move || {
                let next = shown.get_untracked() + 1;
                shown.set(next);
                if next >= total {
                    if let Some(handle) = ticker.get_value() {
                        handle.clear();
                    }
                }
            },
            Duration::from_millis(step_ms),
        );
        ticker.set_value(handle.ok());
    });
    on_cleanup(move || {
        if let Some(handle) = ticker.get_value() {
            handle.clear();
        }
    });

    view! { <span>{move || text.chars().take(shown.get()).collect::<String>()}</span> }
}

const HERO_COMMAND: &str = "whoami";
const COMMAND_TICKS_PER_CHAR: u32 = 3;
const PAUSE_TICKS: u32 = 12;
const NAME_TICKS_PER_CHAR: u32 = 2;

#[component]
pub fn HeroTyped(name: &'static str) -> impl IntoView {
    let display = RwSignal::new(String::new());
    let tick = RwSignal::new(0u32);
    let ticker = StoredValue::new(None::<IntervalHandle>);

    let command_len = u32::try_from(HERO_COMMAND.chars().count()).unwrap_or(u32::MAX);
    let name_len = u32::try_from(name.chars().count()).unwrap_or(u32::MAX);
    let command_done = command_len * COMMAND_TICKS_PER_CHAR;
    let name_start = command_done + PAUSE_TICKS;
    let total = name_start + name_len * NAME_TICKS_PER_CHAR;

    Effect::new(move |_| {
        let handle = set_interval_with_handle(
            move || {
                let now = tick.get_untracked() + 1;
                tick.set(now);
                let text = if now <= command_done {
                    HERO_COMMAND
                        .chars()
                        .take((now / COMMAND_TICKS_PER_CHAR) as usize)
                        .collect()
                } else if now < name_start {
                    HERO_COMMAND.to_string()
                } else {
                    name.chars()
                        .take(((now - name_start) / NAME_TICKS_PER_CHAR) as usize)
                        .collect()
                };
                display.set(text);
                if now >= total {
                    display.set(name.to_string());
                    if let Some(handle) = ticker.get_value() {
                        handle.clear();
                    }
                }
            },
            Duration::from_millis(45),
        );
        ticker.set_value(handle.ok());
    });
    on_cleanup(move || {
        if let Some(handle) = ticker.get_value() {
            handle.clear();
        }
    });

    view! { <span>{move || display.get()}</span> }
}
