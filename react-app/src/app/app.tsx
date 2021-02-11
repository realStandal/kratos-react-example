import React from "react";
import { Router } from "@reach/router";

// Pages
import { Error, Login, Register } from "../page";

export const App = () => (
  <Router>
    <Error path="error" />
    <Login path="auth/login" />
    <Register path="auth/register" />
  </Router>
);
