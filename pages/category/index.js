import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Select from "react-select";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InnerPreloader from "../../components/innerPreloader";


export default function CategoryPage({ initialCategories, initialAuthors, initialBooks }) {
  const [categories] = useState(initialCategories);
  const [authors] = useState(initialAuthors);
  const [books, setBooks] = useState(initialBooks);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [hasMore, setHasMore] = useState(initialBooks.length >= 20);

  const limit = 20;
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;


  const fetchBooks = async ({ pageNum = 1, append = false } = {}) => {
    setLoadingBooks(true);
    try {
      const params = new URLSearchParams();

      if (selectedCategories.length)
        params.append("category", selectedCategories.map((c) => c.value).join(","));

      if (selectedAuthors.length)
        params.append("author", selectedAuthors.map((a) => a.value).join(","));

      params.append("limit", limit);
      params.append("skip", (pageNum - 1) * limit);

      const res = await fetch(`${API_BASE}/api/books?${params.toString()}`);
      const data = await res.json();

      setBooks((prev) => (append ? [...prev, ...data] : data));
      setHasMore(data.length === limit);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoadingBooks(false);
    }
  };

  const handleApplyFilters = () => {
    setPage(1);
    fetchBooks({ pageNum: 1, append: false });
  };

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchBooks({ pageNum: next, append: true });
  };

  return (
    <>
      <Head>
        <title>Best Books List – Top Book Recommendations | 3xBooks</title>
        <meta
          name="title"
          content="Best Books List – Top Book Recommendations | 3xBooks"
        />
        <meta
          name="description"
          content="Browse our curated list of top books and must-read recommendations. Find the best fiction, non-fiction, thrillers, and more selected by 3xBooks experts."
        />
      </Head>

      <Header />

      {/* Banner */}
      <section className="banner-inner-page people-bg">
        <div className="container">
          <div className="banner-content custom-position-abs">
            <h1>Best Books Just for You</h1>
            <p className="lead text-secondary mb-4">
              Pick your favorite reads from our carefully selected collection.
            </p>
          </div>
        </div>
      </section>

      <section className="people-tab-section ptb-80">
        <div className="container">
          {/* Mobile Filter */}
          <div className="filter-bar1 mb-4 p-3 rounded shadow-sm bg-light d-block d-md-none">
            <label className="form-label fw-bold">Select Categories</label>
            <Select
              isMulti
              options={categories.map((c) => ({ value: c._id, label: c.name }))}
              value={selectedCategories}
              onChange={setSelectedCategories}
              placeholder="Search or select categories..."
            />

            {/* <label className="form-label fw-bold mt-3">Select Authors</label>
            <Select
              isMulti
              options={authors.map((a) => ({ value: a._id, label: a.name }))}
              value={selectedAuthors}
              onChange={setSelectedAuthors}
              placeholder="Search or select authors..."
            /> */}

            <button className="btn btn-sm btn-outline-primary mt-3 custom-primary-btn" onClick={handleApplyFilters}>
              {loadingBooks ? "Loading..." : "Apply Filters"}
            </button>
          </div>

          <div className="container tabs-section-cat d-flex">
            <aside className="sidebar">
              <div className="filter-group">
                <div className="filter-title">Categories</div>
                <div className="filter-content">
                  {categories.map((cat) => (
                    <label key={cat._id}>
                      <input
                        type="checkbox"
                        checked={!!selectedCategories.find((c) => c.value === cat._id)}
                        onChange={() =>
                          setSelectedCategories((prev) =>
                            prev.some((c) => c.value === cat._id)
                              ? prev.filter((c) => c.value !== cat._id)
                              : [...prev, { value: cat._id, label: cat.name }]
                          )
                        }
                      />{" "}
                      {cat.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* <div className="filter-group">
                <div className="filter-title">Authors</div>
                <div className="filter-content">
                  {authors.map((a) => (
                    <label key={a._id}>
                      <input
                        type="checkbox"
                        checked={!!selectedAuthors.find((s) => s.value === a._id)}
                        onChange={() =>
                          setSelectedAuthors((prev) =>
                            prev.some((s) => s.value === a._id)
                              ? prev.filter((s) => s.value !== a._id)
                              : [...prev, { value: a._id, label: a.name }]
                          )
                        }
                      />{" "}
                      {a.name}
                    </label>
                  ))}
                </div>
              </div> */}

              <button className="btn btn-sm btn-outline-primary mt-3 custom-primary-btn" onClick={handleApplyFilters}>
                Apply
              </button>
            </aside>

            <main className="main">
              <div id="books1" className="books">
                {loadingBooks && books.length === 0 ? (
                  <InnerPreloader />
                ) : (
                  <div className="row">
                    {books.length === 0 ? (
                      <p>No books found.</p>
                    ) : (
                      books.map((book) => (
                        <div key={book._id} className="col-md-6 col-lg-4 col-xl-3">
                          <div className="outer-box">

                            {/* Image clickable */}
                            <div className="book-image">
                              <Link href={`/books/${book.slug}`}>
                                <img
                                  src={book.bookImage || "/images/books-bg.jpg"}
                                  alt={book.title}
                                />
                              </Link>
                            </div>

                            {/* Title clickable */}
                            <Link href={`/books/${book.slug}`}>
                              <h5 className="book-title">{book.title}</h5>
                            </Link>

                            <p><strong>Price: </strong>{book.price}</p>

                           
                            {book.affiliateLink ? (
                              <a
                                href={book.affiliateLink}
                                className="btn btn-sm btn-outline-primary mt-auto bordered-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Buy Now
                              </a>
                            ) : (
                              <span>No Amazon Link</span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Load More Button */}
                {hasMore && !loadingBooks && (
                  <div className="text-center mt-4">
                    <button
                      className="btn btn-sm btn-outline-primary mt-auto custom-primary-btn"
                      onClick={handleLoadMore}
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// ======== SERVER-SIDE FETCHING ========
export async function getServerSideProps() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;


  const [catRes, authorRes, booksRes] = await Promise.all([
    fetch(`${API_BASE}/api/categories`),
    fetch(`${API_BASE}/api/authors`),
    fetch(`${API_BASE}/api/books?limit=20&skip=0`)
  ]);

  const [initialCategories, initialAuthors, initialBooks] = await Promise.all([
    catRes.json(),
    authorRes.json(),
    booksRes.json()
  ]);

  return {
    props: { initialCategories, initialAuthors, initialBooks }
  };
}
