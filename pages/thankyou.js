import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ThankYou() {
  return (
    <>
      <Header />

      <div className="container">
        <div className="thank-wrap">
          <h2 className="text-center">Thank You</h2>
          <Link href="/" className="btn btn-sm btn-outline-primary custom-primary-btn mt-3">
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
