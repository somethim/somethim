use leptos::prelude::*;

use crate::components::TypedText;
use leptos_meta::Title;

use crate::constants::{content::client::BOOKS, page_title};

#[component]
pub fn LibraryPage() -> impl IntoView {
    view! {
        <Title text=page_title("library") />
        <div class="page-heading">
            <p class="section-index">"03 / Reading"</p>
            <h1 class="page-title page-title-path">
                <TypedText text="~/library" />
                <span class="title-cursor" />
            </h1>
        </div>
        <div class="book-grid">
            {BOOKS
                .iter()
                .map(|book| {
                    view! {
                        <a class="card" href=book.href target="_blank" rel="noopener noreferrer">
                            <p class=book.topic_class>{book.topic}</p>
                            <div class="card-header">
                                <div>
                                    <h2 class="card-title">{book.title}</h2>
                                    <p class="book-author">{book.author}</p>
                                </div>
                                <span class=book.status_class>{book.status}</span>
                            </div>
                            <div class="card-body">
                                <p>{book.note}</p>
                            </div>
                        </a>
                    }
                })
                .collect_view()}
        </div>
    }
}
