// import "@/styles/globals.css";

// Import your real CSS files
import "../public/css/bootstrap.min.css";
import "../public/css/style.css";
import "../public/css/responsive.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
    
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
