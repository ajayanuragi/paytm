import { Route, Routes } from "react-router";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { PortectedRoute } from "./pages/ProtectedRoute";
import { PageNotFound } from "./pages/PageNotFound";
import { Home } from "./pages/Home";
import { EditProfile } from "./components/profile/EditProfile";
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
          path="/edit-profile"
          element={
            <PortectedRoute>
              <EditProfile />
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
