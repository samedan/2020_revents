import React from "react";
import { Menu, Header } from "semantic-ui-react";
import Calendar from "react-calendar";

export default function EventFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%" }}>
        <Header icon="filter" attached color="teal" contents="Filters" />
        <Menu.Item contents="All events" />
        <Menu.Item contents="I'm Going" />
        <Menu.Item contents="I'm hosting" />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar />
    </>
  );
}
