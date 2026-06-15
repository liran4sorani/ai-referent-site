// server/index.ts
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var CDN_REDIRECTS = {
  "/manus-storage/logo_dac5a66b.png": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/fUsxeBSLjVwJIIYL.png",
  "/manus-storage/hero_illustration_a1b2c3d4.png": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/FHIRgYoQFZtdfnSm.png",
  "/manus-storage/feature_chat_5e7e922d.png": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/jZFOVMWuFGKRRkgN.png",
  "/manus-storage/feature_docs_a1b2c3d4.png": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/YVpLvkMDMzFpfVlJ.png",
  "/manus-storage/feature_shield_a1b2c3d4.png": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/LiVxqkRbkqMJQjKY.png"
};
async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use((req, res, next) => {
    if (req.path.startsWith("/manus-storage/")) {
      const cdnUrl = CDN_REDIRECTS[req.path];
      if (cdnUrl) {
        return res.redirect(301, cdnUrl);
      }
      const filename = req.path.split("/").pop() || "";
      for (const [key, url] of Object.entries(CDN_REDIRECTS)) {
        if (key.includes(filename.split("_")[0])) {
          return res.redirect(301, url);
        }
      }
    }
    next();
  });
  const staticPath = process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");
  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
  const port = process.env.PORT || 3e3;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
