import {  Route, Routes } from "react-router";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { PortectedRoute } from "./pages/ProtectedRoute";
import { PageNotFound } from "./pages/PageNotFound";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <PortectedRoute>
              <Dashboard />
            </PortectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PortectedRoute>
              <Profile />
            </PortectedRoute>
          }
        />
        <Route
          path="/send/:id"
          element={
            <PortectedRoute>
              <SendMoney />
            </PortectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
