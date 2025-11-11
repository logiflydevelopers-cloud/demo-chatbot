import express from "express";
import axios from "axios";
import xml2js from "xml2js";
import Page from "../models/Page.js";

const router = express.Router();

/**
 * Add a website and store sitemap URLs in MongoDB
 */
router.post("/add-custom-website", async (req, res) => {
  try {
    const { userId, name, url } = req.body;

    if (!userId || !url || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get sitemap
    const sitemapUrl = url.endsWith("/") ? `${url}sitemap.xml` : `${url}/sitemap.xml`;
    const response = await axios.get(sitemapUrl, { timeout: 10000 });
    const parsed = await xml2js.parseStringPromise(response.data);

    const urls =
      parsed?.urlset?.url?.map((u) => ({
        loc: u.loc?.[0],
        lastmod: u.lastmod?.[0] || null,
      })) || [];

    // Remove old data for that user and website
    await Page.deleteMany({ userId, siteName: name });

    // Store in MongoDB
    const pages = urls.map((u) => ({
      userId,
      siteName: name,
      url: u.loc,
      lastModified: u.lastmod,
    }));

    await Page.insertMany(pages);

    console.log(`✅ ${urls.length} URLs saved for user ${userId}`);
    res.status(200).json(urls);
  } catch (error) {
    console.error("❌ Error adding website:", error.message);
    res.status(500).json({ error: "Failed to add website", details: error.message });
  }
});

export default router;
