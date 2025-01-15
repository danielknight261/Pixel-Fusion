import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Feed from "./components/Feed";
import LoginPage from "./components/LoginPage";
import ExitPage from "./components/ExitPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed user={user} setUser={setUser} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/exit" element={<ExitPage />} />
      </Routes>
    </Router>
  );
}

export default App;
