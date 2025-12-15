import Link from "next/link";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";

export default function Header() {
  const router = useRouter();
  const isActive = (path) => (router.pathname === path ? "active" : "");

  return (
    <header className="bg-white shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" href="/">
            <img src="/images/logo/logo.png" alt="3xbooks" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link href="/" className={`nav-link ${isActive("/")}`}>Home</Link></li>
              <li className="nav-item"><Link href="/about" className={`nav-link ${isActive("/about")}`}>About</Link></li>
              <li className="nav-item"><Link href="/category" className={`nav-link ${isActive("/category")}`}>Best List</Link></li>
              <li className="nav-item"><Link href="/authors" className={`nav-link ${isActive("/authors")}`}>Authors</Link></li>
              <li className="nav-item"><Link href="/contact" className={`nav-link ${isActive("/contact")}`}>Contact</Link></li>
            </ul>
            <SearchBar />
          </div>
        </nav>
      </div>
    </header>
  );
}
