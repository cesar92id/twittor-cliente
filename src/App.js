import React, { useState, useEffect } from "react";
import SignInSingUp from "./page/SignInSingUp";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/contexts";
import { isUserLogedApi } from "./api/auth";
import Routing from "./routes/Routing.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshChecklogin, setRefreshChecklogin] = useState(false);

  useEffect(() => {
    setUser(isUserLogedApi());
    setRefreshChecklogin(false);
    setLoadUser(true);
  }, [refreshChecklogin]);

  if (!loadUser) {
    return null;
  }

  return (
    <AuthContext.Provider value={user}>
      {user ? (
        <Routing setRefreshChecklogin={setRefreshChecklogin} />
      ) : (
        <SignInSingUp setRefreshChecklogin={setRefreshChecklogin} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilyChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
