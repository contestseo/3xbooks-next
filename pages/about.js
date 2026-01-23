import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About({ authorsSSR }) {
  const [authors] = useState(authorsSSR);

  const slugify = (name) =>
    name?.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-.&]/g, "");

  const authorsWithBookCount = authors.map(a => ({ ...a, bookCount: a.books ? a.books.length : 0 }));
  const topAuthors = [...authorsWithBookCount].sort((a, b) => b.bookCount - a.bookCount).slice(0, 6);

  return (
    <>
      <Head>
        <title>About Bookssstore – Your Book Discovery & Reader Community Platform</title>
        <meta name="title" content="About Bookssstore – Your Book Discovery & Reader Community Platform" />
        <meta name="description" content="Learn how Bookssstore connects readers and bookstores with a vast selection of books from top authors and genres. Read our mission and how we help book lovers everywhere." />
      </Head>

      <Header />

      <section className="banner-inner-page people-bg">
        <div className="container">
          <div className="banner-content custom-position-abs">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h1>Access Quality Read Easily with Bookssstore</h1>
                <p className="lead text-secondary mb-4">
                  Browse the list of best-selling books from renowned authors and stimulate your mind with new, creative ideas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

 
      <section className="about-us-section text-center ptb-80">
        <div className="container">
          <h2 className="w-60 mb-4">
            Online Bookstore Keeping Your Love for Reading Alive
          </h2>
          <p className="text-secondary w-60 mb-4">
            At Bookssstore, we offer you a wide selection of bestsellers to ignite your curiosity and give you a creative boost. We aim to introduce you to the best-selling online stores offering books from a wide selection of genres to take you into a new world. We attempt to connect the best online bookstores with curious readers in the digital age. Thus, we help readers experience quality storytelling and support small bookstores in the best way possible.
          </p>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="img-outer-box">
                <img
                  src="./images/about-img-2.jpg"
                  alt="Our Mission"
                  className="w-100"
                />
                <div className="inner-img-box">
                  <h3>Our Mission</h3>
                  <h6>
                    Bookssstore works to empower local bookstores by connecting them with their target audience.
                  </h6>
                </div>
              </div>

              <div className="row outer-top-border">
                <div className="col-md-6 col-sm-12 p-0">
                  <div className="text-box text-left">
                    <h4>Supporting Local Bookstores</h4>
                    <p>
                      We help local bookstores and publishers get in touch with avid & casual readers worldwide.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 p-0">
                  <div className="text-box text-left">
                    <h4>Offering Quality Read</h4>
                    <p>
                      We introduce readers to quality books from reputed authors, helping them satisfy their curiosity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="right-outer-box">
                <img
                  src="./images/about-img-1.jpg"
                  alt="About Us"
                  className="w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Logos Section */}
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

      {/* Why Choose Us Section */}
      <section className="why-choose-us bg-light ptb-80 text-center">
        <h6>What Sets Us Apart</h6>
        <h2 className="w-60 mb-4">
          Genuine Digital Bookstore Redefining Reading Experiences
        </h2>

        <div className="container mt-5">
          <div className="row g-4 justify-content-center">
            {[
              {
                title: "Plentiful Quality Books Available",
                description:
                  "Access books from reputed and renowned publishers written in different genres. ",
                image: "/images/updated icons/Book Available.svg",
              },
              {
                title: "Offering Lucrative Discounts",
                description:
                  "Get high-quality books at genuine rates by enjoying attractive discount offers.",
                image: "/images/updated icons/Discount.svg",
              },
              {
                title: "Delivering Quality Books",
                description:
                  "Enjoy doorstep delivery of genuine books to get a desirable reading experience.",
                image: "/images/updated icons/Delivering Quality Books.svg",
              },

            ].map((item, idx) => (
              <div className="col-md-4 text-center" key={idx}>
                <div className="feature-icon"></div>
                <div className="feature-box">
                  {/* You can replace SVG with separate component if needed */}
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0916 57.5462C31.5176 48.3617 48.3617 31.5176 57.5462 15.0916C55.1713 13.4094 52.6077 12.114 49.945 11.1965C41.5701 26.0752 26.0752 41.5701 11.1965 49.945C12.114 52.6077 13.4094 55.1715 15.0916 57.5462Z" fill="#E2BB80"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M76.5766 77.7685C79.0594 75.2856 79.0594 71.2601 76.5766 68.7774C74.0937 66.2946 70.0682 66.2946 67.5855 68.7774C65.1027 71.2603 65.1027 75.2858 67.5855 77.7685C70.0682 80.2513 74.0937 80.2513 76.5766 77.7685Z" fill="#E2BB80"></path>
                    <path d="M76.5991 3.40173C83.067 9.86963 71.9259 31.4949 51.7083 51.7125C31.4952 71.9258 9.86976 83.0667 3.40186 76.599" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                    <path d="M3.40179 76.599C-0.83061 72.3712 2.47522 61.6574 10.9177 49.0951M49.0949 10.9176C61.6573 2.47534 72.371 -0.830639 76.5989 3.40176" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                    <path d="M14.5428 5.87119C18.4244 1.99411 24.7078 1.99411 28.5894 5.87119C32.4665 9.75281 32.4665 16.0362 28.5894 19.9178C24.7078 23.7949 18.4244 23.7949 14.5428 19.9178C10.6657 16.0362 10.6657 9.75265 14.5428 5.87119Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                    <path d="M31.2746 10.8052C41.651 7.71513 53.3498 10.2655 61.5404 18.4559C73.4415 30.3526 73.4415 49.6437 61.5404 61.5402C49.6436 73.4413 30.3526 73.4413 18.456 61.5402C7.42289 50.5071 6.62226 33.1142 16.0586 21.1591" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                  </svg> */}
                  <img src={item.image} alt={item.image} />
                  <h5 className="mt-3">{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Authors */}
      <section className="ptb-80 Category-section">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <h2>Top Authors</h2>
            </div>
            <div className="col-md-6 text-right cutom-btn-dark d-none d-md-block">
              <Link href="/authors">View All Author</Link>
            </div>
          </div>

          <div className="d-grid category-grid">
            {topAuthors.slice(0, 5).map((author, idx) => (
              <div key={author._id || idx}>
                <Link href={`/author/${slugify(author.name)}`}>
                  <div className="category-box-outer">
                    <h4>{author.name}</h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// Server-side props
export async function getServerSideProps() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_BASE}/api/authors`);
  const authorsSSR = await res.json();

  return { props: { authorsSSR } };
}
