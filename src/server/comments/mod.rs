#[cfg(feature = "ssr")]
pub mod repository;

use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct CommentReplyNode {
    pub author: String,
    pub replying_to: Option<String>,
    pub body: String,
    pub posted: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct CommentNode {
    pub author: String,
    pub body: String,
    pub posted: String,
    pub replies: Vec<CommentReplyNode>,
}
