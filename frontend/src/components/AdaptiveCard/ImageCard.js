import React from "react";
import { Card, CardBody } from "reactstrap";

const ListCard = ({ cardData }) => {
  return (
    <>
      <h3>{cardData.title}</h3>
      <Card className="image-card">
        <CardBody>
          <ol>
            {cardData.list?.map((list) => (
              <li key={list}>{list}</li>
            ))}
          </ol>
        </CardBody>
      </Card>
    </>
  );
};

export default ListCard;
