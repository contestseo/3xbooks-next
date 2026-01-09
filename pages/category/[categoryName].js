import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function CategoryPage({
  slug,
  readableCategoryName,
  initialBooks,
  categoryId,
}) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const [categoryBooks, setCategoryBooks] = useState(initialBooks || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialBooks?.length === 20);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    const res = await fetch(
      `${API_BASE}/api/books?category=${categoryId}&limit=20&skip=${(nextPage - 1) * 20}`
    );
    const data = await res.json();

    setCategoryBooks((prev) => [...prev, ...data]);
    setHasMore(data.length === 20);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <>
      
      <Head>
        <title>
          {`${readableCategoryName} Books – Best {readableCategoryName} Reads | 3xBooks`}
        </title>
        <meta
          name="title"
          content={`${readableCategoryName} Books – Best {readableCategoryName} Reads | 3xBooks`}
        />
        <meta
          name="description"
          content={`Explore the best ${readableCategoryName} books on 3xBooks. Discover top reads, popular authors, and must-read titles in the ${readableCategoryName} category.`}
        />

      </Head>

      <Header />

      {/* Banner */}
      <section className="banner-section">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h3 className="text-white">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Category", href: "/category" },
                { label: readableCategoryName, active: true },
              ]}
            />
          </h3>
        </div>
      </section>

      {/* ✅ BOOKS HTML IS SERVER RENDERED */}
      <div className="container" id="books">
        <div className="row">
          {categoryBooks.map((book) => (
            <div key={book._id} className="col-md-3 mb-4">
              <div className="outer-box d-flex flex-column h-100 btn-box">
                <div className="book-image mb-2">
                  <Link href={`/books/${book.slug}`}>
                    <img
                      src={book.bookImage}
                      alt={book.title}
                      className="img-fluid"
                    />
                  </Link>
                </div>

                <Link href={`/books/${book.slug}`}>
                  <h5 className="book-title">
                    {book.title.length > 60
                      ? `${book.title.substring(0, 60)}...`
                      : book.title}
                  </h5>
                </Link>

                <p>
                  <strong>Price:</strong> {book.price}
                </p>

                {book.affiliateLink && (
                  <a
                    href={book.affiliateLink}
                    className="btn btn-sm btn-outline-primary mt-auto bordered-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy Now
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-4">
            <button
              onClick={handleLoadMore}
              className="btn btn-sm btn-outline-primary custom-primary-btn"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
export async function getServerSideProps({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const slug = params.categoryName;

  const readableCategoryName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const catRes = await fetch(`${API_BASE}/api/categories/${slug}`);
  const catData = await catRes.json();
  const category = Array.isArray(catData) ? catData[0] : catData;

  if (!category?._id) {
    return { notFound: true };
  }

  const booksRes = await fetch(
    `${API_BASE}/api/books?category=${category._id}&limit=20`
  );
  const initialBooks = await booksRes.json();

  return {
    props: {
      slug,
      readableCategoryName,
      initialBooks,
      categoryId: category._id,
    },
  };
}
