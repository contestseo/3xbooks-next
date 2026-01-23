import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";

export default function ThankYou() {
  return (
    <>
    {/* seo */}
      <Head>
        <title>Thank You – Your Submission Was Successful | Bookssstore</title>
        <meta name="title" content="Thank You – Your Submission Was Successful | Bookssstore" />
        <meta name="description" content="Thank you for connecting with Bookssstore. Your submission has been received successfully. Explore books, authors, and recommendations on our site." />
      </Head>
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
