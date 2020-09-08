import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector, useDispatch } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import { listenToEvents } from "./../eventActions";

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../../app/async/asyncReducer";

import {
  getEventsFromFirestore,
  dataFromSnapshot,
} from "./../../../app/firestore/firestoreService";

export default function EventDashboard() {
  const dispatch = useDispatch();
  // from store
  const { events } = useSelector((state) => state.eventsState);
  const { loading } = useSelector((state) => state.async);

  // load& unload
  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = getEventsFromFirestore({
      next: (snapshot) => {
        dispatch(
          listenToEvents(
            snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
          )
        );
        dispatch(asyncActionFinish());
      },
      error: (error) => dispatch(asyncActionError(error)),
      complete: () => console.log("never see this message"),
    });
    // componentWillUnload
    return unsubscribe;
  }, [dispatch]);

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
