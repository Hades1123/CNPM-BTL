import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { LandingPage } from '@/pages/landing';
import { LoginPage } from '@/pages/login';
import '@/styles/global.css';
import { FindTutorPage } from '@/pages/find.tutor';
import { MyCourse } from '@/pages/myCourse';
import { TutorPage } from '@/pages/tutorSchedule';
import { ProfilePage } from '@/pages/profile';
import { FeedBackPage } from '@/pages/feedback';
import TutorCourse from '@/pages/tutorCourse';

import { ProtectedRoute } from '@/components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    path: 'profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'feedback',
    element: (
      <ProtectedRoute>
        <FeedBackPage />
      </ProtectedRoute>
    ),
  },

  {
    path: 'findTutor',
    element: (
      <ProtectedRoute allowedRoles={['STUDENT']}>
        <FindTutorPage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'myCourse',
    element: (
      <ProtectedRoute allowedRoles={['STUDENT']}>
        <MyCourse />
      </ProtectedRoute>
    ),
  },

  {
    path: 'tutor',
    element: (
      <ProtectedRoute allowedRoles={['TUTOR']}>
        <TutorPage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'tutorCourse',
    element: (
      <ProtectedRoute allowedRoles={['TUTOR']}>
        <TutorCourse />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
