#![allow(clippy::missing_errors_doc, clippy::future_not_send)]

#[cfg(all(feature = "hydrate", target_arch = "wasm32"))]
mod bridge {
    use wasm_bindgen::{JsCast, JsValue};

    fn describe(error: &JsValue) -> String {
        js_sys::Reflect::get(error, &JsValue::from_str("message"))
            .ok()
            .and_then(|message| message.as_string())
            .or_else(|| error.as_string())
            .unwrap_or_else(|| "the passkey prompt was dismissed".to_string())
    }

    async fn call(method: &str, options: &str) -> Result<String, String> {
        let bridge =
            js_sys::Reflect::get(&leptos::prelude::window(), &JsValue::from_str("__passkey"))
                .map_err(|_| "passkey support did not load".to_string())?;
        if bridge.is_undefined() {
            return Err("passkey support did not load".to_string());
        }

        let function: js_sys::Function = js_sys::Reflect::get(&bridge, &JsValue::from_str(method))
            .map_err(|_| "passkey support did not load".to_string())?
            .dyn_into()
            .map_err(|_| "passkey support did not load".to_string())?;

        let promise: js_sys::Promise = function
            .call1(&bridge, &JsValue::from_str(options))
            .map_err(|error| describe(&error))?
            .dyn_into()
            .map_err(|_| "passkey support did not load".to_string())?;

        wasm_bindgen_futures::JsFuture::from(promise)
            .await
            .map_err(|error| describe(&error))?
            .as_string()
            .ok_or_else(|| "the authenticator returned nothing".to_string())
    }

    pub async fn enroll(options: &str) -> Result<String, String> {
        call("create", options).await
    }

    pub async fn authenticate(options: &str) -> Result<String, String> {
        call("get", options).await
    }
}

#[cfg(not(all(feature = "hydrate", target_arch = "wasm32")))]
mod bridge {
    pub async fn enroll(_options: &str) -> Result<String, String> {
        Err("passkeys need a browser".to_string())
    }

    pub async fn authenticate(_options: &str) -> Result<String, String> {
        Err("passkeys need a browser".to_string())
    }
}

pub use bridge::{authenticate, enroll};
