use leptos::prelude::*;
use leptos_meta::Title;
use leptos_router::hooks::{use_navigate, use_params_map};

use super::common::TABLE_PAGE_SIZE;
use crate::{
    components::{
        nav::AdminNav,
        table::{data_table, Column},
    },
    constants::{page_title, EMAIL},
    server::{
        blogs::{
            create::CreateBlogPost,
            delete::DeleteBlogPost,
            index::{get_blog_post, list_blog_posts},
            update::{SetBlogDraft, UpdateBlogPost},
            BlogPost, BlogPostInput,
        },
        comments::CommentNode,
    },
};

/// The status chip as a real switch: flips draft state through the backend.
#[component]
fn PublishToggle(slug: String, draft: bool) -> impl IntoView {
    let set_draft = ServerAction::<SetBlogDraft>::new();
    let local_draft = RwSignal::new(draft);

    Effect::new(move |_| {
        if let Some(Err(_)) = set_draft.value().get() {
            local_draft.update(|value| *value = !*value);
        }
    });

    view! {
        <button
            type="button"
            class=move || {
                if local_draft.get() {
                    "chip-draft chip-toggle"
                } else {
                    "chip-published chip-toggle"
                }
            }
            aria-pressed=move || (!local_draft.get()).to_string()
            on:click=move |_| {
                let draft = !local_draft.get();
                local_draft.set(draft);
                set_draft
                    .dispatch(SetBlogDraft {
                        slug: slug.clone(),
                        draft,
                    });
            }
        >
            {move || if local_draft.get() { "Draft" } else { "Published" }}
        </button>
    }
}

fn blogs_table(posts: Vec<BlogPost>, delete: ServerAction<DeleteBlogPost>) -> impl IntoView {
    let columns = vec![
        Column {
            label: "Title",
            cell: |post: &BlogPost| {
                view! { <span class="entry-title">{post.title.clone()}</span> }.into_any()
            },
            sort: Some(|post| post.title.to_lowercase()),
        },
        Column {
            label: "Category",
            cell: |post| {
                view! { <span class="entry-cat">{post.category.clone().unwrap_or_default()}</span> }
                    .into_any()
            },
            sort: Some(|post| post.category.clone().unwrap_or_default().to_lowercase()),
        },
        Column {
            label: "Published",
            cell: |post| {
                view! { <span class="entry-date">{post.published.clone()}</span> }.into_any()
            },
            sort: None,
        },
        Column {
            label: "Comments",
            cell: |post| {
                view! { <span class="entry-date">{format!("💬 {}", post.comment_count)}</span> }
                    .into_any()
            },
            sort: Some(|post| format!("{:06}", post.comment_count)),
        },
        Column {
            label: "Status",
            cell: |post| {
                view! { <PublishToggle slug=post.slug.clone() draft=post.draft /> }.into_any()
            },
            sort: Some(|post| post.draft.to_string()),
        },
    ];

    data_table(
        "Blogs",
        "minmax(0, 2fr) minmax(0, 1fr) 6.5rem 5.5rem 6rem 9rem",
        columns,
        posts,
        move |post| {
            let slug = post.slug.clone();
            view! {
                <a class="row-edit" href=format!("/admin/blogs/{}", post.slug)>
                    "Edit"
                </a>
                <button
                    type="button"
                    class="button-danger small"
                    on:click=move |_| {
                        delete
                            .dispatch(DeleteBlogPost {
                                slug: slug.clone(),
                            });
                    }
                >
                    "Delete"
                </button>
            }
            .into_any()
        },
        TABLE_PAGE_SIZE,
    )
}

#[component]
pub fn AdminBlogsPage() -> impl IntoView {
    let delete = ServerAction::<DeleteBlogPost>::new();
    // Keyed on the delete action's version: a successful delete refetches.
    let posts = Resource::new(move || delete.version().get(), |_| list_blog_posts());

    view! {
        <Title text=page_title("admin / blogs") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Blogs"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                <div class="admin-toolbar">
                    <a class="button-primary" href="/admin/blogs/new">
                        "＋ New blog"
                    </a>
                </div>
                {move || {
                    delete
                        .value()
                        .get()
                        .and_then(Result::err)
                        .map(|error| {
                            view! { <p class="admin-note">{format!("delete failed: {error}")}</p> }
                        })
                }}
                <Suspense fallback=|| ()>
                    {move || {
                        posts
                            .get()
                            .map(|result| match result {
                                Ok(posts) => blogs_table(posts, delete).into_any(),
                                Err(error) => {
                                    view! {
                                        <p class="admin-note">
                                            {format!("could not load blogs: {error}")}
                                        </p>
                                    }
                                        .into_any()
                                }
                            })
                    }}
                </Suspense>
            </div>
        </div>
    }
}

fn editor_field(label: &'static str, value: RwSignal<String>) -> impl IntoView {
    view! {
        <div class="field">
            <label>{label}</label>
            <input
                type="text"
                prop:value=move || value.get()
                on:input=move |event| value.set(event_target_value(&event))
            />
        </div>
    }
}

/// The blog editor: create when `post` is `None`, edit otherwise. Save,
/// delete, and the status chip all go through the backend.
#[component]
fn BlogEditor(post: Option<BlogPost>) -> impl IntoView {
    let original_slug = post.as_ref().map(|post| post.slug.clone());
    let is_new = original_slug.is_none();

    let title = RwSignal::new(post.as_ref().map(|p| p.title.clone()).unwrap_or_default());
    let slug = RwSignal::new(post.as_ref().map(|p| p.slug.clone()).unwrap_or_default());
    let category = RwSignal::new(
        post.as_ref()
            .and_then(|p| p.category.clone())
            .unwrap_or_default(),
    );
    let tags = RwSignal::new(post.as_ref().map(|p| p.tags.join(", ")).unwrap_or_default());
    let body = RwSignal::new(post.as_ref().map(|p| p.body.clone()).unwrap_or_default());
    let draft = RwSignal::new(post.as_ref().is_none_or(|p| p.draft));

    let create = ServerAction::<CreateBlogPost>::new();
    let update = ServerAction::<UpdateBlogPost>::new();
    let delete = ServerAction::<DeleteBlogPost>::new();

    let input = move || BlogPostInput {
        slug: slug.get(),
        title: title.get(),
        category: (!category.get().is_empty()).then(|| category.get()),
        body: body.get(),
        tags: tags
            .get()
            .split(',')
            .map(str::trim)
            .filter(|tag| !tag.is_empty())
            .map(str::to_string)
            .collect(),
        draft: draft.get(),
    };

    let save = {
        let original_slug = original_slug.clone();
        move |_| {
            if let Some(original) = original_slug.clone() {
                update.dispatch(UpdateBlogPost {
                    slug: original,
                    post: input(),
                });
            } else {
                create.dispatch(CreateBlogPost { post: input() });
            }
        }
    };
    let remove = {
        move |_| {
            if let Some(original) = original_slug.clone() {
                delete.dispatch(DeleteBlogPost { slug: original });
            }
        }
    };

    // After a successful mutation: create lands on the new post's editor,
    // update and delete go back to the list.
    Effect::new(move |_| {
        let navigate = use_navigate();
        if create.value().get() == Some(Ok(())) {
            navigate(
                &format!("/admin/blogs/{}", slug.get_untracked()),
                leptos_router::NavigateOptions::default(),
            );
        } else if update.value().get() == Some(Ok(())) || delete.value().get() == Some(Ok(())) {
            navigate("/admin/blogs", leptos_router::NavigateOptions::default());
        }
    });

    let error = move || {
        [
            create.value().get(),
            update.value().get(),
            delete.value().get(),
        ]
        .into_iter()
        .flatten()
        .find_map(Result::err)
        .map(|error| view! { <p class="admin-note">{format!("failed: {error}")}</p> })
    };

    view! {
        <section class="admin-edit" aria-label="Edit blog">
            <div class="admin-edit-head">
                <div>
                    <p class="back-crumb">
                        <a href="/admin/blogs">"← ~/admin/blogs"</a>
                    </p>
                    <p class="section-index">
                        "Blogs / " {move || if is_new { "new".to_string() } else { slug.get() }}
                    </p>
                    <h2>
                        {move || {
                            if title.get().is_empty() {
                                "New blog".to_string()
                            } else {
                                title.get()
                            }
                        }}
                    </h2>
                </div>
                <button
                    type="button"
                    class=move || {
                        if draft.get() {
                            "chip-draft chip-toggle"
                        } else {
                            "chip-published chip-toggle"
                        }
                    }
                    aria-pressed=move || (!draft.get()).to_string()
                    on:click=move |_| draft.update(|value| *value = !*value)
                >
                    {move || if draft.get() { "Draft" } else { "Published" }}
                </button>
            </div>
            {error}
            <div class="admin-field-row">
                {editor_field("Title", title)} {editor_field("Slug", slug)}
                {editor_field("Category", category)} {editor_field("Tags", tags)}
            </div>
            <div class="field">
                <label>"Body"</label>
                <textarea
                    prop:value=move || body.get()
                    on:input=move |event| body.set(event_target_value(&event))
                >
                    {body.get_untracked()}
                </textarea>
            </div>
            <div class="admin-edit-footer">
                <p class="admin-note">
                    "The status chip stages publish state — it applies on save."
                </p>
                <div class="admin-action-group">
                    <Show when=move || !is_new>
                        <button type="button" class="button-danger" on:click=remove.clone()>
                            "Delete blog"
                        </button>
                    </Show>
                    <button type="button" class="button-primary" on:click=save>
                        {if is_new { "Create blog ↘" } else { "Save changes ↘" }}
                    </button>
                </div>
            </div>
        </section>
    }
}

fn comment_thread(comment: &CommentNode) -> impl IntoView {
    view! {
        <div class="msg-body">
            <p class="msg-meta">{format!("{} · {}", comment.author, comment.posted)}</p>
            <p>{comment.body.clone()}</p>
            {(!comment.replies.is_empty())
                .then(|| {
                    view! {
                        <ul class="reply-list">
                            {comment
                                .replies
                                .iter()
                                .map(|reply| {
                                    view! {
                                        <li class="reply">
                                            <p class="comment-meta">
                                                <strong>{reply.author.clone()}</strong>
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
                                })
                                .collect_view()}
                        </ul>
                    }
                })}
            <div class="field">
                <label>"Reply"</label>
                <textarea
                    rows="2"
                    placeholder=format!(
                        "@{} — posted publicly under the comment.",
                        comment.author,
                    )
                />
            </div>
            <div class="admin-action-group">
                <button type="button" class="button-danger small">
                    "Delete"
                </button>
                <button type="button" class="button-primary small">
                    "Post reply ↘"
                </button>
            </div>
        </div>
    }
}

fn comments_panel(threads: &[CommentNode]) -> impl IntoView {
    view! {
        <section class="admin-edit" aria-label="Comments on this blog">
            <div class="admin-edit-head">
                <div>
                    <p class="section-index">"Blogs / comments"</p>
                    <h2>{format!("Comments ({})", threads.len())}</h2>
                </div>
            </div>
            <p class="admin-note">
                {format!(
                    "New comments on this blog trigger an email notification to {EMAIL}. A reply is posted publicly under the comment and the commenter is notified by email.",
                )}
            </p>
            {if threads.is_empty() {
                view! { <p class="form-status">"No comments yet."</p> }.into_any()
            } else {
                threads.iter().map(comment_thread).collect_view().into_any()
            }}
        </section>
    }
}

#[component]
pub fn AdminBlogEditPage() -> impl IntoView {
    let params = use_params_map();
    let blog_id = move || params.read().get("blog_id").unwrap_or_default();
    let post = Resource::new(blog_id, |slug| async move {
        if slug == "new" {
            Ok(None)
        } else {
            get_blog_post(slug).await
        }
    });

    view! {
        <Title text=page_title("admin / blogs / edit") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Edit blog"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                <Suspense fallback=|| ()>
                    {move || {
                        post.get()
                            .map(|result| match (result, blog_id() == "new") {
                                (Ok(Some(post)), _) => {
                                    view! {
                                        <BlogEditor post=Some(post.clone()) />
                                        {comments_panel(&post.comments)}
                                    }
                                        .into_any()
                                }
                                (Ok(None), true) => view! { <BlogEditor post=None /> }.into_any(),
                                (Ok(None), false) => {
                                    view! {
                                        <p class="admin-note">"no blog post at this address"</p>
                                    }
                                        .into_any()
                                }
                                (Err(error), _) => {
                                    view! {
                                        <p class="admin-note">
                                            {format!("could not load: {error}")}
                                        </p>
                                    }
                                        .into_any()
                                }
                            })
                    }}
                </Suspense>
            </div>
        </div>
    }
}
