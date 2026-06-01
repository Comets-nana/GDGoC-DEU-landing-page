import { createBrowserRouter, Navigate } from 'react-router';
import HomePage from './pages/HomePage';
import NotAvailablePage from './pages/NotAvailablePage';
import StudyNotAvailablePage from './pages/StudyNotAvailablePage';
import TeamLoginPage from './pages/TeamLoginPage';
import TeamDashboardPage from './pages/TeamDashboardPage';
import StudyManagePage from './pages/dashboard/StudyManagePage';
import SessionManagePage from './pages/dashboard/SessionManagePage';
import TeamMemberManagePage from './pages/dashboard/TeamMemberManagePage';
import GalleryManagePage from './pages/dashboard/GalleryManagePage';
import ContactPage from './pages/ContactPage';
import InquiryManagePage from './pages/dashboard/InquiryManagePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/study/:studyId',
    Component: StudyNotAvailablePage,
  },
  // {
  //   path: '/contact',
  //   Component: ContactPage,
  // },
  // {
  //   path: '/team/login',
  //   Component: TeamLoginPage,
  // },
  // {
  //   path: '/team/dashboard',
  //   Component: TeamDashboardPage,
  //   children: [
  //     {
  //       index: true,
  //       element: <Navigate to="studies" replace />,
  //     },
  //     {
  //       path: 'studies',
  //       Component: StudyManagePage,
  //     },
  //     {
  //       path: 'sessions',
  //       Component: SessionManagePage,
  //     },
  //     {
  //       path: 'team-members',
  //       Component: TeamMemberManagePage,
  //     },
  //     {
  //       path: 'gallery',
  //       Component: GalleryManagePage,
  //     },
  //     {
  //       path: 'inquiry',
  //       Component: InquiryManagePage,
  //     },
  //   ],
  // },
  {
    path: '*',
    Component: NotAvailablePage,
  },
]);
