import React from "react";
import {
  Segment,
  Header,
  Container,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";

export default function HomePage({ history }) {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container className="home-page-div">
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="./assets/logo.png"
            style={{ marginBottom: 12 }}
          />
          ReVents
        </Header>
        <Button onClick={() => history.push("/events")} size="huge" inverted>
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Container>
    </Segment>
  );
}
