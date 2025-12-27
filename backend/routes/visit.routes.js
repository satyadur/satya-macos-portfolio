import express from "express";
import Visit from "../models/Visit.js";
import { UAParser } from "ua-parser-js";
import fetch from "node-fetch";
import geoip from "geoip-lite";

const router = express.Router();

/**
 * POST /api/visit
 * Runs ONLY after cookie consent
 */
router.post("/", async (req, res) => {
  try {
    const parser = new UAParser(req.headers["user-agent"]);
    const ua = parser.getResult();

    let ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.ip ||
      req.socket.remoteAddress;

    if (ip === "::1") ip = "127.0.0.1";

    let city = "Unknown";
    let country = "Unknown";

    if (ip !== "127.0.0.1") {
      const geo = geoip.lookup(ip);
      city = geo?.city || "Unknown";
      country = geo?.country || "Unknown";
    }

    await Visit.create({
      ip,
      city,
      country,
      browser: ua.browser.name,
      os: ua.os.name,
      device: ua.device.type || "Desktop",
      userAgent: req.headers["user-agent"],
    });

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



/**
 * GET /api/visit/stats
 */
router.get("/stats", async (_, res) => {
  try {
    const totalVisits = await Visit.countDocuments();

    const visitsByBrowser = await Visit.aggregate([
      { $group: { _id: "$browser", count: { $sum: 1 } } },
    ]);

    const visitsPerDay = await Visit.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$visitedAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 7 },
    ]);

    const recentVisits = await Visit.find()
      .sort({ visitedAt: -1 })
      .limit(5);

    res.json({
      totalVisits,
      visitsByBrowser,
      visitsPerDay,
      recentVisits,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
