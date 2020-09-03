import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";

import { sampleData } from "../../../app/api/sampleData";

export default function EventDashboard() {
  const [events, setEvents] = useState(sampleData);

  // CREATE - POST
  // function handleCreateEvent(event) {
  //   setEvents([...events, event]);
  // }

  // // EDIT
  // function handleUpdateEvent(updatedEvent) {
  //   setEvents(
  //     // check to see if is an EditEvent or a CreateEvent
  //     events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
  //   );
  //   selectEvent(null);
  // }

  // DELETE
  function handleDeleteEvent(eventId) {
    setEvents(events.filter((evt) => evt.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <h2>Left</h2>
        <EventList
          events={events}
         
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>event Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
