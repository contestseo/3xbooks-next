import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (path) => (router.pathname === path ? "active" : "");

  return (
    <header className="bg-white shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">

          <Link href="/" className="navbar-brand">
            <img src="/images/logo/logo.png" alt="3xbooks" />
          </Link>

          {/* SAME BUTTON – ONLY JS ADDED */}
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* SAME CLASSES – JUST ADD show */}
          <div className={`collapse navbar-collapse ${open ? "show" : ""}`} id="navbarMain">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" className={`nav-link ${isActive("/")}`} onClick={() => setOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className={`nav-link ${isActive("/about")}`} onClick={() => setOpen(false)}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/category" className={`nav-link ${isActive("/category")}`} onClick={() => setOpen(false)}>
                  Best List
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/authors" className={`nav-link ${isActive("/authors")}`} onClick={() => setOpen(false)}>
                  Authors
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className={`nav-link ${isActive("/contact")}`} onClick={() => setOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>

            <SearchBar />
          </div>
        </nav>
      </div>
    </header>
  );
}
