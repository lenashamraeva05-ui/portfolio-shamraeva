"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import PortfolioHeader from "../components/PortfolioHeader";

type Category = "All" | "Operations" | "Design systems" | "Research" | "Culture";

const categories: Category[] = ["All", "Operations", "Design systems", "Research", "Culture"];

const posts = [
  {
    category: "Research" as Category,
    date: "Jul 08, 2026",
    read: "7 min read",
    title: "How I turn messy interviews into a product direction",
    excerpt: "A practical framework for finding the signal, naming the tension and keeping a decision useful long after the workshop.",
    tone: "blue",
  },
  {
    category: "Operations" as Category,
    date: "Jun 28, 2026",
    read: "5 min read",
    title: "The publishing checklist that ends last-minute rewrites",
    excerpt: "Evidence, ownership, accessibility and the quiet checks that help a team ship with confidence.",
    tone: "yellow",
  },
  {
    category: "Design systems" as Category,
    date: "Jun 15, 2026",
    read: "6 min read",
    title: "When a design system should say no",
    excerpt: "Not every exception is a failure. A small set of deliberate boundaries can make a system more useful.",
    tone: "green",
  },
  {
    category: "Culture" as Category,
    date: "May 30, 2026",
    read: "4 min read",
    title: "Small rituals that make critique feel safer",
    excerpt: "A few lightweight habits for clearer feedback, better questions and less performance in the room.",
    tone: "rose",
  },
  {
    category: "Research" as Category,
    date: "May 12, 2026",
    read: "8 min read",
    title: "The useful kind of product ambiguity",
    excerpt: "How to keep a question open long enough to learn without letting the team lose momentum.",
    tone: "violet",
  },
];

function ArticleArtwork({ tone }: { tone: string }) {
  return (
    <div className={`blog-art blog-art-${tone}`} aria-hidden="true">
      <span className="blog-art-disc" />
      <span className="blog-art-core" />
      <span className="blog-art-cross blog-art-cross-a" />
      <span className="blog-art-cross blog-art-cross-b" />
      <span className="blog-art-cross blog-art-cross-c" />
    </div>
  );
}

export default function BlogPage() {
  const [active, setActive] = useState<Category>("All");
  const visiblePosts = useMemo(() => active === "All" ? posts : posts.filter((post) => post.category === active), [active]);

  return (
    <main className="inner-page blog-page" id="main-content" tabIndex={-1}>
      <PortfolioHeader />
      <div className="blog-layout">
        <aside className="blog-sidebar" aria-label="Blog categories">
          <p className="blog-kicker">Notes from the workbench</p>
          <h1>Blog</h1>
          <p className="blog-description">Long-form notes on research, systems and the small decisions that make digital products feel clear.</p>
          <div className="blog-filters" role="tablist" aria-label="Filter blog posts">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-controls="blog-feed"
                aria-selected={active === category}
                className={active === category ? "is-active" : ""}
                onClick={() => setActive(category)}
              >
                <span aria-hidden="true" />{category}
              </button>
            ))}
          </div>
          <Link className="blog-back-link" href="/">Back to portfolio <span aria-hidden="true">↗</span></Link>
        </aside>

        <section className="blog-feed" id="blog-feed" aria-live="polite" aria-label={`${active} blog posts`}>
          {visiblePosts.map((post, index) => (
            <article id={post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="blog-card" key={post.title} data-reveal style={{ "--delay": `${index * 55}ms` } as CSSProperties}>
              <div className="blog-card-copy">
                <div className="blog-meta">
                  <span className="blog-category">{post.category}</span>
                  <span>{post.date}</span><i aria-hidden="true" /> <span>{post.read}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <a className="blog-read-link" href={`#${post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  Read article <span aria-hidden="true">↗</span>
                </a>
              </div>
              <ArticleArtwork tone={post.tone} />
            </article>
          ))}
          {visiblePosts.length === 0 && <p className="blog-empty">No notes in this category yet.</p>}
        </section>
      </div>
      <footer className="inner-footer"><span>© 2026 Elena Shamraeva</span><Link href="/">Back home ↑</Link></footer>
    </main>
  );
}
