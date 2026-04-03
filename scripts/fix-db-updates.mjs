import { createClient } from "@libsql/client";
import { fileURLToPath } from "url";
import path from "path";

// Node --env-file handles envs natively


const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function run() {
  try {
    console.log("Updating DB...");

    await db.execute(`
      UPDATE blogs SET 
        author = 'Ventara Team',
        meta_title = 'Kashmir Luxury Travel Guide | Ventara Global',
        og_title = 'Kashmir: Heaven on Earth — Luxury Travel Guide',
        og_description = 'From Dal Lake houseboats to Gulmarg ski slopes — discover Kashmir most extraordinary luxury experiences with Ventara Global.',
        canonical_url = 'https://ventaraglobal.com/blog/kashmir-heaven-on-earth-a-complete-luxury-travel-guide'
      WHERE id = 1;
    `);

    await db.execute(`
      UPDATE blogs SET
        og_image = 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80',
        canonical_url = 'https://ventaraglobal.com/blog/kerala-tourism-the-ultimate-travel-guide-to-munnar-and-wayanad'
      WHERE id = 2;
    `);

    // Note: Since libSQL strings execute natively, this replacement works perfectly
    await db.execute(`
      UPDATE blogs SET body = REPLACE(body, 'Vantara Global', 'Ventara Global') WHERE id = 1;
    `);
    
    await db.execute(`
      UPDATE blogs SET body = REPLACE(body, 'Vantara Team', 'Ventara Team') WHERE id = 1;
    `);

    await db.execute(`
      UPDATE blogs SET body = REPLACE(body, '98765 43210', '8921 2480 55')
    `);

    console.log("DB update successful");
  } catch (err) {
    console.error("DB update failed:", err);
  }
}

run();
