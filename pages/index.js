import { useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Head from "next/head";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

export default function Home({
  categoriesSSR,
  authorsSSR,
  initialCategoryBooks,
}) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  /* ================= STATE (FROM SSR) ================= */
  const [categories] = useState(categoriesSSR || []);
  const [authors] = useState(authorsSSR || []);
  const [categoryBooks, setCategoryBooks] = useState(
    initialCategoryBooks || []
  );
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);

  const catImages = [
    "mystery.svg",
    "suspense.svg",
    "thriller.svg",
    "literature fiction.svg",
    "Books comic.svg",
  ];

  const slugify = (name = "") =>
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-.&]/g, "");

  /* ================= CLIENT CATEGORY SWITCH ================= */
  const fetchCategoryBooks = useCallback(
    async (catId) => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/books?category=${catId}`
        );
        setCategoryBooks(res.data || []);
      } catch {
        setCategoryBooks([]);
      }
    },
    [API_BASE]
  );

  /* ================= TOP AUTHORS (DERIVED, SEO SAFE) ================= */
  const authorsWithBookCount = authors.map((a) => ({
    ...a,
    bookCount: Array.isArray(a.books) ? a.books.length : 0,
  }));

  const topAuthors = [...authorsWithBookCount]
    .sort((a, b) => b.bookCount - a.bookCount)
    .slice(0, 6);

  return (
    <>
      {/* ================= SEO ================= */}
      <Head>
        <title>Bookssstore – Discover Great Reads & Connect With Bookstores Worldwide</title>
        <meta
          name="title"
          content="Bookssstore – Discover Great Reads & Connect With Bookstores Worldwide"
        />
        <meta
          name="description"
          content="Explore the best books across genres and connect with local and global bookstores. Find your next great read, latest releases, and curated collections at Bookssstore."
        />
      </Head>

      <Header />

      {/* Banner Section */}
      <section className="banner-bg custom-position-rel">
        <div className="container">
          <div className="banner-content custom-position-abs">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h1>Your Next Great Read Starts Here</h1>
                <p className="lead text-secondary mb-4">
                  Get access to the best book collection published by reputed authors and publishers in a wide variety of categories.
                </p>
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Scrolling Section - Carousel */}
      <section className="scrolling-section">
        <div className="container-fluid px-0">
          <Carousel
            responsive={{
              superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 5 },
              desktop: { breakpoint: { max: 1200, min: 992 }, items: 4 },
              tablet: { breakpoint: { max: 992, min: 768 }, items: 3 },
              mobile: { breakpoint: { max: 768, min: 599 }, items: 2 },
              mobileMini: { breakpoint: { max: 599, min: 0 }, items: 1 },
            }}
            infinite
            autoPlay
            autoPlaySpeed={1500}
            arrows={false}
            showDots={false}
            draggable
            swipeable
            containerClass="scrolling-wrapper"
            itemClass="scrolling-stat-item"
          >
            {[
              "20,898 books sold",
              "15,254 total books",
              "97% happy customer",
              "1,258 authors",
              "200K+ Popular Books",
              "750+ Recommendation",
            ].map((text, idx) => (
              <div key={idx}>
                <div className="book-card">
                  <i className="fa-solid fa-star-of-life"></i>
                  <p style={{ color: "#b5d44e", margin: 0 }}>{text}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section text-center ptb-80 w-60">
        <div className="container">
          <div className="about-section">
            <h2 className="mb-4">
              Digital Platform Connecting Readers and Bookstores Worldwide
            </h2>
            <p className="text-secondary">
              Bookssstore is a one-stop shop for connecting bookstores and readers. To help you find your favorite books for some quality reading time, we have a large selection of books in a variety of genres. Local bookshops have a fantastic opportunity to interact with ardent readers through our platform. You can browse any book of your choice according to your interest and preference.
            </p>
            <p className="text-secondary">
              Whether you prefer fiction or non-fiction, we present you with reads covering genres including mystery, suspense, thriller, drama, comedy, etc. Through our program, we help neighborhood bookshops reach their devoted customer base by utilizing their vast selection of excellent books. As a result, we assist independent bookstores in growing their global presence in addition to helping readers have an unforgettable reading experience.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Logos - Carousel Slider */}
      <div className="featured-logo pt-0">
        <div className="container">
          <h3 className="text-center">As Featured in</h3>
          <Carousel
            responsive={{
              superLargeDesktop: { breakpoint: { max: 4000, min: 1366 }, items: 4 },
              desktop: { breakpoint: { max: 1366, min: 990 }, items: 3 },
              tablet: { breakpoint: { max: 990, min: 599 }, items: 2 },
              mobile: { breakpoint: { max: 599, min: 0 }, items: 1 },
            }}
            infinite
            autoPlay
            autoPlaySpeed={1500}
            arrows={false}
            showDots={false}
            draggable
            swipeable
            containerClass="featured-slider-logo"
            itemClass="featured-logo-img"
          >
            {[
              "buzzfeed.svg",
              "forbes.svg",
              "goodreader.svg",
              "hercampus.svg",
              "how-to-geek.svg",
              "huffpost.svg",
              "lifehacker.svg",
              "preply.svg",
              "techcrunch.svg",
              "teded.svg",
              "theguardian.svg",
            ].map((img, idx) => (
              <div
                key={idx}
                style={{
                  margin: "0 32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`/images/featured image/black-logo/${img}`}
                  alt={img.replace(".svg", "")}
                  style={{ height: 40, width: "auto", filter: "grayscale(1)" }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      
      <section className="ptb-80 find-books-category-section bg-light">
        <div className="container">
          <div className="row d-flex justify-content-between align-items-center mb-4">
            <div className="col-md-6">
              <h2 className="mb-0">Find Books By Category</h2>
            </div>
            <div className="col-md-6 text-right cutom-btn-dark d-none d-md-block">
              <Link href="/category">
                Browse All <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>

          {/* Tabs for desktop */}
          <div className="d-none d-md-block">
            <ul className="nav nav-tabs mb-4" style={{ whiteSpace: "nowrap" }}>
              {categories.slice(0, 7).map((cat, idx) => (
                <li
                  className="nav-item"
                  key={cat._id || idx}
                  style={{ display: "inline-block" }}
                >
                  <button
                    className={`nav-link${activeCategoryIdx === idx ? " active" : ""
                      }`}
                    style={{ minWidth: 120, fontWeight: 600 }}
                    onClick={() => {
                      setActiveCategoryIdx(idx);
                      fetchCategoryBooks(cat._id);
                    }}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Dropdown for mobile */}
          <div className="d-block d-md-none mb-4">
            <select
              className="form-select"
              value={activeCategoryIdx}
              onChange={(e) => {
                const idx = parseInt(e.target.value, 10);
                setActiveCategoryIdx(idx);
                fetchCategoryBooks(categories[idx]._id);
              }}
            >
              {categories.slice(0, 7).map((cat, idx) => (
                <option key={cat._id || idx} value={idx}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Book carousel */}
          <div>
            {categoryBooks.length === 0 ? (
              <div className="text-center text-muted py-5">
                No books found for this category.
              </div>
            ) : (
              <Carousel
                responsive={{
                  superLargeDesktop: {
                    breakpoint: { max: 4000, min: 1200 },
                    items: 5,
                  },
                  desktop: {
                    breakpoint: { max: 1200, min: 992 },
                    items: 4,
                  },
                  tablet: {
                    breakpoint: { max: 992, min: 768 },
                    items: 3,
                  },
                  mobile: {
                    breakpoint: { max: 768, min: 0 },
                    items: 1,
                  },
                }}
                infinite
                autoPlay
                autoPlaySpeed={2000}
                arrows={false}
                showDots={false}
                draggable
                swipeable
                containerClass="category-books-carousel"
                itemClass="category-books-carousel-item"
              >
                {categoryBooks.map((book) => (
                  <div key={book._id} className="p-3 h-100">
                    <div className="book-card d-flex flex-column align-items-center justify-content-between">
                      <Link href={`/books/${book.slug}`}>
                        <img
                          src={book.bookImage || "/images/books-bg.jpg"}
                          alt={book.title}
                        />
                      </Link>
                      <Link href={`/books/${book.slug}`}>
                        <h6 className="fw-bold text-center">{book.title}</h6>
                      </Link>
                      <div className="text-muted small text-center">
                        {book.authors && book.authors.length > 0 ? (
                          <Link
                            className="author-name"
                            href={`/author/${slugify(book.authors[0].name)}`}
                          >
                            {book.authors[0].name}
                          </Link>
                        ) : (
                          <span className="text-muted">Unknown Author</span>
                        )}
                      </div>
                      <div className="card-btn">
                        {book.affiliateLink ? (
                          <a
                            href={book.affiliateLink}
                            className="btn btn-sm btn-outline-primary mt-auto custom-primary-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Buy Now
                          </a>
                        ) : (
                          <span className="text-muted">No Amazon Link</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>

          <div className="cutom-btn-dark mt-5 d-md-none">
            <Link href="/category">
              Browse All <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Categories (Grid) */}
      <section className="ptb-80 Category-section">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <h2>Top categories</h2>
            </div>
            <div className="col-md-6 text-right cutom-btn-dark d-none d-md-block">
              <Link href="/category">
                Browse All Categories <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>
          <div className="d-grid category-grid">
            {categories.slice(0, 5).map((cat, idx) => (
              <div className="test" key={cat._id || idx}>
                <Link href={`/category/${slugify(cat.name)}`}>
                  <div className="category-box-outer">
                    <img
                      src={`/images/updated icons/${catImages[idx]}`}
                      alt={cat.name}
                    />
                    <h4>{cat.name}</h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="cutom-btn-dark d-md-none mt-4">
            <Link href="/category">
              Browse All Categories <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* Books by Series Section */}
      <section className="ptb-80 series-sec">
        {/* <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <h2>Books by series</h2>
              <p>Dive into our 'Series' section to discover over 5,900+ book
                series with all the books arranged in the
                proper order.

                From fantasy to mystery to romance and beyond, find your next
                series and read it sequentially with ease.</p>
            </div>
            <div className="col-md-6 text-right cutom-btn-dark">
              <a href="/browse/series">
                Browse All <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <SeriesCarousel series={series.slice(0, 5)} />
        </div> */}
      </section>

      {/* Books CTA Section - Top Reads */}
      <section className="books-cta">
        <div className="container cta-banner-bg">
          <div className="row align-items-center">
            <div className="col-md-5">
              <div className="cta-banner-wrap">
                <h5>Top Reads</h5>
                <h2>Find the Best-Selling Thrillers of All Time</h2>
                <p>Go through our selected thriller works here.</p>
                <div className="cutom-btn-dark d-none d-md-block">
                  <Link href="/category/Thriller">
                    Browse All <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <img
                src="/images/h3-banner-6.png"
                alt="Top Reads"
                className="w-100"
              />
              <div className="cutom-btn-dark d-md-none text-center">
                <Link href="/browse-all?category=68e3c989b57a10397d3cf1e4">
                  Browse All <i className="fa-solid fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Authors Section */}
      <section className="ptb-80 Category-section author-section1">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <h2>Top Authors</h2>
            </div>
            <div className="col-md-6 text-right cutom-btn-dark d-none d-md-block">
              <Link href="/authors">
                View All Author <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>
          <div className="d-grid category-grid">
            {topAuthors.slice(0, 5).map((author, idx) => (
              <div className="test" key={author._id || idx}>
                <Link href={`/author/${slugify(author.name)}`}>
                  <div className="category-box-outer">
                    <h4>{author.name}</h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="cutom-btn-dark d-md-none mt-4">
            <Link href="/authors">
              View All Author <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ================= SEO SSR ================= */
export async function getServerSideProps() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  try {
    const [catRes, authRes] = await Promise.all([
      fetch(`${API_BASE}/api/categories`),
      fetch(`${API_BASE}/api/authors`),
    ]);

    const categoriesSSR = await catRes.json();
    const authorsSSR = await authRes.json();

    let initialCategoryBooks = [];
    if (categoriesSSR.length > 0) {
      const booksRes = await fetch(
        `${API_BASE}/api/books?category=${categoriesSSR[0]._id}`
      );
      initialCategoryBooks = await booksRes.json();
    }

    return {
      props: {
        categoriesSSR,
        authorsSSR,
        initialCategoryBooks,
      },
    };
  } catch {
    return {
      props: {
        categoriesSSR: [],
        authorsSSR: [],
        initialCategoryBooks: [],
      },
    };
  }
}
