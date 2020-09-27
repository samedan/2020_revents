import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feed, Header, Segment } from "semantic-ui-react";
import {
  firebaseObjectToArray,
  getUserFeedRef,
} from "../../../app/firestore/firebaseService";
import { listenToFeed } from "../../profiles/profileActions";
import EventFeedItem from "./EventFeedItem";

export default function EventsFeed() {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state.profile);

  useEffect(() => {
    getUserFeedRef().on("value", (snapshot) => {
      if (!snapshot.exists()) {
        return;
      }
      const feed = firebaseObjectToArray(snapshot.val()).reverse(); // get the most recent events first
      dispatch(listenToFeed(feed));
    });
    return () => {
      // unsubscribe
      getUserFeedRef().off();
    };
  }, [dispatch]);

  //   const image = "/assets/user.png";
  //   const date = "3days ago";
  //   const summary = "Diana joined the event X";

  return (
    <>
      <Header
        attached
        color="teal"
        inverted
        icon="newspaper"
        content="News feed"
      />
      <Segment attached="bottom">
        <Feed>
          {feed.map((post) => (
            <EventFeedItem key={post.id} post={post} />
          ))}
          {/* <Feed.Event image={image} date={date} summary={summary} />
          <Feed.Event image={image} date={date} summary={summary} />
          <Feed.Event image={image} date={date} summary={summary} />
          <Feed.Event image={image} date={date} summary={summary} /> */}
        </Feed>
      </Segment>
    </>
  );
}
