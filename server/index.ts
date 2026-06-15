import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CDN URL mapping for manus-storage assets
const CDN_REDIRECTS: Record<string, string> = {
  "/manus-storage/logo_dac5a66b.png":
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/fUsxeBSLjVwJIIYL.png",
  "/manus-storage/hero_illustration_a1b2c3d4.png":
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/FHIRgYoQFZtdfnSm.png",
  "/manus-storage/feature_chat_5e7e922d.png":
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/jZFOVMWuFGKRRkgN.png",
  "/manus-storage/feature_docs_a1b2c3d4.png":
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/YVpLvkMDMzFpfVlJ.png",
  "/manus-storage/feature_shield_a1b2c3d4.png":
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/LiVxqkRbkqMJQjKY.png",
};

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Redirect manus-storage URLs to public CDN
  app.use((req, res, next) => {
    if (req.path.startsWith("/manus-storage/")) {
      // Try exact match first
      const cdnUrl = CDN_REDIRECTS[req.path];
      if (cdnUrl) {
        return res.redirect(301, cdnUrl);
      }
      // Try partial match by filename
      const filename = req.path.split("/").pop() || "";
      for (const [key, url] of Object.entries(CDN_REDIRECTS)) {
        if (key.includes(filename.split("_")[0])) {
          return res.redirect(301, url);
        }
      }
    }
    next();
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
