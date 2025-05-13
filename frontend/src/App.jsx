import { Navigate, Route, Routes } from "react-router";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { PortectedRoute } from "./components/ProtectedRoute";
import { PageNotFound } from "./components/PageNotFound";
function App() {
  return (
    <>
      <Routes>
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
          path="/send"
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