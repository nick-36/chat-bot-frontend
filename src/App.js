import React from "react";
import { Route, Routes } from "react-router-dom";
import { StreamChat } from "stream-chat";

import { Home, Login, Register } from "./Pages";

import "@stream-io/stream-chat-css/dist/css/index.css";
import Cookies from "universal-cookie";
import { RequireAuth } from "./components";
import "./sass/main.scss";

const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);
const cookies = new Cookies();
const authToken = cookies.get("token");

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("userName"),
      fullName: cookies.get("fullName"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
  );
}
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home client={client} />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
