import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GymProvider, useGym } from './context/GymContext';
import MainLayout from './layouts/MainLayout';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';
import Exercise from './pages/Exercise';
import Schedule from './pages/Schedule';
import History from './pages/History';
import Progress from './pages/Progress';
import Goals from './pages/Goals';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function AppRoutes() {
  const { profile } = useGym();
  const isOnboarded = profile?.onboardingComplete === true;

  return (
    <Routes>
      <Route path="/onboarding" element={isOnboarded ? <Navigate to="/" replace /> : <Onboarding />} />
      <Route element={isOnboarded ? <MainLayout /> : <Navigate to="/onboarding" replace />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workouts" element={<Workout />} />
        <Route path="/exercises" element={<Exercise />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/history" element={<History />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <GymProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GymProvider>
  );
}
