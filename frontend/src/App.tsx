import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Blogs } from "./Pages/Blogs";
import { Blog } from "./Pages/Blog";
import { useEffect } from "react";
import { Publish } from "./Pages/Publish";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/AuthContext";
import { Spinner } from "./components/Spinner";
import { Toaster } from "react-hot-toast";
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRuotes() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster />
        <Routes>
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/blogs" /> : <Signup />}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/blogs" /> : <Signin />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/blogs" /> : <Signin />}
          />
          <Route
            path="/blogs"
            element={isAuthenticated ? <Blogs /> : <Navigate to="/signin" />}
          />
          <Route
            path="/blog/:id"
            element={isAuthenticated ? <Blog /> : <Navigate to="/signin" />}
          />
          <Route
            path="publish"
            element={isAuthenticated ? <Publish /> : <Navigate to="/signin" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
function App() {
  return (
    <AuthProvider>
      <AppRuotes />
    </AuthProvider>
  );
}

export default App;
