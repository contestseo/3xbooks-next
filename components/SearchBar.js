"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SearchBar() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/api/books?search=${encodeURIComponent(query)}&limit=10`
        );
        setResults(res.data || []);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchResults, 400); // debounce
    return () => clearTimeout(delay);
  }, [query]);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (book) => {
    setQuery("");
    setShowDropdown(false);

    if (book.slug) router.push(`/books/${book.slug}`);
    else router.push(`/books/${book._id}`);
  };

  const trimTitle = (title, limit = 60) =>
    title.length > limit ? title.substring(0, limit) + "..." : title;

  return (
    <div className="search-wrapper position-relative" ref={wrapperRef}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control search-input"
          type="search"
          placeholder="Search any book"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <button className="search-button" type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      {showDropdown && (
        <ul
          className="dropdown-menu show w-100"
          style={{ top: "100%", left: 0, zIndex: 9999, borderRadius: "0 0 8px 8px" }}
        >
          {loading ? (
            <p className="p-4">Loading...</p>
          ) : results.length > 0 ? (
            results.map((book) => (
              <li
                key={book._id}
                className="dropdown-item text-truncate"
                style={{ cursor: "pointer" }}
                onClick={() => handleSelect(book)}
                title={book.title}
              >
                {trimTitle(book.title)}
              </li>
            ))
          ) : (
            <li className="dropdown-item text-muted">No books found</li>
          )}
        </ul>
      )}
    </div>
  );
}
