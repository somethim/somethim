use leptos::prelude::*;
use leptos_router::hooks::use_params_map;

use crate::components::TypedText;
use leptos_meta::Title;

use crate::{
    constants::{content::client::BLOG_FILTERS, page_title, OWNER},
    server::{
        blogs::{index::list_blog_posts, BlogPost},
        comments::{CommentNode, CommentReplyNode},
    },
};

fn topic_class(category: &str) -> &'static str {
    let category = category.to_ascii_lowercase();
    if category.contains("laravel") || category.contains("platform") {
        "card-topline warm"
    } else if category.contains("research") {
        "card-topline lavender"
    } else {
        "card-topline"
    }
}

fn post_card(post: &BlogPost) -> impl IntoView {
    let category = post.category.clone().unwrap_or_default();
    let summary = post
        .body
        .split("\n\n")
        .next()
        .unwrap_or_default()
        .to_string();
    view! {
        <a class="card" href=format!("/blog/{}", post.slug)>
            <p class=topic_class(&category)>{category.clone()}</p>
            <div class="card-header">
                <div>
                    <h2 class="card-title">{post.title.clone()}</h2>
                    <p class="post-meta">
                        <span>{post.published.clone()}</span>
                        {post.reading_time.clone().map(|time| view! { <span>{time}</span> })}
                        <span class="tag comment-count">
                            {format!("💬 {}", post.comment_count)}
                        </span>
                        {post.draft.then(|| view! { <span class="tag chip-draft">"draft"</span> })}
                    </p>
                </div>
            </div>
            <div class="card-body">
                <p>{summary}</p>
            </div>
            <div class="tags">
                {post
                    .tags
                    .iter()
                    .map(|tag| view! { <span class="tag">{tag.clone()}</span> })
                    .collect_view()}
            </div>
        </a>
    }
}

fn matches_filter(selected: &str, category: Option<&str>, tags: &[String]) -> bool {
    selected == "all"
        || category.is_some_and(|category| category.to_ascii_lowercase().contains(selected))
        || tags.iter().any(|tag| tag.to_ascii_lowercase() == selected)
}

fn db_cards(posts: Vec<BlogPost>, selected_filter: RwSignal<&'static str>) -> impl IntoView {
    view! {
        {move || {
            posts
                .iter()
                .filter(|post| {
                    matches_filter(selected_filter.get(), post.category.as_deref(), &post.tags)
                })
                .map(post_card)
                .collect_view()
        }}
    }
}

#[component]
pub fn BlogPage() -> impl IntoView {
    let selected_filter = RwSignal::new("all");
    let posts = Resource::new(|| (), |()| list_blog_posts());

    view! {
        <Title text=page_title("blog") />
        <div class="page-heading">
            <p class="section-index">"04 / Writing"</p>
            <h1 class="page-title page-title-path">
                <TypedText text="~/blog" />
                <span class="title-cursor" />
            </h1>
        </div>
        <div class="tag-filter" aria-label="Filter posts by tag">
            {BLOG_FILTERS
                .iter()
                .map(|filter| {
                    let filter = *filter;
                    view! {
                        <button
                            type="button"
                            class=move || (selected_filter.get() == filter).then_some("active")
                            aria-pressed=move || (selected_filter.get() == filter).to_string()
                            on:click=move |_| selected_filter.set(filter)
                        >
                            {filter}
                        </button>
                    }
                })
                .collect_view()}
        </div>
        <div class="card-list">
            <Suspense fallback=|| ()>
                {move || {
                    posts
                        .get()
                        .map(|result| {
                            result
                                .map_or_else(
                                    |_| {
                                        view! {
                                            <p class="form-status">
                                                "Posts are unavailable right now — try again shortly."
                                            </p>
                                        }
                                            .into_any()
                                    },
                                    |posts| db_cards(posts, selected_filter).into_any(),
                                )
                        })
                }}
            </Suspense>
        </div>
    }
}

fn reply_item(reply: &CommentReplyNode) -> impl IntoView {
    view! {
        <li class="reply">
            <p class="comment-meta">
                <strong>{reply.author.clone()}</strong>
                {(reply.author == OWNER)
                    .then(|| view! { <span class="author-tag">"author"</span> })}
                <span>{reply.posted.clone()}</span>
            </p>
            <p class="comment-body">
                {reply
                    .replying_to
                    .clone()
                    .map(|name| {
                        view! {
                            <span class="mention">{format!("@{name}")}</span>
                            " "
                        }
                    })} {reply.body.clone()}
            </p>
        </li>
    }
}

#[component]
fn CommentItem(comment: CommentNode) -> impl IntoView {
    let expanded = RwSignal::new(false);
    let reply_count = comment.replies.len();
    let replies = StoredValue::new(comment.replies);

    view! {
        <li class="comment">
            <p class="comment-meta">
                <strong>{comment.author}</strong>
                <span>{comment.posted}</span>
            </p>
            <p class="comment-body">{comment.body}</p>
            <Show when=move || reply_count != 0>
                <button
                    type="button"
                    class="show-replies"
                    aria-expanded=move || expanded.get().to_string()
                    on:click=move |_| expanded.update(|open| *open = !*open)
                >
                    {move || {
                        if expanded.get() {
                            "Hide replies".to_string()
                        } else {
                            format!("Show replies ({reply_count})")
                        }
                    }}
                </button>
                <Show when=move || expanded.get()>
                    <ul class="reply-list">
                        {replies
                            .with_value(|replies| replies.iter().map(reply_item).collect_view())}
                    </ul>
                </Show>
            </Show>
        </li>
    }
}

#[derive(Clone, Copy, PartialEq, Eq)]
enum CommentStage {
    Email,
    Code,
    Compose,
}

#[component]
fn CommentForm() -> impl IntoView {
    let stage = RwSignal::new(CommentStage::Email);

    view! {
        <form class="comment-form">
            <Show when=move || stage.get() == CommentStage::Email>
                <div class="comment-form-fields">
                    <div class="field">
                        <label for="comment-email">"Email"</label>
                        <input
                            id="comment-email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                        />
                    </div>
                    <div class="field">
                        <label for="comment-name">"Name (optional)"</label>
                        <input id="comment-name" name="name" autocomplete="name" />
                    </div>
                </div>
                <div class="comment-form-footer">
                    <p class="form-status">
                        "Commenting needs a verified email — a 6-digit code will be sent to it. Never shown publicly."
                    </p>
                    <button
                        type="button"
                        class="button-primary"
                        on:click=move |_| stage.set(CommentStage::Code)
                    >
                        "Send code ↘"
                    </button>
                </div>
            </Show>
            <Show when=move || stage.get() == CommentStage::Code>
                <div class="field">
                    <label for="comment-code">"Verification code"</label>
                    <input
                        id="comment-code"
                        name="code"
                        inputmode="numeric"
                        autocomplete="one-time-code"
                        maxlength="6"
                        placeholder="6-digit code from your inbox"
                        required
                    />
                </div>
                <div class="comment-form-footer">
                    <p class="form-status">"Code sent — it expires in 10 minutes."</p>
                    <div class="admin-action-group">
                        <button
                            type="button"
                            class="button-ghost small"
                            on:click=move |_| stage.set(CommentStage::Email)
                        >
                            "Use a different email"
                        </button>
                        <button
                            type="button"
                            class="button-primary"
                            on:click=move |_| stage.set(CommentStage::Compose)
                        >
                            "Verify ↘"
                        </button>
                    </div>
                </div>
            </Show>
            <Show when=move || stage.get() == CommentStage::Compose>
                <div class="field">
                    <label for="comment-body-input">"Comment"</label>
                    <textarea id="comment-body-input" name="comment" required />
                </div>
                <div class="comment-form-footer">
                    <p class="form-status">
                        "Email verified — you can comment for the rest of this session."
                    </p>
                    <button type="button" class="button-primary">
                        "Post comment ↘"
                    </button>
                </div>
            </Show>
        </form>
    }
}

fn render_body_block(block: &str) -> AnyView {
    let block = block.trim();
    if let Some(code) = block
        .strip_prefix("```")
        .and_then(|b| b.strip_suffix("```"))
    {
        let code = code.trim_start_matches(|c| c != '\n').trim().to_string();
        return view! {
            <pre>
                <code>{code}</code>
            </pre>
        }
        .into_any();
    }
    if let Some(heading) = block.strip_prefix("## ") {
        return view! { <h2>{heading.to_string()}</h2> }.into_any();
    }
    if let Some(quote) = block.strip_prefix("> ") {
        return view! { <blockquote>{quote.to_string()}</blockquote> }.into_any();
    }
    if block.starts_with("- ") {
        let items = block
            .lines()
            .filter_map(|line| line.strip_prefix("- "))
            .map(|item| view! { <li>{item.to_string()}</li> })
            .collect_view();
        return view! { <ul>{items}</ul> }.into_any();
    }
    view! { <p>{block.to_string()}</p> }.into_any()
}

fn body_blocks(body: &str) -> Vec<String> {
    let mut blocks = Vec::new();
    let mut fence: Option<String> = None;
    for chunk in body.split("\n\n") {
        match &mut fence {
            Some(open) => {
                open.push_str("\n\n");
                open.push_str(chunk);
                if chunk.trim_end().ends_with("```") {
                    blocks.push(fence.take().unwrap_or_default());
                }
            }
            None if chunk.trim_start().starts_with("```") && !chunk.trim_end().ends_with("```") => {
                fence = Some(chunk.to_string());
            }
            None => blocks.push(chunk.to_string()),
        }
    }
    if let Some(rest) = fence {
        blocks.push(rest);
    }
    blocks
}

/// The database-backed post view. The route's reference implementation:
/// data arrives through [`crate::server::blogs::index::get_blog_post`].
fn db_post_view(post: &crate::server::blogs::BlogPost) -> impl IntoView {
    view! {
        <Title text=page_title(&post.title) />
        <article>
            <header class="post-header">
                <p class="back-crumb">
                    <a href="/blog">"← ~/blog"</a>
                </p>
                <p class="card-topline">{post.category.clone().unwrap_or_default()}</p>
                <h1>{post.title.clone()}</h1>
                <p class="post-meta">
                    <span>{post.published.clone()}</span>
                    {post.reading_time.clone().map(|time| view! { <span>{time}</span> })}
                    {post
                        .draft
                        .then(|| {
                            view! {
                                <span class="tag chip-draft">
                                    "draft — only you can see this"
                                </span>
                            }
                        })}
                </p>
            </header>
            <div class="prose">
                {body_blocks(&post.body)
                    .iter()
                    .map(|block| render_body_block(block))
                    .collect_view()}
            </div>
            <div class="tags">
                {post
                    .tags
                    .iter()
                    .map(|tag| view! { <span class="tag">{tag.clone()}</span> })
                    .collect_view()}
            </div>
            {neighbor_footer("/blog", post.previous.clone(), post.next.clone())}
        </article>
    }
}

// Shared shape for detail pages; projects and experience reuse it when
// their routes connect.
fn neighbor_footer(
    base: &'static str,
    previous: Option<crate::server::EntryLink>,
    next: Option<crate::server::EntryLink>,
) -> impl IntoView {
    let link = move |entry: Option<crate::server::EntryLink>, arrow_left: bool| {
        entry.map_or_else(
            || view! { <span /> }.into_any(),
            |entry| {
                let label = if arrow_left {
                    format!("← {}", entry.title)
                } else {
                    format!("{} →", entry.title)
                };
                view! { <a href=format!("{base}/{}", entry.slug)>{label}</a> }.into_any()
            },
        )
    };
    view! { <footer class="post-footer">{link(previous, true)} {link(next, false)}</footer> }
}

fn post_not_found() -> impl IntoView {
    view! {
        <Title text=page_title("not found") />
        <div class="page-heading">
            <p class="back-crumb">
                <a href="/blog">"← ~/blog"</a>
            </p>
            <h1 class="page-title">"post not found"</h1>
        </div>
        <p class="home-summary">"No published post lives at this address."</p>
    }
}

#[component]
pub fn BlogPostPage() -> impl IntoView {
    let params = use_params_map();
    // One request for the whole page: comments ride inside the post payload.
    let page = Resource::new(
        move || params.read().get("blog_id").unwrap_or_default(),
        crate::server::blogs::index::get_blog_post,
    );

    view! {
        <Suspense fallback=|| ()>
            {move || {
                page.get()
                    .map(|result| match result {
                        Ok(Some(post)) => {
                            let comments = post.comments.clone();
                            view! {
                                {db_post_view(&post)}
                                <section class="post-comments" aria-label="Comments">
                                    <h2 class="comments-title">
                                        {format!("Comments ({})", comments.len())}
                                    </h2>
                                    <Show when={
                                        let empty = comments.is_empty();
                                        move || empty
                                    }>
                                        <p class="form-status">
                                            "No comments yet — be the first."
                                        </p>
                                    </Show>
                                    <ul class="comment-list">
                                        {comments
                                            .into_iter()
                                            .map(|comment| view! { <CommentItem comment /> })
                                            .collect_view()}
                                    </ul>
                                    <CommentForm />
                                </section>
                            }
                                .into_any()
                        }
                        Ok(None) => post_not_found().into_any(),
                        Err(_) => {
                            view! {
                                <p class="form-status">
                                    "This post is unavailable right now — try again shortly."
                                </p>
                            }
                                .into_any()
                        }
                    })
            }}
        </Suspense>
    }
}

#[cfg(test)]
mod tests {
    use super::{body_blocks, matches_filter};

    #[test]
    fn paragraphs_split_on_blank_lines() {
        assert_eq!(body_blocks("one\n\ntwo\n\nthree").len(), 3);
    }

    #[test]
    fn single_chunk_code_fence_is_one_block() {
        let blocks = body_blocks("intro\n\n```\nlet x = 1;\n```\n\noutro");
        assert_eq!(blocks.len(), 3);
        assert!(blocks[1].starts_with("```"));
    }

    #[test]
    fn fence_containing_blank_lines_stays_one_block() {
        let body = "before\n\n```\nfn a() {}\n\nfn b() {}\n```\n\nafter";
        let blocks = body_blocks(body);
        assert_eq!(
            blocks.len(),
            3,
            "the fence must not split on its inner blank line"
        );
        assert!(blocks[1].contains("fn a") && blocks[1].contains("fn b"));
    }

    #[test]
    fn unterminated_fence_is_flushed() {
        let blocks = body_blocks("```\nbroken\n\nstill inside");
        assert_eq!(blocks.len(), 1);
        assert!(blocks[0].contains("still inside"));
    }

    #[test]
    fn filter_all_matches_everything() {
        assert!(matches_filter("all", None, &[]));
    }

    #[test]
    fn filter_matches_category_substring_and_exact_tag() {
        let tags = vec!["rust".to_string(), "tokio".to_string()];
        assert!(matches_filter("robotics", Some("Robotics · Rust"), &tags));
        assert!(matches_filter("rust", None, &tags));
        assert!(!matches_filter("laravel", Some("Robotics · Rust"), &tags));
        assert!(!matches_filter("rus", None, &tags));
    }
}
