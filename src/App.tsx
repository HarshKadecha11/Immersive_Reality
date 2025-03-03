import { Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import PropertiesPage from "./pages/properties";
import PropertyPage from "./pages/property/[id]";
import MapSearchPage from "./pages/map-search";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
          <Route path="/map-search" element={<MapSearchPage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </Suspense>
    </AuthProvider>
  );
}

export default App;
