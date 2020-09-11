import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOutFirebase } from "../../app/firestore/firebaseService";
import { toast } from "react-toastify";

export default function SignedInMenu() {
  // const { currentUser } = useSelector((state) => state.auth);
  const { currentUserProfile } = useSelector((state) => state.profile);
  // redirect to '/'
  const history = useHistory();

  async function handleSignOut() {
    try {
      history.push("/");
      await signOutFirebase();
      toast.info("You have been signed out");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Menu.Item position="right">
        <Image
          avatar
          spaced="right"
          src={currentUserProfile.photoURL || "/assets/user.png"}
        />
        <Dropdown pointing="top left" text={currentUserProfile.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/createEvent"
              text="Create Event"
              icon="plus"
            />
            <Dropdown.Item
              as={Link}
              to={`/profile/${currentUserProfile.id}`}
              text="My profile"
              icon="user"
            />
            <Dropdown.Item
              text="My account"
              icon="settings"
              as={Link}
              to="/account"
            />
            <Dropdown.Item
              onClick={handleSignOut}
              text="Sign out"
              icon="power"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  );
}
