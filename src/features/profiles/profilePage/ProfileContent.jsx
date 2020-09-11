import React from "react";
import { Tab } from "semantic-ui-react";
import AboutTab from "./AboutTab";

export default function ProfileContent({ profile, isCurrentLoggedUser }) {
  const panes = [
    {
      menuItem: "About",
      render: () => (
        <AboutTab profile={profile} isCurrentLoggedUser={isCurrentLoggedUser} />
      ),
    },
    { menuItem: "Photos", render: () => <Tab.Pane>Photos</Tab.Pane> },
    { menuItem: "Events", render: () => <Tab.Pane>Events</Tab.Pane> },
    { menuItem: "Followers", render: () => <Tab.Pane>Followers</Tab.Pane> },
    { menuItem: "Following", render: () => <Tab.Pane>Following</Tab.Pane> },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
}
