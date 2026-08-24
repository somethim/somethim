mod behaviors;
mod cookies;
pub mod footer;
pub mod layout;
pub mod nav;
mod robot;
pub mod table;
mod theme_toggle;
mod typed;

pub use behaviors::{random_index, Behaviors, RobotCursor};
pub use cookies::CookieConsent;
pub use robot::NavRobot;
pub use theme_toggle::ThemeToggle;
pub use typed::{HeroTyped, TypedText};
