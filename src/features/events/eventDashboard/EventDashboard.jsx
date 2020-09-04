import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";

export default function EventDashboard() {
  // from store
  const { events } = useSelector((state) => state.eventsState);

  return (
    <Grid>
      <Grid.Column width="10">
        <h2>Left</h2>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>event Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
