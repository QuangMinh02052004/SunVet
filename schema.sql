-- ============================================================
--  VetDose · Schema cho Neon Postgres
--  Cách dùng: mở Neon Console -> SQL Editor -> dán toàn bộ file
--  này và bấm Run. Chạy 1 lần là đủ.
-- ============================================================

CREATE TABLE IF NOT EXISTS drugs (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  category     TEXT NOT NULL DEFAULT '',
  detail       TEXT NOT NULL DEFAULT '',
  route        TEXT NOT NULL DEFAULT '',
  dog_min      NUMERIC,
  dog_max      NUMERIC,
  dog_default  NUMERIC,
  cat_min      NUMERIC,
  cat_max      NUMERIC,
  cat_default  NUMERIC,
  conc_liquid  NUMERIC NOT NULL DEFAULT 1,
  conc_tablet  NUMERIC NOT NULL DEFAULT 1,
  warn_dog     TEXT NOT NULL DEFAULT '',
  warn_cat     TEXT NOT NULL DEFAULT '',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Dữ liệu mẫu (chỉ chèn khi bảng đang trống) -----------------
INSERT INTO drugs
  (name, category, detail, route,
   dog_min, dog_max, dog_default, cat_min, cat_max, cat_default,
   conc_liquid, conc_tablet, warn_dog, warn_cat)
SELECT * FROM (VALUES
  ('Amoxicillin',     'Kháng sinh',              'Kháng sinh nhóm Penicillin',     'Uống / Tiêm', 10, 22, 15, 10, 22, 15, 50,  250, '', ''),
  ('Enrofloxacin',    'Kháng sinh',              'Fluoroquinolone phổ rộng',       'Uống / Tiêm', 5,  20, 10, 5,  5,  5,  25,  50,  '', 'Liều > 5 mg/kg ở mèo có thể gây mù mắt (thoái hóa võng mạc). Giới hạn 5 mg/kg/ngày.'),
  ('Doxycycline',     'Kháng sinh',              'Tetracycline thế hệ 2',          'Uống',        5,  10, 5,  5,  10, 5,  10,  100, '', ''),
  ('Metronidazole',   'Kháng sinh',              'Kháng sinh / kháng đơn bào',     'Uống',        10, 25, 15, 10, 25, 15, 40,  250, '', ''),
  ('Meloxicam',       'Giảm đau - Kháng viêm',   'NSAID chọn lọc COX-2',           'Uống / Tiêm', 0.1, 0.2, 0.1, 0.05, 0.1, 0.05, 1.5, 1, '', 'Mèo rất nhạy với NSAID — chỉ dùng liều thấp, một lần, theo dõi thận sát.'),
  ('Carprofen',       'Giảm đau - Kháng viêm',   'NSAID giảm đau sau phẫu thuật',  'Uống / Tiêm', 2,  4,  4,  1,  4,  2,  50,  25,  '', ''),
  ('Tramadol',        'Giảm đau - Kháng viêm',   'Giảm đau opioid yếu',            'Uống',        2,  5,  3,  1,  4,  2,  5,   50,  '', ''),
  ('Prednisolone',    'Nội tiết - Corticoid',    'Glucocorticoid kháng viêm',      'Uống / Tiêm', 0.5, 2, 1, 0.5, 2, 1, 5, 5,    '', ''),
  ('Furosemide',      'Tim mạch',                'Lợi tiểu quai',                  'Uống / Tiêm', 1,  4,  2,  1,  2,  1,  10,  40,  '', ''),
  ('Maropitant',      'Tiêu hóa',                'Chống nôn (Cerenia)',            'Tiêm / Uống', 1,  2,  1,  1,  1,  1,  10,  16,  '', ''),
  ('Ivermectin',      'Ký sinh trùng',           'Diệt nội & ngoại ký sinh',       'Tiêm / Uống', 0.2, 0.4, 0.3, 0.2, 0.3, 0.2, 10, 1, 'CHỐNG CHỈ ĐỊNH với các giống nhạy MDR1 (Collie, Sheepdog…). Có thể gây ngộ độc thần kinh nặng.', ''),
  ('Diphenhydramine', 'Kháng histamin',          'Kháng dị ứng H1',                'Uống / Tiêm', 2,  4,  2,  2,  4,  2,  50,  25,  '', '')
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM drugs);
