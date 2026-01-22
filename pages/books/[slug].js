import Head from "next/head";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import MarkdownWithToggle from "../../components/MarkdownWithToggle";


export default function BookDetail({ book, relatedBooks }) {
  if (!book) return null;

  const trimTitle = (t, len = 35) =>
    t.length > len ? t.slice(0, len) + "..." : t;

  const slugify = (name) =>
    name?.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-.&]/g, "");

  const stripMarkdown = (text = "") =>
  text.replace(/\*\*(.*?)\*\*/g, "$1");

  const getLimitedText = (text, limit = 300) =>
    !text ? "" : text.length <= limit ? text : text.substring(0, limit) + "...";

  return (
    <>
   
      <Head>
        <title>
          {`${book.title} by ${book.authors?.[0]?.name} – Book Details & Reviews | Bookssstore`}
        </title>

        <meta
          name="title"
          content={`${book.title} by ${book.authors?.[0]?.name} – Book Details & Reviews | Bookssstore`}
        />
        <meta
          name="description"
          content={`Read about ${book.title} by ${book.authors?.[0]?.name}. Get book summary, reviews, author details, and where to buy this book on Bookssstore.`}
        />

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Book",
                  "name": book.title,
                  "author": {
                    "@type": "Person",
                    "name": book.authors?.[0]?.name,
                  },
                  "image": book.bookImage,
                  "url": `https://bookssstore.com/books/${book.slug}`,
                  "description": book.description?.slice(0, 160),
                },
                {
                  "@type": "Product",
                  "name": book.title,
                  "image": book.bookImage,
                  "offers": {
                    "@type": "Offer",
                    "price": book.price,
                    "priceCurrency": "USD",
                    "url": `https://bookssstore.com/books/${book.slug}`,
                    "availability": "https://schema.org/InStock",
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      <Header />

\
      <section className="banner-section">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h3 className="text-white">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Category", href: "/category" },
                {
                  label: book.categories?.[0]?.name,
                  href: `/category/${slugify(book.categories?.[0]?.name)}`,
                },
                { label: book.title, active: true },
              ]}
            />
          </h3>
        </div>
      </section>

      
      <section className="book-detail-page container py-5">
        <div className="row align-items-start">
          <div className="col-md-4 text-center">
            <img
              src={book.bookImage}
              alt={book.title}
              className="img-fluid shadow rounded"
            />
          </div>

          <div className="col-md-8">
            <h1>{book.title}</h1>

            <h5>
              By{" "}
              <Link href={`/author/${slugify(book.authors?.[0]?.name)}`}>
                {book.authors?.[0]?.name}
              </Link>
            </h5>

            {book.description && (
              <p>
                {getLimitedText(stripMarkdown(book.description))}
                {book.description.length > 300 && (
                  <span
                    style={{ color: "#fb944c", cursor: "pointer", fontWeight: 500 }}
                    onClick={() =>
                      document
                        .getElementById("product-description")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Read More
                  </span>
                )}
              </p>
            )}

            <p>
              <strong>Price:</strong> {book.price}
            </p>

            <a
              href={book.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary custom-primary-btn"
            >
              Buy Now
            </a>
          </div>
        </div>
      </section>

      {/* Related Books */}
      {/* ✅ You May Also Like (ONLY if related books exist) */}
      {relatedBooks.length > 0 && (
        <section className="container py-5 you-may-like-section">
          <h3 className="mb-4">You May Also Like</h3>

          <div className="row text-center">
            {relatedBooks.map((item) => (
              <div key={item._id} className="col-6 col-md-4 col-lg-2 mb-4">
                <Link href={`/books/${item.slug}`}>
                  <img
                    src={item.bookImage}
                    className="img-fluid shadow rounded"
                    alt={item.title}
                  />
                </Link>

                <h6 className="title mt-4">{trimTitle(item.title)}</h6>
                <p><strong>Price:</strong> {item.price}</p>

                <Link
                  href={`/books/${item.slug}`}
                  className="btn btn-sm btn-outline-primary bordered-btn"
                >
                  Buy Now
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ✅ Book Description (ALWAYS show if exists) */}
      {book.description && (
        <section className="container py-5">
          <hr />
          <div id="product-description">
            <h3>Book Description</h3>
            <MarkdownWithToggle text={book.description} />
          </div>
        </section>
      )}


      <Footer />
    </>
  );
}

/* ✅ SERVER-SIDE DATA (REQUIRED FOR SEO) */
export async function getServerSideProps({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  try {
    const bookRes = await fetch(`${API_BASE}/api/books/${params.slug}`);
    if (!bookRes.ok) return { notFound: true };

    const book = await bookRes.json();

    let relatedBooks = [];

    // 1️⃣ Try author-based
    if (book?.authors?.[0]?._id) {
      const rel = await fetch(
        `${API_BASE}/api/books?author=${book.authors[0]._id}`
      );
      const data = await rel.json();
      relatedBooks = data.filter((b) => b._id !== book._id).slice(0, 6);
    }

    // 2️⃣ Fallback: category-based
    if (
      relatedBooks.length === 0 &&
      book?.categories?.[0]?._id
    ) {
      const rel = await fetch(
        `${API_BASE}/api/books?category=${book.categories[0]._id}`
      );
      const data = await rel.json();
      relatedBooks = data.filter((b) => b._id !== book._id).slice(0, 6);
    }


    return {
      props: {
        book,
        relatedBooks,
      },
    };
  } catch {
    return { notFound: true };
  }
}
