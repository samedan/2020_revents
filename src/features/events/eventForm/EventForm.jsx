/* global google */
import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import cuid from "cuid";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "./../../../app/hooks/useFirestoreDoc";
import { listenToEvents } from "./../eventActions";
import LoadingComponent from "./../../../app/layout/LoadingComponent";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();

  const selectedEvent = useSelector((state) =>
    state.eventsState.events.find((e) => e.id === match.params.id)
  );

  const { loading, error } = useSelector((state) => state.async);

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: {
      address: "",
      latLng: null,
    },
    venue: {
      address: "",
      latLng: null,
    },
    date: "",
  };

  // VALIDATION
  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a Title"),
    category: Yup.string().required("You must provide a Category"),
    description: Yup.string().required("You must provide a Description"),
    city: Yup.object().shape({
      address: Yup.string().required("You must provide a City"),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required("You must provide a Venue"),
    }),
    date: Yup.string().required("You must provide a date"),
  });

  // read event from firestore
  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!selectedEvent && !error)) {
    return <LoadingComponent content="Loading event..." />;
  }
  if (error) return <Redirect to="/error" />;

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
        {/* Data sent from Formik to the submit button to know if dirty or not */}
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event details" />
            <MyTextInput name="title" placeholder="Event Title" />
            <MySelectInput
              options={categoryData}
              name="category"
              placeholder="Category"
            />
            <MyTextArea name="description" placeholder="Description" rows="3" />
            <Header sub color="teal" content="Event Location details" />
            <MyPlaceInput name="city" placeholder="City" />
            <MyPlaceInput
              disabled={!values.city.latLng}
              name="venue"
              placeholder="Venue"
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000, // km
                types: ["establishment"],
              }}
            />
            <MyDateInput
              name="date"
              tilmeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
              placeholderText="Event Date"
              type="date"
            />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              // cursor={(!isValid || !dirty || isSubmitting) && "no-drop"}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              floated="right"
              content="Cancel"
              as={Link}
              to="/events"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
