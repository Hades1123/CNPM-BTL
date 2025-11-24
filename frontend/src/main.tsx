import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { LandingPage } from '@/pages/landing';
import { LoginPage } from '@/pages/login';
import '@/styles/global.css';
import { FindTutorPage } from './pages/find.tutor';
import { MyCourse } from './pages/myCourse';
import { TutorPage } from './pages/tutorSchedule';
import { ProfilePage } from './pages/profile';
import { FeedBackPage } from './pages/feedback';

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
		path: 'findTutor',
		element: <FindTutorPage />,
	},
	{
		path: 'myCourse',
		element: <MyCourse />,
	},
	{
		path: 'tutor',
		element: <TutorPage />,
	},
	{
		path: 'profile',
		element: <ProfilePage />,
	},
	{
		path: 'feedback',
		element: <FeedBackPage />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
