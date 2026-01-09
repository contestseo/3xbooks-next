import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";



export default function Blog() {

    const getLimitedText = (text, limit = 150) =>
        !text ? "" : text.length <= limit ? text : text.substring(0, limit) + "...";

    return (
        <>
            <Header />

            <section className="banner-inner-page people-bg">
                <div className="container">
                    <div className="banner-content custom-position-abs">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                <h1>Our Blog</h1>
                                <p className="lead text-secondary mb-4">
                                    Explore book reviews, recommendations, and literary insights.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog-content-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="blog-wrap">
                                        <img src={`/images/about-img-2.jpg`} />
                                        <div className="blog-content">
                                            <span className="blog-meta">9 Jan, 2026</span>
                                            <h3>5 Best Detective Books to Read for Adults & Kids</h3>
                                            <p>{getLimitedText("Mystery, thriller, and suspense are the major literary elements that keep readers glued to the pages of any book. That’s why there is a strong demand for books written in these genres. Renowned detectives like Agatha Christie, Arthur Conan Doyle, and Raymond Chandler have left a strong mark with their exceptional classic & modern detective books for adults and kids.")}</p>
                                            <Link href="/blog/detective-books" className="btn btn-outline-primary custom-primary-btn">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-md-4">
                                    <div className="blog-wrap">
                                        <img src={`/images/about-img-2.jpg`} />
                                        <div className="blog-content">
                                            <span className="blog-meta">9 Jan, 2026</span>
                                            <h3>I'm a dummy blog title</h3>
                                            <p>{getLimitedText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")}</p>
                                            <Link href="/#" className="btn btn-outline-primary custom-primary-btn">Read More</Link>
                                        </div>
                                    </div>
                                </div> */}
                                

                            </div>

                        </div>
                        <div className="col-md-3">
                            <div className="blog-sidebar">
                                <h3>Recent posts</h3>
                                <ul className="recent-posts">
                                    <li><Link href="/blog/detective-books">5 Best Detective Books to Read for Adults & Kids</Link></li>
                                    {/* <li><Link href="">lorem ipsum sit amet</Link></li>
                                    <li><Link href="">lorem ipsum sit amet</Link></li> */}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    )

}