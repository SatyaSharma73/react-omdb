import "./App.scss";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/home/home";
import MovieDetails from "./components/moviedetails/moviedetails";
import PageNotFound from "./components/pagenotfound/pagenotfound";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/Auth/Login/Login";
import SignPage from "./components/Auth/Signup/Signup";
import { UserAuthContextProvider } from "./components/Context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <BrowserRouter>
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/movie/:imdbID" element={<MovieDetails />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
