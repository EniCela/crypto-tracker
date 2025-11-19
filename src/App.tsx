import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FooterNav from "./components/FooterNav";
import PortofolioPage from "./pages/PortofolioPage";
import ProfilePage from "./pages/ProfilePage";
import HeaderApp from "./components/HeaderApp";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
