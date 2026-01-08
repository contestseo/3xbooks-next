import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function Authors({ authorsSSR }) {
  const limit = 12;
  const authors = Array.isArray(authorsSSR) ? authorsSSR : [];

  const [filter, setFilter] = useState("all");
  const [displayCount, setDisplayCount] = useState(limit);

  const slugify = (name) =>
    encodeURIComponent(name?.toLowerCase().trim().replace(/\s+/g, "-"));

  /* ✅ FEATURED AUTHORS – SSR SAFE */
  const featuredAuthors = useMemo(() => {
    return [...authors]
      .sort((a, b) => b.bookCount - a.bookCount)
      .slice(0, 3);
  }, [authors]);

  /* ✅ FILTERED AUTHORS – SSR SAFE */
  const filteredAuthors = useMemo(() => {
    return filter === "all"
      ? authors
      : authors.filter((a) =>
          a.name.toLowerCase().startsWith(filter.toLowerCase())
        );
  }, [filter, authors]);

  const displayAuthors = filteredAuthors.slice(0, displayCount);
  const hasMore = displayCount < filteredAuthors.length;

  const handleLoadMore = () =>
    setDisplayCount((prev) => prev + limit);

  return (
    <>
      {/* ✅ SEO – VISIBLE IN VIEW SOURCE */}
      <Head>
        <title>Featured Authors – Discover Book Authors on 3xBooks</title>
        <meta
          name="title"
          content="Featured Authors – Discover Book Authors on 3xBooks"
        />
        <meta
          name="description"
          content="Meet the authors behind your favorite books. Discover new writers, popular authors, and their best works on the 3xBooks Authors page."
        />
        <link rel="canonical" href="https://3xbooks.com/authors" />

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Authors",
              "url": "https://3xbooks.com/authors",
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": authors.map((author, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "url": `https://3xbooks.com/author/${slugify(author.name)}`,
                  "name": author.name,
                })),
              },
            }),
          }}
        />
      </Head>

      <Header />

      {/* Banner */}
      <section className="banner-inner-page people-bg">
        <div className="container">
          <div className="banner-content custom-position-abs">
            <h1>Know the Authors Behind Valuable Work</h1>
            <p className="lead text-secondary mb-4">
              Gain insights about expert writers who showcase their expertise through impactful work.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Authors */}
      <section className="featured-authors">
        <div className="container">
          <h2>Featured Authors</h2>
          <div className="row g-4">
            {featuredAuthors.map((author) => (
              <div key={author._id} className="col-md-4">
                <Link href={`/author/${slugify(author.name)}`}>
                  <div className="author-card bg-light text-center">
                    <img
                      src={author.image || "/images/authors/avatar.jpg"}
                      alt={author.name}
                      style={{ borderRadius: "50%", height: "120px", width: "120px" }}
                    />
                    <h5>{author.name}</h5>
                    <p>
                      <strong>Books:</strong> {author.bookCount}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Authors */}
      <section className="Browse-Authors">
        <div className="container">
          <h3 className="text-center mb-4">Browse Authors</h3>

          <div className="filter-bar mb-4 d-none d-md-flex flex-wrap justify-content-center">
            {["all", ..."abcdefghijklmnopqrstuvwxyz"].map((letter) => (
              <button
                key={letter}
                className={filter === letter ? "active" : ""}
                onClick={() => {
                  setFilter(letter);
                  setDisplayCount(limit);
                }}
              >
                {letter.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {displayAuthors.map((author) => (
              <div key={author._id} className="col-lg-3 col-md-4 col-sm-6">
                <Link href={`/author/${slugify(author.name)}`}>
                  <div className="author-card text-center">
                    <img
                      src={author.image || "/images/authors/avatar.jpg"}
                      alt={author.name}
                      style={{ borderRadius: "50%", height: "90px", width: "90px" }}
                    />
                    <span className="author-name mt-2">{author.name}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-4">
              <button
                className="btn btn-sm btn-outline-primary custom-primary-btn"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ✅ SERVER-SIDE FETCH */
export async function getServerSideProps() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  try {
    // 👇 LIMIT DATA FOR INITIAL RENDER
    const res = await fetch(
      `${API_BASE}/api/authors/book-count?limit=48`
    );
    const authorsSSR = await res.json();

    return { props: { authorsSSR } };
  } catch {
    return { props: { authorsSSR: [] } };
  }
}

