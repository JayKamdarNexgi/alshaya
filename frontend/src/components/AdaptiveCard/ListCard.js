import React from 'react';
import { Card, CardBody } from 'reactstrap';

const ListCard = ({ cardData }) => {
  return (
    <>
      <h3 className="mb-2">{cardData.title}</h3>
      <Card className="mb-4 list-card">
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
