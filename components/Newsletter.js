import { useState } from "react";
import { useRouter } from "next/router";

export default function Newsletter() {
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/api/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    setEmail("");
    setTimeout(() => router.push("/thank-you"), 800);
  };

  return (
    <section className="news ptb-80">
      <div className="container newsletter-section">
        <form className="newsletter-input" onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="Email" />
          <button type="submit" className="subscribe-btn">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
