import { sql, normalize } from './_db.js';

// /api/drugs  ->  GET (danh sách)  |  POST (thêm mới)
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM drugs ORDER BY name ASC`;
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const d = normalize(req.body);
      if (!d.name) return res.status(400).json({ error: 'Thiếu tên thuốc.' });

      const [row] = await sql`
        INSERT INTO drugs
          (name, category, detail, route,
           dog_min, dog_max, dog_default, cat_min, cat_max, cat_default,
           conc_liquid, conc_tablet, warn_dog, warn_cat)
        VALUES
          (${d.name}, ${d.category}, ${d.detail}, ${d.route},
           ${d.dog_min}, ${d.dog_max}, ${d.dog_default}, ${d.cat_min}, ${d.cat_max}, ${d.cat_default},
           ${d.conc_liquid}, ${d.conc_tablet}, ${d.warn_dog}, ${d.warn_cat})
        RETURNING *`;
      return res.status(201).json(row);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
