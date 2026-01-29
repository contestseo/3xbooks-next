import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import emailjs from "emailjs-com";


export default function Footer() {
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;


  const [formData1, setFormData1] = useState({ email: "" });
  const [status1, setStatus1] = useState("");
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const handleChange1 = (e) => {
    setFormData1({ ...formData1, [e.target.id]: e.target.value });
  };

  const slugify = (name) =>
    name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-.&]/g, "");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, authRes] = await Promise.all([
          fetch(`${API_BASE}/api/categories`).then((res) => res.json()),
          fetch(`${API_BASE}/api/authors`).then((res) => res.json())
        ]);
        setCategories(catRes);
        setAuthors(authRes);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  const handleSubmit1 = (e) => {
    e.preventDefault();
    setStatus1("Sending...");
    emailjs
      .send(
        "service_90vg75a",
        "template_lopk8eb",
        { email: formData1.email },
        "8EZ_NPHacNOWtUdsD"
      )
      .then(() => {
        setStatus1("Subscribed successfully!");
        setFormData1({ email: "" });
        setTimeout(() => router.push("/thank-you"), 1200);
      })
      .catch(() => setStatus1("Failed to subscribe. Try again."));
  };

  return (
    <footer className="footer bg-light">
      <div className="container">
        <div className="row text-start">
          <div className="col-sm-6 col-md-6 col-xl-3 mb-4 footer-text-col">
            <img src="/images/logo/logo.png" alt="logo" className="custom-logo" />
            <p>We serve to bridge the gap between readers and bookstores to offer them both an opportunity to discover authentic books and assist local bookstores in building their presence worldwide.</p>
          </div>

          <div className="col-sm-6 col-md-4 col-xl-2 mb-4">
            <h5>Explore</h5>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/category">Best List</Link>
            <Link href="/author">Authors</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>

          </div>

          <div className="col-sm-6 col-md-6 col-xl-2 mb-4">
            <h5>Top Category</h5>
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat._id} href={`/category/${slugify(cat.name)}`}>
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="col-sm-6 col-md-6 col-xl-2 mb-4">
            <h5>Top Authors</h5>
            {authors
              .sort((a, b) => (b.books?.length || 0) - (a.books?.length || 0))
              .slice(0, 6)
              .map((author) => (
                <Link key={author._id} href={`/author/${slugify(author.name)}`}>
                  {author.name}
                </Link>
              ))}
          </div>

          <div className="col-sm-6 col-md-6 col-xl-3 mb-4">
            <h5 className="mb-2">Get Regular Updates</h5>
            <p className="mb-0">
              Stay connected with us through our newsletters to get updates about new book releases, best deals, and more topics.
            </p>
            <form className="newsletter-input" onSubmit={handleSubmit1}>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={formData1.email}
                onChange={handleChange1}
                required
              />
              <button type="submit" className="subscribe-btn">
                Subscribe <i className="fas fa-arrow-right"></i>
              </button>
              {status1 && <p className="mt-2">{status1}</p>}
            </form>
          </div>
        </div>
      </div>

      {/* footer 2 */}
      <hr/>
      <div className="container">
        <div className="row mt-4">
          <div className="col-sm-6 col-md-6 col-xl-6">
            <span>©2026. All rights reserved by <Link href="/" className="footerLink">bookssstore.com</Link></span>
          </div>

          <div className="col-sm-6 col-md-6 col-xl-6" style={{
            display: "flex",
            gap: "15px",
            justifyContent: "end"
          }}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span>|</span>
            <Link href="/affiliate-disclosure ">Affiliate Disclosure </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
