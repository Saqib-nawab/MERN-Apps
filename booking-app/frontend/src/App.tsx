import Layout from "./layouts/Layout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";


//pages
import Register from "./pages/Register";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search page</p>
            </Layout>
          }
        />

         <Route
          path="/register"
          element={
            <Layout>
              <Register/>
            </Layout>
          }
        />
      </Routes>
    </Router>
    </>
  )
}

export default App;
