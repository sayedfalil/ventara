import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function run() {
  const blogs = await db.execute("PRAGMA table_info(blogs)");
  console.log("BLOGS SCHEMA", blogs.rows);
  const pkgs = await db.execute("PRAGMA table_info(packages)");
  console.log("PACKAGES SCHEMA", pkgs.rows);
}
run();
