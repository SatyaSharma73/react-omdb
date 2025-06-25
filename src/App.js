import "./App.scss";
import React from "react";
import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import home from "./components/home/home";
import moviedetails from "./components/moviedetails/moviedetails";
import pagenotfound from "./components/pagenotfound/pagenotfound";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
          <Header></Header>
          <div className="container">
            <Routes>
              {" "}
              <Route path="/" exact Component={home}></Route>
              <Route path="/movie/:imdbID" Component={moviedetails}></Route>
              <Route path="*" Component={pagenotfound}></Route>
            </Routes>
          </div>

          <Footer></Footer>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
