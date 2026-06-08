import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import JenisWayang from "./pages/JenisWayang";
import WayangDetail from "./pages/WayangDetail";
import Timeline from "./pages/Timeline";
import Glossary from "./pages/Glossary";
import Quiz from "./pages/Quiz";
import DalangStudio from "./pages/DalangStudio";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/jenis" element={<JenisWayang />} />
        <Route path="/jenis/:typeId" element={<WayangDetail />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/studio" element={<DalangStudio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
