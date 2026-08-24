pub const OWNER: &str = "Arbi Kullakshi";
pub const ROLE: &str = "Software Engineer";
pub const SITE_TITLE: &str = "Arbi Kullakshi — Software Engineer";
pub const LOCATION: &str = "Tirana, Albania";
pub const TERMINAL_USER: &str = "arbi@kullakshi";
pub const EMAIL: &str = "contact@arbikullakshi.com";
pub const EMAIL_LINK: &str = "mailto:contact@arbikullakshi.com";
pub const GITHUB_URL: &str = "https://github.com/somethim";
pub const LINKEDIN_URL: &str = "https://www.linkedin.com/in/arbi-kullakshi/";
pub const CAL_URL: &str = "https://cal.com/arbikullakshi/intro";
pub const COOKIE_CONSENT_KEY: &str = "cookie-consent";
pub const THEME_STORAGE_KEY: &str = "theme";

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum Theme {
    Light,
    Dark,
}

pub const DEFAULT_THEME: Theme = Theme::Light;

impl Theme {
    #[must_use]
    pub const fn body_class(self) -> &'static str {
        match self {
            Self::Light => "light-mode",
            Self::Dark => "",
        }
    }

    #[must_use]
    pub const fn storage_value(self) -> &'static str {
        match self {
            Self::Light => "light",
            Self::Dark => "dark",
        }
    }

    #[must_use]
    pub fn from_storage(value: &str) -> Option<Self> {
        match value {
            "light" => Some(Self::Light),
            "dark" => Some(Self::Dark),
            _ => None,
        }
    }
}

#[must_use]
pub fn page_title(page: &str) -> String {
    format!("{page} — {OWNER}")
}

pub mod content;
pub mod routes;
