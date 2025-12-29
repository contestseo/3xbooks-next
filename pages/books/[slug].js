import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import MarkdownWithToggle from "../../components/MarkdownWithToggle";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function BookDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const trimTitle = (t, len = 35) => (t.length > len ? t.slice(0, len) + "..." : t);

  const slugify = (name) =>
    name?.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-.&]/g, "");

  const getLimitedText = (text, limit = 300) =>
    !text ? "" : text.length <= limit ? text : text.substring(0, limit) + "...";

  useEffect(() => {
    if (!slug) return;

    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/books/${slug}`);
        const data = await res.json();
        setBook(data);

        const authorId = data.authors?.[0]?._id;
        const categoryId = data.categories?.[0]?._id;

        // Try Author Related Books
        if (authorId) {
          const authorRes = await fetch(`${API_BASE}/api/books?author=${authorId}`);
          const byAuthor = await authorRes.json();
          if (byAuthor.length > 1) {
            setRelatedBooks(byAuthor.filter((b) => b._id !== data._id).slice(0, 6));
            return;
          }
        }

        // Fallback: Category Related Books
        if (categoryId) {
          const catRes = await fetch(`${API_BASE}/api/books?category=${categoryId}`);
          const byCategory = await catRes.json();
          setRelatedBooks(byCategory.filter((b) => b._id !== data._id).slice(0, 6));
        }

      } catch (err) {
        console.error("Error loading book details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, API_BASE]);

  if (!book) return null;

  return (
    <>
      <Head>
        <title>{`${book.title} by ${book.authors?.[0]?.name}`}</title>
        <meta
          name="description"
          content={book.description?.slice(0, 160)}
        />
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
                    "name": book.authors?.[0]?.name
                  },
                  "image": book.bookImage,
                  "url": `https://3xbooks.com/books/${book.slug}`,
                  "description": book.description?.slice(0, 160)
                },
                {
                  "@type": "Product",
                  "name": book.title,
                  "image": book.bookImage,
                  "offers": {
                    "@type": "Offer",
                    "price": book.price,
                    "priceCurrency": "USD",
                    "url": `https://3xbooks.com/books/${book.slug}`,
                    "availability": "https://schema.org/InStock"
                  }
                },
                {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://3xbooks.com"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Category",
                      "item": "https://3xbooks.com/category"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": book.categories?.[0]?.name,
                      "item": `https://3xbooks.com/category/${book.categories?.[0]?.name}`
                    },
                    {
                      "@type": "ListItem",
                      "position": 4,
                      "name": book.title,
                      "item": `https://3xbooks.com/books/${book.slug}`
                    }
                  ]
                }
              ]
            })
          }}
        />
      </Head>

      <Header />


      <section className="banner-section">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <div className="breadcrumb-custom mb-2 text-white">
            <h3 className="text-white">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Category", href: "/category" },
                  { label: book.categories?.[0]?.name, href: `/category/${book.categories?.[0]?.name}` },
                  { label: book.title, active: true }
                ]}
              />
            </h3>

          </div>
        </div>
      </section>



      <section className="book-detail-page container py-5">
        <div className="row align-items-start">
          <div className="col-md-4 text-center">
            <img src={book.bookImage} alt={book.title} className="img-fluid shadow rounded" />
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
                {getLimitedText(book.description)}
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

            <p><strong>Price: </strong>{book.price}</p>

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

      {relatedBooks.length > 0 && (
        <section className="container py-5 you-may-like-section">
          <h3 className="mb-4">You May Also Like</h3>

          <div className="row text-center">
            {relatedBooks.map((item) => (
              <div key={item._id} className="col-6 col-md-4 col-lg-2 mb-4">
                <Link href={`/books/${item.slug}`}>
                  <img src={item.bookImage} className="img-fluid shadow rounded" alt={item.title} />
                </Link>

                <h6 className="title mt-4">{trimTitle(item.title)}</h6>
                <p><strong>Price:</strong> {item.price}</p>

                <Link
                  href={`/books/${item.slug}`}
                  className="btn btn-sm btn-outline-primary mt-auto bordered-btn"
                >
                  Buy Now
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <button
              className="btn btn-outline-primary custom-primary-btn"
              onClick={() =>
                router.push(`/category/${slugify(book.categories?.[0]?.name)}`)
              }
            >
              View More
            </button>
          </div>

          {book.description && (
            <>
              <hr className="mt-5" />
              <div id="product-description">
                <h3>Book Description</h3>
                <MarkdownWithToggle text={book.description} />
              </div>
            </>
          )}
        </section>
      )}

      <Footer />
    </>
  );
}


export async function getServerSideProps({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const bookRes = await fetch(`${API_BASE}/api/books/${params.slug}`);
  const book = await bookRes.json();

  let relatedBooks = [];
  try {
    if (book?.authors?.[0]?._id) {
      const rel = await fetch(`${API_BASE}/api/books?author=${book.authors[0]._id}`);
      const data = await rel.json();
      relatedBooks = data.filter((b) => b._id !== book._id).slice(0, 6);
    }
  } catch (e) { }

  return { props: { book, relatedBooks } };
}
