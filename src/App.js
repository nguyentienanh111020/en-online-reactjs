import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Footer from "./components/Footer";
import Level from "./components/pages/Level";
import LevelDisplay from "./components/pages/LevelDisplay";
import LevelDisplay2 from "./components/pages/LevelDisplay2";
import LevelDisplay3 from "./components/pages/LevelDisplay3";
import BeginnerLevel from "./components/BeginnerLevel";
import IntermediateLevel from "./components/IntermediateLevel";
import AdvancedLevel from "./components/AdvancedLevel";
import Dictionary from "./components/pages/Dictionary";
import LogIn from "./components/pages/LogIn";
import Admin from "./components/pages/Admin";
import Admin2 from "./components/pages/Admin2";
import Admin3 from "./components/pages/Admin3";
import ContactAdmin from "./components/pages/ContactAdmin";
import Contact from "./components/pages/Contact";
import { AuthContext } from "./components/context/AuthContext";
import { useContext } from "react";
import CreateNewUser from "./components/pages/CreateNewUser";
import Profile from "./components/pages/Profile";
import ResetPassword from "./components/pages/ResetPassword";
import BeginnerAdmin from "./components/pages/BeginnerAdmin";
import ViewLesson from "./components/pages/ViewLesson";
import ViewLesson2 from "./components/pages/ViewLesson2";
import ViewLesson3 from "./components/pages/ViewLesson3";
import IntermediateAdmin from "./components/pages/IntermediateAdmin";
import AdvancedAdmin from "./components/pages/AdvancedAdmin";
import LevelTest from "./components/pages/LevelTest";
import QuizMenu from "./components/quiz/QuizMenu";
import QuizAdmin from "./components/pages/QuizAdmin";
import QuizNew from "./components/pages/QuizNew";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/admin"
            index
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/admin2"
            index
            element={
              <RequireAuth>
                <Admin2 />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/admin3"
            index
            element={
              <RequireAuth>
                <Admin3 />
              </RequireAuth>
            }
          />
          <Route exact path="/viewlesson" element={<ViewLesson />} />
          <Route exact path="/viewlesson2" element={<ViewLesson2 />} />
          <Route exact path="/viewlesson3" element={<ViewLesson3 />} />
          <Route
            exact
            path="/intermediateadmin"
            element={<IntermediateAdmin />}
          />
          <Route exact path="/beginneradmin" element={<BeginnerAdmin />} />
          <Route exact path="/advancedadmin" element={<AdvancedAdmin />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="createuser" element={<CreateNewUser />} />
          <Route exact path="resetpassword" element={<ResetPassword />} />
          <Route
            exact
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route exact path="/quiznew" element={<QuizNew />} />
          <Route exact path="/quizadmin" element={<QuizAdmin />} />
          <Route exact path="/quizmenu" element={<QuizMenu />} />
          <Route exact path="/leveltest" element={<LevelTest />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dictionary" element={<Dictionary />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/levels" element={<Level />} />
          <Route exact path="/contactadmin" element={<ContactAdmin />} />
          <Route path="/beginnerlevel" element={<BeginnerLevel />} />
          <Route exact path="beginnerlevel/:id" element={<LevelDisplay />} />
          <Route
            exact
            path="/intermediatelevel"
            element={<IntermediateLevel />}
          />
          <Route
            exact
            path="intermediatelevel/:id"
            element={<LevelDisplay2 />}
          />
          <Route exact path="/advancedlevel" element={<AdvancedLevel />} />
          <Route exact path="/advancedlevel/:id" element={<LevelDisplay3 />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
