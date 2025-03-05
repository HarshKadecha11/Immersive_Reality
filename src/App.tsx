import { Suspense, useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import PropertiesPage from "./pages/properties";
import PropertyPage from "./pages/property/[id]";
import MapSearchPage from "./pages/map-search";
import MortgagePage from "./pages/mortgage";
import AgentsPage from "./pages/agents";
import VRToursPage from "./pages/vr-tours";
import BlogPage from "./pages/blog";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import PropertyTourPage from "./pages/property-tour";
import SupabaseSetupPage from "./pages/supabase-setup";
import ProfilePage from "./pages/profile";
import SettingsPage from "./pages/settings";
import routes from "tempo-routes";
import { NotificationProvider } from "./components/NotificationProvider";
import LoadingScreen from "./components/LoadingScreen";
import { isSupabaseConfigured } from "./lib/supabase";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading with a shorter time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <NotificationProvider>
        <LoadingScreen isLoading={isLoading} />
        <Suspense fallback={<LoadingScreen isLoading={true} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:id" element={<PropertyPage />} />
            <Route path="/property-tour" element={<PropertyTourPage />} />
            <Route path="/map-search" element={<MapSearchPage />} />
            <Route path="/mortgage" element={<MortgagePage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/vr-tours" element={<VRToursPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/supabase-setup" element={<SupabaseSetupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </Suspense>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
