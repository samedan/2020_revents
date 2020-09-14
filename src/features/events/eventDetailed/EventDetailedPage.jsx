import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { useSelector, useDispatch } from "react-redux";
import useFirestoreDoc from "./../../../app/hooks/useFirestoreDoc";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToEvents } from "./../eventActions";
import LoadingComponent from "./../../../app/layout/LoadingComponent";
import { Redirect } from "react-router-dom";

export default function EventDetailedPage({ match }) {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const event = useSelector((state) =>
    state.eventsState.events.find((e) => e.id === match.params.id)
  );
  const { loading, error } = useSelector((state) => state.async);
  // is HOST true or false
  const isHost = event?.hostUid === currentUser?.uid;
  // is currentUser in the attendees list
  const isGoing = event?.attendees?.some((a) => a.id === currentUser?.uid);

  // GET event from firestore
  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error)) {
    return <LoadingComponent content="Loading event..." />;
  }
  if (error) return <Redirect to="/error" />;

  return (
    <Grid
      // columns become rows
      stackable
      // change order in height on mobile
      reversed="computer"
    >
      <Grid.Column width={6}>
        <EventDetailedSidebar
          hostUid={event.hostUid}
          attendees={event?.attendees}
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat event={event} eventId={event.id} />
      </Grid.Column>
    </Grid>
  );
}
