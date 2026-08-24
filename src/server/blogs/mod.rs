pub mod create;
pub mod delete;
pub mod index;
#[cfg(feature = "ssr")]
pub mod repository;
pub mod update;

use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct BlogPost {
    pub slug: String,
    pub title: String,
    pub category: Option<String>,
    pub body: String,
    pub tags: Vec<String>,
    pub published: String,
    pub reading_time: Option<String>,
    pub previous: Option<crate::server::EntryLink>,
    pub next: Option<crate::server::EntryLink>,
    pub draft: bool,
    pub comment_count: i64,
    pub comments: Vec<crate::server::comments::CommentNode>,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct BlogPostInput {
    pub slug: String,
    pub title: String,
    pub category: Option<String>,
    pub body: String,
    pub tags: Vec<String>,
    pub draft: bool,
}
