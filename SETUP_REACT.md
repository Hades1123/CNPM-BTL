# Hướng Dẫn Setup React - Tutor Support System

## ✅ Dependencies đã có sẵn

Bạn đã có đầy đủ dependencies cần thiết trong `package.json`:

```json
{
  "dependencies": {
    "react": "18.3.1", // Core React
    "react-dom": "18.3.1", // ReactDOM renderer
    "react-router": "7.9.3", // Routing (v7 mới nhất)
    "sass": "1.93.2", // SCSS support
    "uuid": "^13.0.0", // ID generation
    "vite-tsconfig-paths": "5.1.4", // Path aliases (@/)
    "prettier": "^3.6.2" // Code formatter
  },
  "devDependencies": {
    "typescript": "5.5.4",
    "@types/react": "18.3.0",
    "@types/react-dom": "18.3.0",
    "vite": "7.1.7",
    "@vitejs/plugin-react-swc": "4.1.0"
    // ... ESLint config
  }
}
```

## 🚀 Cách chạy project

### Bước 1: Cài dependencies (lần đầu tiên)

```bash
cd frontend
npm install
```

### Bước 2: Chạy development server

```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:5173` (Vite default port)

### Bước 3: Build production

```bash
npm run build
```

## 📱 Flow điều hướng đã setup

```
Landing Page (/)
    ↓
    ├→ Bắt đầu ngay → Login (/login)
    │                  ↓
    │              Find Tutor (/findTutor)
    │                  ↓
    │            My Course (/myCourse)
    │                  ↓
    │           Tutor Schedule (/tutor)
    │                  ↓
    │              Profile (/profile)
    │                  ↓
    │              Feedback (/feedback)
    │
    └→ Navigation bar: Trang chủ | Tìm tutor | Lịch học | Tài khoản
```

## 🔗 Các route hiện có

| Route        | Component       | Tên               |
| ------------ | --------------- | ----------------- |
| `/`          | `LandingPage`   | Trang chủ         |
| `/login`     | `LoginPage`     | Đăng nhập         |
| `/findTutor` | `FindTutorPage` | Tìm Tutor         |
| `/myCourse`  | `MyCourse`      | Lịch học của tôi  |
| `/tutor`     | `TutorPage`     | Lịch Tutor        |
| `/profile`   | `ProfilePage`   | Thông tin cá nhân |
| `/feedback`  | `FeedBackPage`  | Đánh giá/Liên hệ  |

## 🔄 Chuyển hướng giữa các trang

Tất cả các routes đã được liên kết sử dụng `useNavigate()` từ react-router v7:

```typescript
import { useNavigate } from "react-router";

export const MyComponent = () => {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/tutor")}>Đi tới Tutor</button>;
};
```

## 📋 Các npm scripts có sẵn

```bash
npm run dev          # Chạy dev server
npm run build        # Build project
npm run lint         # Kiểm tra code style
npm run preview      # Xem build result
npm run format       # Format code với Prettier
```

## 🎨 Styling

- Sử dụng **CSS + SASS**
- File CSS cho từng page: `src/styles/*.css`
- Global CSS: `src/styles/global.css`
- Thêm variable CSS hoặc SCSS variables để dễ quản lý màu sắc

## 📦 Thêm package (nếu cần)

```bash
npm install package-name
```

**Các package thường dùng:**

- **axios** - HTTP client
- **react-query** - Data fetching & caching
- **zustand** - State management (nhẹ hơn Redux)
- **framer-motion** - Animation
- **tailwindcss** - Utility-first CSS (nếu muốn đổi styling)

## ⚙️ Cấu hình

- **Vite**: `vite.config.ts`
- **TypeScript**: `tsconfig.json`
- **ESLint**: `eslint.config.js`

## ❌ Lỗi thường gặp

### 1. Module not found

Kiểm tra path alias `@/` trong `vite.config.ts` và `tsconfig.json`

### 2. Port 5173 đã sử dụng

```bash
npm run dev -- --port 3000
```

### 3. React không render

Kiểm tra file `frontend/index.html` có `<div id="root"></div>`

---

**Chúc bạn code vui vẻ! 🎉**
