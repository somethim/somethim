use crate::constants::{
    content::client::{Detail, ProseBlock},
    page_title,
};
use leptos::prelude::*;
use leptos_meta::Title;

fn render_block(block: &ProseBlock) -> AnyView {
    match block {
        ProseBlock::Heading(heading) => view! { <h2>{*heading}</h2> }.into_any(),
        ProseBlock::Paragraph(paragraph) => view! { <p>{*paragraph}</p> }.into_any(),
        ProseBlock::List(items) => {
            view! { <ul>{items.iter().map(|item| view! { <li>{*item}</li> }).collect_view()}</ul> }
                .into_any()
        }
        ProseBlock::Quote(quote) => view! { <blockquote>{*quote}</blockquote> }.into_any(),
        ProseBlock::Code(code) => view! {
            <pre>
                <code>{*code}</code>
            </pre>
        }
        .into_any(),
        ProseBlock::Media(media) => view! {
            <figure class="media">
                <div class="media-frame">
                    <span class="media-label">{media.label}</span>
                </div>
                <figcaption class="media-caption">{media.caption}</figcaption>
            </figure>
        }
        .into_any(),
        ProseBlock::MediaGrid(items) => view! {
            <div class="media-grid">
                {items
                    .iter()
                    .map(|media| {
                        view! {
                            <div>
                                <div class="media-frame">
                                    <span class="media-label">{media.label}</span>
                                </div>
                                <p class="media-caption">{media.caption}</p>
                            </div>
                        }
                    })
                    .collect_view()}
            </div>
        }
        .into_any(),
    }
}

pub(super) fn detail_page(detail: Detail) -> impl IntoView {
    view! {
        <Title text=page_title(detail.title) />
        <article>
            <header class="post-header">
                <p class="back-crumb">
                    <a href=detail.back_href>{detail.back_label}</a>
                </p>
                <p class="card-topline">{detail.topline}</p>
                <h1>{detail.title}</h1>
                <p class="post-meta">
                    {detail.meta.iter().map(|item| view! { <span>{*item}</span> }).collect_view()}
                </p>
                <Show when=move || detail.tags_in_header || detail.source.is_some()>
                    <div class="detail-actions">
                        {detail
                            .source
                            .map(|source| {
                                view! {
                                    <a
                                        class="button-outline"
                                        href=source.href
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {source.label}
                                    </a>
                                }
                            })}
                        {detail
                            .tags
                            .iter()
                            .map(|tag| view! { <span class="tag">{*tag}</span> })
                            .collect_view()}
                    </div>
                </Show>
            </header>
            <Show when=move || !detail.facts.is_empty()>
                <div class="facts">
                    {detail
                        .facts
                        .iter()
                        .map(|fact| {
                            view! {
                                <div>
                                    <strong>{fact.value}</strong>
                                    <span>{fact.label}</span>
                                </div>
                            }
                        })
                        .collect_view()}
                </div>
            </Show>
            <div class="prose">{detail.blocks.iter().map(render_block).collect_view()}</div>
            <Show when=move || !detail.tags_in_header>
                <div class="tags">
                    {detail
                        .tags
                        .iter()
                        .map(|tag| view! { <span class="tag">{*tag}</span> })
                        .collect_view()}
                </div>
            </Show>
            <footer class="post-footer">
                <a href=detail.previous.href>{detail.previous.label}</a>
                <a href=detail.next.href>{detail.next.label}</a>
            </footer>
        </article>
    }
}
