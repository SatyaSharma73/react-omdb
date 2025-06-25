import React from "react";
import { Link } from "react-router-dom";
import "./pagenotfound.scss";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="home-link">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
