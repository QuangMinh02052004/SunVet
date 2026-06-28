# VetDose

Phần mềm tra cứu & tính liều thuốc thú y. Frontend tĩnh (`index.html`) + API CRUD chạy bằng Vercel Serverless Functions + database Neon (Postgres).

## Cấu trúc
```
index.html          Giao diện (tính liều + thêm/sửa/xóa thuốc)
api/drugs.js        GET danh sách | POST thêm
api/drugs/[id].js   PUT sửa | DELETE xóa
api/_db.js          Kết nối Neon + chuẩn hóa dữ liệu
schema.sql          Tạo bảng + dữ liệu mẫu (chạy trong Neon console)
```

## Triển khai (chỉ cần Neon + Vercel)

### 1. Tạo database trên Neon
1. Vào https://console.neon.tech → tạo project.
2. Mở **SQL Editor**, dán toàn bộ nội dung `schema.sql` rồi **Run** (tạo bảng + 12 thuốc mẫu).
3. Vào **Connect** / **Connection string**, copy chuỗi `postgresql://...` (chọn loại *Pooled connection*).

### 2. Deploy lên Vercel
1. Đẩy thư mục này lên GitHub, rồi **Import Project** ở https://vercel.com — hoặc dùng CLI: `npm i -g vercel && vercel`.
2. Trong **Settings → Environment Variables**, thêm:
   - `DATABASE_URL` = chuỗi kết nối Neon vừa copy.
3. **Deploy**. Vercel tự nhận `api/` là serverless functions và cài `@neondatabase/serverless`.

Xong — mở URL Vercel cấp là dùng được, dữ liệu lưu trên Neon.

## Chạy thử ở máy (tùy chọn)
```bash
npm install
echo "DATABASE_URL=postgresql://..." > .env
vercel dev        # mở http://localhost:3000
```
> Mở `index.html` trực tiếp bằng `file://` sẽ KHÔNG gọi được API (cần server). Dùng `vercel dev` hoặc deploy.

## Cài như app trên điện thoại (PWA)
App đã hỗ trợ cài đặt trên Android:
1. Mở link Vercel bằng **Chrome trên Android**.
2. Bấm nút **Cài ứng dụng** (góc phải dưới) hoặc menu **⋮ → Cài đặt ứng dụng / Add to Home screen**.
3. Icon VetDose xuất hiện trên màn hình chính, mở ra chạy toàn màn hình như app thật.

> PWA cần chạy qua HTTPS — tức là phải mở từ link Vercel, không phải `file://`.

## Lưu ý
- Dữ liệu liều trong `schema.sql` là **giá trị mẫu để demo** — hãy rà soát lại theo nguồn lâm sàng trước khi dùng thật.
- API hiện **không có xác thực**: ai có link cũng thêm/sửa/xóa được. Nếu cần, thêm 1 lớp mật khẩu/đăng nhập sau.
