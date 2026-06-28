import { neon } from '@neondatabase/serverless';

// Kết nối Neon. Lấy chuỗi kết nối từ biến môi trường DATABASE_URL
// (cấu hình trong Vercel -> Settings -> Environment Variables).
export const sql = neon(process.env.DATABASE_URL);

// Danh sách cột cho phép ghi (whitelist) + ép kiểu số.
export function normalize(body = {}) {
  const num = (v) => (v === '' || v === null || v === undefined ? null : Number(v));
  return {
    name:        String(body.name ?? '').trim(),
    category:    String(body.category ?? '').trim(),
    detail:      String(body.detail ?? '').trim(),
    route:       String(body.route ?? '').trim(),
    dog_min:     num(body.dog_min),
    dog_max:     num(body.dog_max),
    dog_default: num(body.dog_default),
    cat_min:     num(body.cat_min),
    cat_max:     num(body.cat_max),
    cat_default: num(body.cat_default),
    conc_liquid: num(body.conc_liquid) ?? 1,
    conc_tablet: num(body.conc_tablet) ?? 1,
    warn_dog:    String(body.warn_dog ?? '').trim(),
    warn_cat:    String(body.warn_cat ?? '').trim(),
  };
}
