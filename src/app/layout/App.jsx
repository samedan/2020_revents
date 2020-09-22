import React from "react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import Sandbox from "./../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";
import { ToastContainer } from "react-toastify";
import ErrorComponent from "./../common/errors/ErrorComponent";
import AccountPage from "./../../features/auth/AccountPage";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import ProfilePage from "./../../features/profiles/profilePage/ProfilePage";
import PrivateRoute from "./PrivateRoute";

function App() {
  const { key } = useLocation();

  const { initialized } = useSelector((state) => state.async);

  // waits to see if it can read a 'user' from firebase
  if (!initialized) return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <ModalManager />
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/events/:id" component={EventDetailedPage} />
              <PrivateRoute exact path="/sandbox" component={Sandbox} />
              <PrivateRoute
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
                key={key}
              />
              <Route path="/error" component={ErrorComponent} />
              <PrivateRoute path="/profile/:id" component={ProfilePage} />
              <PrivateRoute path="/account" component={AccountPage} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
