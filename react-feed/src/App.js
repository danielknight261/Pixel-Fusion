import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Feed from "./components/Feed";
import ExitPage from "./components/ExitPage";
import UserInfoPage from "./components/UserInfoPage";
import AddInfoPage from "./components/AddInfoPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed user={user} setUser={setUser} />} />

        <Route path="/exit" element={<ExitPage />} />

        <Route path="/user-info" element={<UserInfoPage />} />

        <Route path="/add-info" element={<AddInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
