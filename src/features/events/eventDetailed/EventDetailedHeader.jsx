import React from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function EventDetailedHeader({ event }) {
  return (
    <>
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid />

          <Segment basic>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={event.title}
                    style={{ color: "white" }}
                  />
                  <p>{event.date.toString()}</p>
                  <p>
                    Hosted by <strong>{event.hosteBy}</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached="bottom">
          <Button>Cancel My Place</Button>
          <Button color="teal">JOIN THIS EVENT</Button>

          <Button
            as={Link}
            to={`/manage/${event.id}`}
            color="orange"
            floated="right"
          >
            Manage Event
          </Button>
        </Segment>
      </Segment.Group>
    </>
  );
}
