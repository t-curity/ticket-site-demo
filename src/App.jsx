import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import TheaterInfoPage from "./pages/TheaterInfoPage";
import ReservationPage from "./pages/ReservationPage";

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <BrowserRouter basename={basename}>
      <Toaster position="bottom-center" richColors />

      <Routes>
        <Route path="/" element={<TheaterInfoPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
