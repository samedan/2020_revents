import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

function Marker() {
  return <Icon name="marker" size="big" color="red" />;
}

export default function EventDetailedMap({ latLng }) {
  const zoom = 14;

  return (
    <Segment
      // attached to the 'Segment' above
      attached="bottom"
      style={{ padding: 0 }}
    >
      <div style={{ height: 300, width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBS_HC1pbmryLh_LjC_qxcGBenjF2IMW7g" }}
          center={latLng}
          zoom={zoom}
        >
          <Marker lat={latLng.lat} lng={latLng.lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
}