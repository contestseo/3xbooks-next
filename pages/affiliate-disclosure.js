import React from 'react';
import Link from 'next/link';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";

export const metadata = {
    title: 'Affiliate Disclosure | 3xbooks',
    description: 'Affiliate Disclosure for 3xbooks.com',
};

export default function AffiliateDisclosure() {
    const lastUpdated = "January 8, 2026";
    return (
        <>
            <Head>
                <title>Affiliate Disclosure – Transparency & Earnings | 3xBooks</title>
                <meta name="title" content="Affiliate Disclosure – Transparency & Earnings | 3xBooks" />
                <meta name="description" content="Learn about 3xBooks’ affiliate relationships, how we earn commissions, and our commitment to honest and transparent recommendations." />
            </Head>
            <Header />

            <section className="banner-inner-page people-bg">
                <div className="container">
                    <div className="banner-content custom-position-abs">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                <h1>Affiliate Disclosure</h1>
                                <p className="lead text-secondary mb-4">
                                    Last Updated: {lastUpdated}
                                </p>
                                <p className="lead  mb-4">
                                    To support the ongoing operation of this website and continue delivering valuable content, we participate in several affiliate programs. This includes the Amazon Associates Program and other book-related affiliate partnerships.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-5">
                <div className="container">
                    <div className="row">
                        <h4 className="mb-0">1. How It Works</h4>
                        <p className="mb-0">Some of the links on this site are affiliate links. This means that if you click on one of these links and make a purchase, we may receive a small commission — <strong>at no additional cost to you.</strong>
                        </p>
                        <p>These commissions help fund the maintenance of 3xBooks.com, allowing us to keep creating and sharing content that helps you discover great books.</p>

                        <h4 className="mb-0">2. Our Editorial Integrity</h4>
                        <p>Our recommendations are based on quality, usefulness, and value to you — not on potential earnings. Affiliate links do not influence our editorial decisions, reviews, or book lists. We strive to present honest opinions and valuable guidance so you can make informed decisions.</p>

                        <h4 className="mb-0">3. Your Trust Matters</h4>
                        <p className="mb-0">We understand and respect the trust you place in us. Transparency is a core part of our relationship with readers, and we aim to be clear about how our site operates.</p>
                        <p>If you have any questions about our affiliate relationships or this Affiliate Disclosure, please feel free to <a href="/contact">contact us</a> via the Contact page.</p>


                    </div>
                </div>
            </section>


            <Footer />
        </>

    );
}

