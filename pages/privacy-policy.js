import React from 'react';
import Link from 'next/link';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";

// Metadata for SEO
export const metadata = {
    title: 'Privacy Policy | 3xbooks',
    description: 'Privacy Policy for 3xbooks.com - Learn how we protect your data.',
};

export default function PrivacyPolicy() {
    const lastUpdated = "January 8, 2026";

    return (
        <>
            <Head>
                <title>Privacy Policy – How 3xBooks Protects Your Data</title>
                <meta name="title" content="Privacy Policy – How 3xBooks Protects Your Data" />
                <meta name="description" content="Read the 3xBooks Privacy Policy to understand how we collect, use, store, and protect your personal information when you use our website." />
            </Head>
            <Header />
            <section className="banner-inner-page people-bg">
                <div className="container">
                    <div className="banner-content custom-position-abs">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                <h1>Privacy Policy</h1>
                                <p className="lead text-secondary mb-4">
                                    Last Updated: {lastUpdated}
                                </p>
                                <p className="lead  mb-4">
                                    Welcome to <strong>3xbooks.com</strong>. We value your privacy and are committed to protecting your personal data.
                                    This policy outlines how we handle information when you visit our website
                                    <a href="https://3xbooks.com" className="text-blue-600 hover:underline ml-1"> https://3xbooks.com</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-5">
                <div className="container">
                    <div className="row">
                        <h4 className="mb-0">1. Information We Collect</h4>
                        <p className="mb-1"><strong>Personal Information:</strong> We collect personal information only when you willingly provide it, for example:</p>
                        <ul className="">
                            <li>When you sign up for our newsletter</li>
                            <li>When you fill out a contact form</li>
                        </ul>
                        <p className="mb-1"><strong>Non-Personal Information:</strong> Like many websites, we automatically collect non-personal information when you visit our site, such as:</p>
                        <ul className="">
                            <li>Browser type and version</li>
                            <li>Pages viewed</li>
                            <li>Time and date of visit</li>
                        </ul>

                        <h4 className="mb-0">2. How We Use Your Information</h4>
                        <p className="mb-1">We may use the information we collect to:</p>
                        <ul>
                            <li>Personalize and improve your experience on the site</li>
                            <li>Respond to your questions or requests</li>
                            <li>Send newsletters or updates if you opt in</li>
                        </ul>

                        <h4 className="mb-0">3. Cookies and Tracking Technologies</h4>
                        <p className=" mb-4">We use cookies and similar tracking technologies to enhance functionality and understand how users interact with our site. Cookies help improve performance, but you may disable them through your browser settings if you prefer.</p>

                        <h4 className="mb-0">4. Sharing Your Information</h4>
                        <p className=" mb-4">We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties for marketing purposes.</p>


                        <h4 className="mb-0">5. Third Party Links</h4>
                        <p className=" mb-4">Some pages on 3xBooks.com may contain links to third-party websites, products, or services (including affiliate partners). These third-party sites have their own privacy policies and practices, and we are not responsible for the content or practices of those sites.</p>

                        <h4 className="mb-0">6. Affiliate Programs</h4>
                        <p>3xBooks.com participates in affiliate programs (such as Amazon Associates and other book retailer programs). This means we may earn a small commission when you click on links to those services and make a purchase — at no extra cost to you.</p>

                        <h4 className="mb-0">7. Your Consent</h4>
                        <p>By using our website, you consent to the terms of this Privacy Policy and agree to our data practices as described herein.</p>

                        <h4 className="mb-0">8. Changes to This Privacy Policy</h4>
                        <p>We may update this Privacy Policy from time to time. When changes are made, we will revise the “Last Updated” date at the top of the page. Your continued use of the site following any changes indicates your acceptance of those changes.</p>


                        <h4 className="mb-0">9. Contact Us</h4>
                        <p>If you have any questions or concerns about this Privacy Policy or your personal information, feel free to <a href="/contact">contact us</a> via the Contact page.</p>
                    </div>
                </div>
            </section>


            <Footer />
        </>

    );
}


function PolicySection({ title, children }) {
    return (
        <div className="mb-12">
            <h4 className="text-2xl font-bold text-slate-900 mb-4">{title}</h4>
            <div className="text-slate-600 leading-relaxed">
                {children}
            </div>
        </div>
    );
}