import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function Authors({ authorsSSR }) {
  const [filter, setFilter] = useState("all");
  const [allAuthors] = useState(authorsSSR);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [displayAuthors, setDisplayAuthors] = useState([]);
  const [featuredAuthors, setFeaturedAuthors] = useState([]);

  const limit = 12;

  const slugify = (name) =>
    encodeURIComponent(name?.toLowerCase().trim().replace(/\s+/g, "-"));

  // Initial authors processing
  useEffect(() => {
    setFilteredAuthors(allAuthors);
    setDisplayAuthors(allAuthors.slice(0, limit));

    const tops = [...allAuthors]
      .sort((a, b) => b.bookCount - a.bookCount)
      .slice(0, 3);

    setFeaturedAuthors(tops);
  }, [allAuthors]);

  // Filter by A-Z click
  useEffect(() => {
    let list =
      filter === "all"
        ? allAuthors
        : allAuthors.filter((a) =>
            a.name.toLowerCase().startsWith(filter.toLowerCase())
          );

    setFilteredAuthors(list);
    setDisplayAuthors(list.slice(0, limit));
  }, [filter, allAuthors]);

  const handleLoadMore = () => {
    const next = displayAuthors.length + limit;
    setDisplayAuthors(filteredAuthors.slice(0, next));
  };

  const hasMore = displayAuthors.length < filteredAuthors.length;

  return (
    <>
      <Head>
        <title>Authors — 3XBooks</title>
        <meta
          name="description"
          content="Explore authors with top-selling books, popular writers and emerging talent at 3XBooks."
        />
      </Head>

      <Header />

      


      {/* Banner */}
      <section className="banner-inner-page people-bg">
        <div className="container">
          <div className="banner-content custom-position-abs">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h1>Know the Authors Behind Valuable Work</h1>
                <p className="lead text-secondary mb-4">
                  Gain insights about expert writers who showcase their expertise through impactful work. 
                </p>
              </div>
            </div>
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
                onClick={() => setFilter(letter)}
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

// =====================
// SERVER SIDE FETCHING
// =====================
export async function getServerSideProps() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;


  try {
    const res = await fetch(`${API_BASE}/api/authors/book-count`);
    const authorsSSR = await res.json();

    return { props: { authorsSSR } };
  } catch (err) {
    return { props: { authorsSSR: [] } };
  }
}
