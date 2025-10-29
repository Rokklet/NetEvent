import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/Router.tsx";

const App: React.FC = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);

export default App;
