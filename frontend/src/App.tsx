import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
const Signup = lazy(() => import("./Pages/Signup"));
const Signin = lazy(() => import("./Pages/Signin"));
const Blogs = lazy(() => import("./Pages/Blogs"));
const Blog = lazy(() => import("./Pages/Blog"));
const Publish = lazy(() => import("./Pages/Publish"));
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/AuthContext";
import { Spinner } from "./components/Spinner";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "./components/ErrorBoundary";
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
        <Suspense fallback={<Spinner />}>
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
              element={
                isAuthenticated ? <Publish /> : <Navigate to="/signin" />
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRuotes />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
