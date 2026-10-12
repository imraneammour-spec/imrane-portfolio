import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
};
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1");
    let path = resolve(root, "." + decodeURIComponent(url.pathname));
    if (path !== root && !path.startsWith(root + sep)) {
      res.writeHead(403).end();
      return;
    }
    let status = 200;
    try {
      if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
      await stat(path);
    } catch {
      path = resolve(root, "404.html");
      status = 404;
    }
    const data = await readFile(path);
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    const headers = {
      "Content-Type": types[extname(path)] || "application/octet-stream",
      "Accept-Ranges": "bytes",
    };
    if (range && status === 200) {
      const start = Number(range[1]),
        end = Math.min(Number(range[2] || data.length - 1), data.length - 1);
      if (start > end || start >= data.length) {
        res.writeHead(416, { "Content-Range": `bytes */${data.length}` }).end();
        return;
      }
      res.writeHead(206, {
        ...headers,
        "Content-Range": `bytes ${start}-${end}/${data.length}`,
        "Content-Length": end - start + 1,
      });
      res.end(
        req.method === "HEAD" ? undefined : data.subarray(start, end + 1),
      );
    } else {
      res.writeHead(status, { ...headers, "Content-Length": data.length });
      res.end(req.method === "HEAD" ? undefined : data);
    }
  } catch {
    res.writeHead(500).end("Preview unavailable. Run npm run build first.");
  }
}).listen(3000, "127.0.0.1", () =>
  console.log("Production preview: http://127.0.0.1:3000"),
);
