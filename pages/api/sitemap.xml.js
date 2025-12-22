import mongoose from "mongoose";
import Book from "@/models/Book";
import Author from "@/models/Author";
import Category from "@/models/Category";

const BASE_URL = "https://3xbooks.com";

export default async function handler(req, res) {
  await mongoose.connect(process.env.MONGO_URI);

  const books = await Book.find({}, "slug updatedAt");
  const authors = await Author.find({}, "slug updatedAt");
  const categories = await Category.find({}, "slug updatedAt");

  const urls = [];

  /* ---------------- STATIC PAGES ---------------- */
  urls.push(
    `
    <url>
      <loc>${BASE_URL}</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    `,
    `
    <url>
      <loc>${BASE_URL}/about</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
    `,
    `
    <url>
      <loc>${BASE_URL}/category</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    `,
    `
    <url>
      <loc>${BASE_URL}/authors</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
    `,
    `
    <url>
      <loc>${BASE_URL}/contact</loc>
      <changefreq>yearly</changefreq>
      <priority>0.3</priority>
    </url>
    `
  );

  /* ---------------- CATEGORIES ---------------- */
  categories.forEach(cat => {
    urls.push(`
      <url>
        <loc>${BASE_URL}/category/${cat.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
        ${cat.updatedAt ? `<lastmod>${cat.updatedAt.toISOString()}</lastmod>` : ""}
      </url>
    `);
  });

  /* ---------------- AUTHOR DETAIL PAGES ---------------- */
  authors.forEach(author => {
    urls.push(`
      <url>
        <loc>${BASE_URL}/author/${author.slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
        ${author.updatedAt ? `<lastmod>${author.updatedAt.toISOString()}</lastmod>` : ""}
      </url>
    `);
  });

  /* ---------------- BOOK DETAIL PAGES ---------------- */
  books.forEach(book => {
    urls.push(`
      <url>
        <loc>${BASE_URL}/books/${book.slug}</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
        ${book.updatedAt ? `<lastmod>${book.updatedAt.toISOString()}</lastmod>` : ""}
      </url>
    `);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(sitemap);
}
