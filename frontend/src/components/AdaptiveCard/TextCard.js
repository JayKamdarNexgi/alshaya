import React from "react";
import { Card, CardBody } from "reactstrap";

const TextCard = ({ cardData }) => {
  return (
    <>
      <h3 className="mb-2">{cardData.title}</h3>
      <Card className="mb-4 text-card">
        <CardBody>
          {cardData.textList?.map((list) => (
            <p key={list}>{list}</p>
          ))}

          {cardData.htmlList?.map((list) => (
            <p key={list} dangerouslySetInnerHTML={{ __html: list }}></p>
          ))}
        </CardBody>
      </Card>
    </>
  );
};

export default TextCard;
