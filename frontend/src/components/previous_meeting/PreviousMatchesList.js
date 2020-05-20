import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import PreviousMeetingCard from "./PreviousMeetingCard";

function PreviousMatchesList(props) {
  const [openedMeeting, setOpenedMeeting] = useState(null);

  const yyyymmdd = (date) => {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [
      date.getFullYear(),
      ".",
      (mm > 9 ? "" : "0") + mm,
      ".",
      (dd > 9 ? "" : "0") + dd,
    ].join("");
  };

  return (
    <div>
      {
        <PreviousMeetingCard
          show={openedMeeting}
          onHide={() => setOpenedMeeting(null)}
        />
      }
      {props.list.map((match, id) => {
        const dateStart = new Date(match.get("time_start"));
        const dateEnd = new Date(match.get("time_end"));
        const showEnd = yyyymmdd(dateStart).localeCompare(yyyymmdd(dateEnd));
        return (
          <Card key={id} className="text-center">
            <Card.Header></Card.Header>
            <Card.Body>
              <Card.Title>{match.get("first_name")}</Card.Title>
              <Card.Text></Card.Text>
              <Button variant="secondary" onClick={() => setOpenedMeeting(id)}>
                Meeting details
              </Button>
            </Card.Body>
            <Card.Footer className="text-muted">
              {yyyymmdd(dateStart) + (showEnd ? " - " + yyyymmdd(dateEnd) : "")}
            </Card.Footer>
          </Card>
        );
      })}
    </div>
  );
}

export default PreviousMatchesList;
