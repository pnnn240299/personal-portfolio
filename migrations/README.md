# Migration giống Laravel cho Next.js

Hệ thống migration này giúp bạn tạo, chạy và rollback migration giống Laravel, dùng PostgreSQL/pg trong Node.

## Cài đặt

1. Cài biến môi trường kết nối:

```bash
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
```

2. Cài dependency nếu chưa có:

```bash
npm install
```
```

## Các lệnh

- `npm run migrate:new <description>`: tạo file migration mới
- `npm run migrate:up`: chạy các migration chưa apply
- `npm run migrate:down`: rollback migration cuối cùng
- `npm run migrate:status`: kiểm tra trạng thái migration

## Cấu trúc file migration

File SQL được lưu trong `migrations/` với tên:

```
20260424090000_create_projects_table.sql
```

Cấu trúc file:

```sql
-- up
CREATE TABLE projects (
  id serial PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- down
DROP TABLE IF EXISTS projects;
```

## Gợi ý cho Supabase

Đối với Supabase, bạn lấy connection string PostgreSQL từ trang cài đặt database của Supabase và đặt vào `DATABASE_URL`.
