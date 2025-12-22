// import "@/styles/globals.css";

// Import your real CSS files
import "../public/css/bootstrap.min.css";
import "../public/css/style.css";
import "../public/css/responsive.css";
import Script from "next/script";
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const canonicalUrl = `https://3xbooks.com${router.asPath === "/" ? "" : router.asPath}`;
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
      <Script
        src="../public/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />

      {/* Custom script */}
      <Script
        src="../public/js/custom.js"
        strategy="afterInteractive"
      />

      <Component {...pageProps} />
    </>
  );
}
