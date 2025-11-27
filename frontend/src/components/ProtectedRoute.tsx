import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; // Mảng các role được phép truy cập (VD: ['TUTOR', 'ADMIN'])
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('access_token');
  const userStr = localStorage.getItem('user');

  // 1. Kiểm tra đăng nhập (Authentication)
  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userStr);

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'STUDENT') {
      return <Navigate to="/findTutor" replace />;
    }

    if (user.role === 'TUTOR') {
      return <Navigate to="/tutor" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
};
