import React from "react";
import { useAuthentication } from "../utils/useAuthentication";
import AppContainer from "./AppNavigation";
import AuthStack from "./AuthStack";
import { useAuth } from "../utils/AuthContext";

const RootNavigation = () => {
  const { user } = useAuth();

  return user ? <AppContainer /> : <AuthStack />;
};

export default RootNavigation;
