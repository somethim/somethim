use leptos::prelude::*;

pub struct Column<T: 'static> {
    pub label: &'static str,
    pub cell: fn(&T) -> AnyView,
    pub sort: Option<fn(&T) -> String>,
}

// Manual impls: the derives would needlessly require `T: Clone`/`T: Copy`,
// but a `Column` only holds a `&'static str` and function pointers.
impl<T: 'static> Clone for Column<T> {
    fn clone(&self) -> Self {
        *self
    }
}
impl<T: 'static> Copy for Column<T> {}

/// A status chip that doubles as a toggle (publish/unpublish, read/unread).
///
/// Keeps its data-specific label (e.g. the library's "Reading") until first
/// clicked, then switches between the two generic state labels.
#[must_use]
pub fn chip_toggle(
    initial_label: &'static str,
    initially_active: bool,
    active_label: &'static str,
    inactive_label: &'static str,
) -> impl IntoView {
    let active = RwSignal::new(initially_active);
    view! {
        <button
            type="button"
            class=move || {
                if active.get() { "chip-published chip-toggle" } else { "chip-draft chip-toggle" }
            }
            title=move || {
                if active.get() {
                    format!("Click to mark {}", inactive_label.to_lowercase())
                } else {
                    format!("Click to mark {}", active_label.to_lowercase())
                }
            }
            aria-pressed=move || active.get().to_string()
            on:click=move |_| active.update(|value| *value = !*value)
        >
            {move || {
                if active.get() == initially_active {
                    initial_label
                } else if active.get() {
                    active_label
                } else {
                    inactive_label
                }
            }}
        </button>
    }
}

/// `chip_toggle` for runtime labels ("Published"/"Draft" from a DB row).
#[must_use]
pub fn chip_toggle_owned(initial_label: String, initially_active: bool) -> impl IntoView {
    let active = RwSignal::new(initially_active);
    view! {
        <button
            type="button"
            class=move || {
                if active.get() { "chip-published chip-toggle" } else { "chip-draft chip-toggle" }
            }
            aria-pressed=move || active.get().to_string()
            on:click=move |_| active.update(|value| *value = !*value)
        >
            {move || {
                if active.get() == initially_active {
                    initial_label.clone()
                } else if active.get() {
                    "Published".to_string()
                } else {
                    "Draft".to_string()
                }
            }}
        </button>
    }
}

fn header_cell<T: 'static>(
    index: usize,
    column: Column<T>,
    sort_state: RwSignal<Option<(usize, bool)>>,
    page: RwSignal<usize>,
) -> AnyView {
    if column.sort.is_none() {
        return view! { <span>{column.label}</span> }.into_any();
    }
    view! {
        <button
            type="button"
            class="table-sort"
            on:click=move |_| {
                page.set(0);
                sort_state
                    .update(|state| {
                        *state = match *state {
                            Some((current, false)) if current == index => Some((index, true)),
                            Some((current, true)) if current == index => None,
                            _ => Some((index, false)),
                        };
                    });
            }
        >
            {column.label}
            <span class="sort-mark" aria-hidden="true">
                {move || match sort_state.get() {
                    Some((current, false)) if current == index => "▲",
                    Some((current, true)) if current == index => "▼",
                    _ => "",
                }}
            </span>
        </button>
    }
    .into_any()
}

pub fn data_table<T, A>(
    label: &'static str,
    widths: &'static str,
    columns: Vec<Column<T>>,
    rows: Vec<T>,
    actions: A,
    page_size: usize,
) -> impl IntoView
where
    T: Send + Sync + 'static,
    A: Fn(&T) -> AnyView + Send + Sync + 'static,
{
    let total = rows.len();
    let rows = std::sync::Arc::new(rows);
    let sort_state = RwSignal::new(None::<(usize, bool)>);
    let page = RwSignal::new(0_usize);

    let sort_columns = columns.clone();
    let sort_rows = std::sync::Arc::clone(&rows);
    let order = Memo::new(move |_| {
        let mut indices: Vec<usize> = (0..sort_rows.len()).collect();
        if let Some((column, descending)) = sort_state.get() {
            if let Some(key) = sort_columns.get(column).and_then(|column| column.sort) {
                indices.sort_by_key(|&index| key(&sort_rows[index]));
                if descending {
                    indices.reverse();
                }
            }
        }
        indices
    });

    let page_count = move || total.div_ceil(page_size).max(1);

    view! {
        <div class="admin-table" aria-label=label style=("--table-columns", widths)>
            <div class="admin-table-head">
                {columns
                    .iter()
                    .enumerate()
                    .map(|(index, column)| header_cell(index, *column, sort_state, page))
                    .collect_view()} <span />
            </div>
            {move || {
                order
                    .get()
                    .iter()
                    .skip(page.get() * page_size)
                    .take(page_size)
                    .map(|&row_index| {
                        let row = &rows[row_index];
                        view! {
                            <div class="admin-row">
                                {columns.iter().map(|column| (column.cell)(row)).collect_view()}
                                <span class="row-actions">{actions(row)}</span>
                            </div>
                        }
                    })
                    .collect_view()
            }}
            <Show when=move || { total > page_size }>
                <div class="table-pager">
                    <button
                        type="button"
                        class="button-ghost small"
                        disabled=move || { page.get() == 0 }
                        on:click=move |_| {
                            page.update(|current| *current = current.saturating_sub(1));
                        }
                    >
                        "← Prev"
                    </button>
                    <span>{move || format!("{} / {}", page.get() + 1, page_count())}</span>
                    <button
                        type="button"
                        class="button-ghost small"
                        disabled=move || { page.get() + 1 >= page_count() }
                        on:click=move |_| page.update(|current| *current += 1)
                    >
                        "Next →"
                    </button>
                </div>
            </Show>
        </div>
    }
}
