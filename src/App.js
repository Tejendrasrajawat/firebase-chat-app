import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Common from "./components/common/Common";

import Group from "./components/Group/Group";
import G_chat from "./components/Group/G_chat";
import Main from "./components/Main";

import Single from "./components/Single/Single";
import S_chat from "./components/Single/S_chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="main" element={<Main />} />
        <Route path="group" element={<Group />} />
        <Route path="single" element={<Single />} />
        <Route path="common" element={<Common />} />

        <Route path="g_chat/:id" element={<G_chat />} />
        <Route path="s_chat/:id" element={<S_chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
