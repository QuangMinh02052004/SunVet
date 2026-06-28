import { sql, normalize } from '../_db.js';

// /api/drugs/:id  ->  PUT (sửa)  |  DELETE (xóa)
export default async function handler(req, res) {
  try {
    const id = Number(req.query.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'ID không hợp lệ.' });

    if (req.method === 'PUT') {
      const d = normalize(req.body);
      if (!d.name) return res.status(400).json({ error: 'Thiếu tên thuốc.' });

      const [row] = await sql`
        UPDATE drugs SET
          name = ${d.name}, category = ${d.category}, detail = ${d.detail}, route = ${d.route},
          dog_min = ${d.dog_min}, dog_max = ${d.dog_max}, dog_default = ${d.dog_default},
          cat_min = ${d.cat_min}, cat_max = ${d.cat_max}, cat_default = ${d.cat_default},
          conc_liquid = ${d.conc_liquid}, conc_tablet = ${d.conc_tablet},
          warn_dog = ${d.warn_dog}, warn_cat = ${d.warn_cat}
        WHERE id = ${id}
        RETURNING *`;
      if (!row) return res.status(404).json({ error: 'Không tìm thấy thuốc.' });
      return res.status(200).json(row);
    }

    if (req.method === 'DELETE') {
      const [row] = await sql`DELETE FROM drugs WHERE id = ${id} RETURNING id`;
      if (!row) return res.status(404).json({ error: 'Không tìm thấy thuốc.' });
      return res.status(200).json({ ok: true, id });
    }

    res.setHeader('Allow', 'PUT, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
