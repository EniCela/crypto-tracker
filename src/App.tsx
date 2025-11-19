// import './App.css';
// import HomePage from './pages/HomePage';
// function App() {
//   return (
//     <div className="App">
//       <HomePage></HomePage>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FooterNav from "./components/FooterNav";
import PortofolioPage from "./pages/PortofolioPage";
import ProfilePage from "./pages/ProfilePage";
import HeaderApp from "./components/HeaderApp";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Box mb={8}>
        <HeaderApp />
      </Box>
      <div className="App" style={{ paddingBottom: "80px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins" element={<PortofolioPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>

      <FooterNav />
    </BrowserRouter>
  );
}

export default App;
