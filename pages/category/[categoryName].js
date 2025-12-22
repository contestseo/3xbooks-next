"use client";

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function CategoryPage() {
  const router = useRouter();
  const { categoryName: slug } = router.query;

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const [categoryBooks, setCategoryBooks] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [catId, setCatId] = useState(null);

  // Convert slug → readable name
  const slugToTitle = (text) =>
    text
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const readableCategoryName = slugToTitle(slug);

  // 1️⃣ Fetch Category to get ID
  const fetchCategoryId = useCallback(
    async (name) => {
      try {
        const res = await fetch(`${API_BASE}/api/categories/${name}`);
        const data = await res.json();
        const category = Array.isArray(data) ? data[0] : data;

        if (!category?._id) {
          setError("Category not found");
          setLoadingInitial(false);
          return null;
        }

        setCatId(category._id);
        return category._id;
      } catch (err) {
        console.error(err);
        setError("Category not found");
        setLoadingInitial(false);
        return null;
      }
    },
    [API_BASE]
  );

  // 2️⃣ Fetch books for category ID
  const fetchCategoryBooks = useCallback(
    async (categoryId, pageNum = 1, append = false) => {
      if (!categoryId) return;

      setLoading(pageNum > 1);
      setError(null);

      try {
        const limit = 20;
        const res = await fetch(
          `${API_BASE}/api/books?category=${categoryId}&limit=${limit}&skip=${(pageNum - 1) * limit}`
        );

        const data = await res.json();
        const fetchedBooks = Array.isArray(data) ? data : [];

        setCategoryBooks((prev) =>
          append ? [...prev, ...fetchedBooks] : fetchedBooks
        );

        setHasMore(fetchedBooks.length === limit);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books");
        setCategoryBooks([]);
      } finally {
        pageNum === 1
          ? setTimeout(() => setLoadingInitial(false), 1000)
          : setLoading(false);
      }
    },
    [API_BASE, slug]
  );


  // 3️⃣ Handle slug change
  useEffect(() => {
    if (!slug) return;

    const loadData = async () => {
      setLoadingInitial(true);
      const id = await fetchCategoryId(slug);
      if (id) fetchCategoryBooks(id, 1);
    };

    loadData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, fetchCategoryBooks, fetchCategoryId]);

  // Load more
  const handleLoadMore = () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCategoryBooks(catId, nextPage, true);
  };

  return (
    <>
      <Head>
        <title>{readableCategoryName} — Best Books</title>
        <meta
          name="description"
          content={`Browse top books in ${readableCategoryName} category.`}
        />
      </Head>

      <Header />


      <section className="banner-section">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          {/* <div className="breadcrumb-custom mb-2 text-white">
            <Breadcrumbs
              items={[
                  { label: "Home", href: "/" },
                  { label: "Category", href: "/category" },
                  { label: readableCategoryName, active: true }
                 ]}
            />                                                                                       
          </div> */}
          <h3 className="text-white"><Breadcrumbs
              items={[
                  { label: "Home", href: "/" },
                  { label: "Category", href: "/category" },
                  { label: readableCategoryName, active: true }
                 ]}
            /></h3>
        </div>
      </section>

      <div className="container" id="books">
        {loadingInitial && (
          <p className="text-center mt-4">Loading books...</p>
        )}

        {error && <p className="text-danger text-center mt-4">{error}</p>}

        {!loadingInitial && categoryBooks.length === 0 && !error && (
          <p className="text-center mt-4">No books found.</p>
        )}

        {!loadingInitial && categoryBooks.length > 0 && (
          <>
            <div className="row">
              {categoryBooks.map((book) => (
                <div key={book._id} className="col-md-3 mb-4">
                  <div className="outer-box d-flex flex-column h-100 btn-box">
                    <div className="book-image mb-2">
                      <Link href={`/books/${book.slug}`}>
                        <img src={book.bookImage} alt={book.title} className="img-fluid" />
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
                      <strong>Price: </strong> {book.price}
                    </p>

                    <a
                      href={book.affiliateLink}
                      className="btn btn-sm btn-outline-primary mt-auto bordered-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-4">
                <button
                  onClick={handleLoadMore}
                  className="btn btn-sm btn-outline-primary mt-auto custom-primary-btn"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
