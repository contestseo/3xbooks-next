import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import MarkdownWithToggle from "../../components/MarkdownWithToggle";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
      </Head>

      <Header />

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
  } catch (e) {}

  return { props: { book, relatedBooks } };
}
