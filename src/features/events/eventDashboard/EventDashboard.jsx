import React, { useEffect, useState } from "react";
import { Button, Grid, Loader } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector, useDispatch } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import { clearEvents, fetchEvents } from "./../eventActions";
import EventsFeed from "./EventsFeed";

export default function EventDashboard() {
  // pagination
  const limit = 2;
  const dispatch = useDispatch();
  // from store
  const { events, moreEvents } = useSelector((state) => state.eventsState);
  const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);

  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  function handleSetPredicate(key, value) {
    dispatch(clearEvents());
    setLastDocSnapshot(null);
    // 'new' is for rerender
    setPredicate(new Map(predicate.set(key, value)));
  }

  useEffect(() => {
    setLoadingInitial(true);
    dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
      setLastDocSnapshot(lastVisible);
      setLoadingInitial(false);
    });
    // unmount, reset events
    return () => {
      dispatch(clearEvents());
    };
  }, [dispatch, predicate]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(
      (lastVisible) => {
        setLastDocSnapshot(lastVisible);
      }
    );
  }

  // Custom HOOK
  // useFirestoreCollection({
  //   query: () => listenToEventsFromFirestore(predicate),
  //   data: (events) => dispatch(listenToEvents(events)),
  //   deps: [dispatch, predicate],
  // });

  return (
    <Grid
      // columns become rows
      stackable
      // change order in height on mobile
      reversed="computer"
    >
      <Grid.Column width="6">
        {authenticated && <EventsFeed />}
        <EventFilters
          predicate={predicate}
          loading={loading}
          setPredicate={handleSetPredicate}
        />
      </Grid.Column>
      <Grid.Column width="10">
        {loadingInitial && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}

        <EventList
          events={events}
          getNextEvents={handleFetchNextEvents}
          loading={loading}
          moreEvents={moreEvents}
        />
        <Button
          loading={loading}
          disabled={!moreEvents}
          onClick={handleFetchNextEvents}
          color="green"
          content="More..."
          floated="right"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}
