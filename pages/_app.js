// import "@/styles/globals.css";

// Import your real CSS files
import "../public/css/bootstrap.min.css";
import "../public/css/style.css";
import "../public/css/responsive.css";
import Script from "next/script";
import { useRouter } from "next/router";
import Head from "next/head";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // useEffect(() => {
  //   import("bootstrap/dist/js/bootstrap.bundle.min.js");
  // }, []);

  const canonicalUrl = `https://bookssstore.com${router.asPath === "/" ? "" : router.asPath}`;
  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      {/* jQuery CDN (required for Bootstrap custom scripts) */}
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      />

      {/* Bootstrap JS from public */}
      {/* <Script
        src="../public/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      /> */}

      {/* Custom script */}
      {/* <Script
        src="../public/js/custom.js"
        strategy="afterInteractive"
      /> */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://bookssstore.com/#organization",
                "name": "Bookssstore",
                "url": "https://bookssstore.com/",
                "logo": "https://bookssstore.com/images/logo/logo.png"
              },
              {
                "@type": "WebSite",
                "@id": "https://bookssstore.com/#website",
                "url": "https://bookssstore.com/",
                "name": "Bookssstore",
                "publisher": {
                  "@id": "https://bookssstore.com/#organization"
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": `https://bookssstore.com/?s={search_term_string}`,
                  "query-input": "required name=search_term_string"
                }
              }
            ]
          }),
        }}
      />

      <Component {...pageProps} />
    </>
  );
}
