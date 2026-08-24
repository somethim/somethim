use leptos::prelude::*;

use crate::components::TypedText;
use leptos_meta::Title;

use crate::constants::{content::client::TOOLBOX, page_title};

#[component]
pub fn NowPage() -> impl IntoView {
    view! {
        <Title text=page_title("now") />
        <div class="page-heading">
            <p class="section-index">"05 / Now"</p>
            <h1 class="page-title page-title-path">
                <TypedText text="~/now" />
                <span class="title-cursor" />
            </h1>
        </div>
        <div class="card-list">
            <div class="card">
                <pre class="term" aria-label="Current status">
                    <span class="term-prompt">"arbi@kullakshi:~$"</span>
                    " systemctl status arbi.service\n"
                    <span class="term-ok">"●"</span>
                    " arbi.service — software engineer\n"
                    <span class="term-key">"   Loaded:"</span>
                    " loaded (/home/arbi; enabled; preset: curious)\n"
                    <span class="term-key">"   Active:"</span>
                    " "
                    <span class="term-ok">"active (running)"</span>
                    " — Tirana, Albania\n"
                    <span class="term-key">"    Tasks:"</span>
                    " 3 of ∞\n"
                    <span class="term-key">"   Memory:"</span>
                    " rust is borrowing most of it\n"
                    <span class="term-key">"      CPU:"</span>
                    " 10× real time (simulation only)"
                </pre>
            </div>
            <div class="card">
                <div class="card-header">
                    <div>
                        <h2 class="card-title">"Building"</h2>
                        <p class="card-subtitle">"What has my attention right now"</p>
                    </div>
                    <span class="card-meta">"Aug 2026"</span>
                </div>
                <div class="card-body">
                    <p>
                        "Rewriting this site in Leptos — server-rendered Rust; the design prototype you are looking at is the blueprint."
                    </p>
                    <p>
                        "Simulation-first robotics: teaching an autonomous robot to misbehave at 10× real time, where mistakes are free."
                    </p>
                </div>
                <div class="tags">
                    <span class="tag">"Rust"</span>
                    <span class="tag">"Leptos"</span>
                    <span class="tag">"Robotics"</span>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div>
                        <h2 class="card-title">"Toolbox"</h2>
                        <p class="card-subtitle">
                            "Daily drivers — the desk setup behind the commits"
                        </p>
                    </div>
                </div>
                <div class="tags">
                    {TOOLBOX
                        .iter()
                        .map(|tag| view! { <span class="tag">{*tag}</span> })
                        .collect_view()}
                </div>
            </div>
            <a class="card" href="/library">
                <div class="card-header">
                    <div>
                        <h2 class="card-title">"Reading"</h2>
                        <p class="card-subtitle">"The current queue lives on the bookshelf →"</p>
                    </div>
                </div>
            </a>
        </div>
    }
}
