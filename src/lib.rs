#![recursion_limit = "256"]

pub mod app;
pub mod components;
pub mod constants;
pub mod pages;
pub mod passkey;
// Compiled for both targets: `#[server]` functions live here, and the
// browser build needs their client stubs. Server-only internals are gated
// inside the module.
pub mod server;

#[cfg(feature = "hydrate")]
#[wasm_bindgen::prelude::wasm_bindgen]
pub fn hydrate() {
    use crate::app::App;
    console_error_panic_hook::set_once();
    leptos::mount::hydrate_body(App);
}
