import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector, useDispatch } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import { listenToEvents } from "./../eventActions";

import { listenToEventsFromFirestore } from "./../../../app/firestore/firestoreService";
import useFirestoreCollection from "./../../../app/hooks/useFirestoreCollection";

export default function EventDashboard() {
  const dispatch = useDispatch();
  // from store
  const { events } = useSelector((state) => state.eventsState);
  const { loading } = useSelector((state) => state.async);

  // Custom HOOK
  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch],
  });

  return (
    <Grid>
      <Grid.Column width="10">
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}

        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width="6">
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}
