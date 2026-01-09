import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import MarkdownWithToggle from "../../components/MarkdownWithToggle";

export default function AuthorDetail({ author, error }) {
  const [visibleCount, setVisibleCount] = useState(3);

  const getLimitedText = (text, limit = 300) =>
    !text ? "" : text.length <= limit ? text : text.substring(0, limit) + "...";

  const stripMarkdown = (text = "") =>
  text.replace(/\*\*(.*?)\*\*/g, "$1");

  const truncateTitle = (title, maxLength = 30) =>
    title?.length > maxLength ? `${title.slice(0, maxLength)}...` : title;

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  
  if (error) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center text-danger">{error}</div>
        <Footer />
      </>
    );
  }

  if (!author) return null;

  const displayedBooks = author.books
    ? author.books.slice(0, visibleCount)
    : [];

  return (
    <>
      {/* ✅ SEO WORKS – SAME FRONTEND */}
      <Head>
        <title>{`${author.name} Books – Biography & Best Titles | 3xBooks`}</title>
        <meta
          name="title"
          content={`${author.name} Books – Biography & Best Titles | 3xBooks`}
        />
        <meta
          name="description"
          content={`Discover books by ${author.name} on 3xBooks. Explore popular titles, author biography, latest releases, and recommended reads.`}
        />
      </Head>

      <Header />

      {/* Banner */}
      <section className="banner-inner-page author-detail-bg">
        <div className="container">
          <div className="banner-content custom-position-abs">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h1>{author.name}</h1>
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Authors", href: "/authors" },
                    { label: author.name, active: true },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Info */}
      <section className="author-detail ptb-80">
        <div className="container">
          <div className="author-detail-info">
            <div className="author-card">
              <div className="author-name text-center mb-3">
                <img
                  src={author.image || "/images/authors/avatar.jpg"}
                  alt={author.name}
                  style={{
                    borderRadius: "50%",
                    height: "150px",
                    width: "150px",
                  }}
                />
                <h3 className="mt-3">{author.name}</h3>

                {author.bio && (
                  <p className="mt-3">
                    {getLimitedText(stripMarkdown(author.bio, 300))}{" "}
                    {author.bio.length > 300 && (
                      <span
                        style={{
                          color: "#fb944c",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                        onClick={() =>
                          document
                            .getElementById("author-bio")
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            })
                        }
                      >
                        Read More
                      </span>
                    )}
                  </p>
                )}
              </div>

              <div className="author-books text-center">
                <h5>Total Books: {author.books?.length || 0}</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="section-authors-books">
        <div className="container">
          <h2 className="text-center mb-4">Author's Recent Books</h2>

          <div className="row">
            {displayedBooks.length > 0 ? (
              displayedBooks.map((book, idx) => (
                <div key={book._id || idx} className="col-12 col-md-6 col-xl-4">
                  <Link href={`/books/${book.slug || book._id}`}>
                    <div className="books-outer-box green-bg">
                      <div className="books-content">
                        <div className="lft-cnt">
                          <img
                            src={book.bookImage || "/images/books-bg.jpg"}
                            alt={book.title}
                          />
                        </div>
                        <div className="rgt-cnt">
                          <h5 className="text-white">
                            {truncateTitle(book.title)}
                          </h5>
                          <div className="btn-wrap11">
                            <p className="text-white">Price: {book.price}</p>
                            {book.affiliateLink ? (
                              <a
                                href={book.affiliateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white btn btn-sm btn-outline-primary bordered-btn-light"
                              >
                                Buy Now
                              </a>
                            ) : (
                              <span className="text-muted">No Amazon Link</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center text-muted py-5">
                No books found for this author.
              </div>
            )}
          </div>

          {author.books && visibleCount < author.books.length && (
            <div className="text-center mt-4">
              <button
                onClick={handleLoadMore}
                className="btn btn-sm btn-outline-primary custom-primary-btn"
              >
                Load More
              </button>
            </div>
          )}

          {author.bio && (
            <div id="author-bio" className="mt-5">
              <hr />
              <h3>Author's Bio</h3>
              <MarkdownWithToggle text={author.bio} />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ✅ SERVER-SIDE DATA ONLY */
export async function getServerSideProps({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_BASE}/api/authors/name/${params.name}`);
    if (!res.ok) {
      return { props: { error: "Author not found" } };
    }

    const author = await res.json();
    return { props: { author } };
  } catch {
    return { props: { error: "Failed to load author" } };
  }
}
