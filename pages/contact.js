import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import emailjs from "emailjs-com";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setError("");

    const recaptchaResponse = window.grecaptcha?.getResponse();
    if (!recaptchaResponse) {
      setError("Please verify the reCAPTCHA.");
      setStatus("");
      return;
    }

    emailjs
      .send("service_90vg75a", "template_g0sisyx", {
        ...formData,
        "g-recaptcha-response": recaptchaResponse,
      }, "8EZ_NPHacNOWtUdsD")
      .then(() => {
        setStatus("Email sent successfully!");
        window.grecaptcha.reset();
        router.push("/thank-you");
      })
      .catch(() => setError("Failed to send email. Try again later."));
  };

  return (
    <>
      <Head>
        <title>Contact 3xBooks – Get in Touch With Our Team</title>
        <meta name="title" content="Contact 3xBooks – Get in Touch With Our Team" />
        <meta name="description" content="Have a question or suggestion? Contact the 3xBooks team for support, partnerships, or feedback. We’re here to help book lovers around the world." />
      </Head>

      <Header />
      <section className="banner-inner-page people-bg">
        <div className="container">
          <div className="banner-content custom-position-abs">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h1>Connect with Us Anytime</h1>
                <p className="lead text-secondary mb-4">
                  Feel free to ask questions or suggestions — we value your inputs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="contact-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-4">
              <h2>We’re Available 24/7 for You</h2>
              <p>Fill out the form below to suggest books, ask queries, or give feedback.</p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 contact-forms">
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Your Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="subject" className="form-label">Subject *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      placeholder="Enter subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="5"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* reCAPTCHA */}
                  <div className="col-12 text-center mt-4">
                    <div className="g-recaptcha" data-sitekey="6LcWWPsrAAAAANKPWe4CtbE6GObwiy4ew2wCjtMl"></div>
                  </div>

                  {error && <p className="text-danger text-center mt-3">{error}</p>}
                  {status && !error && <p className="text-center mt-3">{status}</p>}

                  <div className="col-12 text-center mt-4">
                    <button type="submit" className="btn btn-submit px-5">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
