import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import cuid from "cuid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();

  const selectedEvent = useSelector((state) =>
    state.eventsState.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required("You must provide a description"),
    city: Yup.string(),
    venue: Yup.string(),
    date: Yup.string(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // case of EditEvent
          selectedEvent
            ? dispatch(
                updateEvent(
                  // spread all the values (form uses less values)
                  {
                    ...selectedEvent,
                    // values changed in the form will overwrite the old ones
                    ...values,
                  }
                )
              )
            : // NEW EVENT
              dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Bob",
                  attendees: [],
                  hostPhotoURL: "./assets/user.png",
                })
              );
          history.push("/events");
        }}
      >
        <Form className="ui form">
          <Header sub color="teal" content="Event details" />
          <MyTextInput name="title" placeholder="Event Title" />
          <MyTextInput name="category" placeholder="Category" />
          <MyTextInput name="description" placeholder="Description" />
          <Header sub color="teal" content="Event Location details" />
          <MyTextInput name="city" placeholder="City" />
          <MyTextInput name="venue" placeholder="Venue" />
          <MyTextInput name="date" placeholder="Date" type="date" />

          <Button type="submit" floated="right" positive content="Submit" />
          <Button
            type="submit"
            floated="right"
            content="Cancel"
            as={Link}
            to="/events"
          />
        </Form>
      </Formik>
    </Segment>
  );
}
