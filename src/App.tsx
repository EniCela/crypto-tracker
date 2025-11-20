import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Portofoliopage";
import FooterNav from "./components/FooterNav";
import PortofolioPage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import HeaderApp from "./components/header/HeaderApp";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
