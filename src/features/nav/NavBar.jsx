import React, { useState } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, useHistory } from "react-router-dom";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";

export default function NavBar({ setFormOpen }) {
  // NavBar is not oart of a 'Route'
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);

  function handleSignOut() {
    setAuthenticated(false);
    history.push("/");
  }
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img
            src="./assets/logo.png"
            alt="logo"
            style={{ marginRight: "15px" }}
          />
          re-Vents
        </Menu.Item>
        <Menu.Item name="Events" as={NavLink} to="/events" />

        <Menu.Item as={NavLink} to="/createevent">
          <Button positive inverted content="Create event" />
        </Menu.Item>
        {authenticated ? (
          <SignedInMenu signOut={handleSignOut} />
        ) : (
          <SignedOutMenu setAuthenticated={setAuthenticated} />
        )}
      </Container>
    </Menu>
  );
}
