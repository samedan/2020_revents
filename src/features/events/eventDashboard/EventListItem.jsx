import React from "react";
import {
  Segment,
  Item,
  Icon,
  List,
  Button,
  Label,
  Grid,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";

import { format } from "date-fns";
import { deleteEventInFirestore } from "../../../app/firestore/firestoreService";
import { useSelector } from "react-redux";

export default function EventListItem({ event }) {
  // console.log(event.hostUid);

  const { currentUser, authenticated } = useSelector((state) => state.auth);
  // console.log(currentUser.uid);

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item className="event-list-item">
            <Grid>
              <Grid.Column width={5}>
                <Item.Image
                  style={{ margin: 0 }}
                  size="tiny"
                  circular
                  src={event.hostPhotoURL || "/assets/user.png"}
                  title={event.hostedBy}
                />
              </Grid.Column>
              <Grid.Column width={11}>
                <Item.Content style={{ margin: 0 }}>
                  <Item.Header
                    content={event.title}
                    className="event-list-item-title"
                  />
                  <Item.Description>
                    Hosted by{" "}
                    <i>
                      <Link to={`/profile/${event.hostUid}`}>
                        {event.hostedBy}
                      </Link>
                    </i>
                  </Item.Description>
                  {event.isCancelled && (
                    <Label
                      style={{ top: "-40px" }}
                      ribbon="right"
                      color="red"
                      content="This event has been cancelled"
                    />
                  )}
                </Item.Content>
              </Grid.Column>
            </Grid>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          {/* <Icon name="clock" /> {event.date} */}
          <div className="event-list-item-date">
            <Icon name="clock" /> {format(event.date, "MMMM d, yyyy h:mm a")}
          </div>
          <div className="event-list-item-date">
            <Icon name="marker" /> {event.venue.address}
          </div>
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div className="event-list-item-description">{event.description}</div>
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color="teal"
          floated="right"
          content="View"
        />
        {authenticated && currentUser && event.hostUid === currentUser.uid && (
          <Button
            onClick={() => deleteEventInFirestore(event.id)}
            color="red"
            floated="right"
            content="Delete"
          />
        )}
      </Segment>
    </Segment.Group>
  );
}
