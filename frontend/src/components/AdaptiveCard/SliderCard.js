import React from 'react';
import { connect } from 'react-redux';
import Slider from '../Slider/index';
import { Card, CardBody } from 'reactstrap';

const SliderCard = ({ cardData }) => {
  return (
    <>
      <h3 className="mb-2">{cardData.title}</h3>
      <Card className="mb-4 sliderCard">
        <CardBody className="p-0">
          <Slider items={cardData} />
        </CardBody>
      </Card>
    </>
  );
};

const mapStateToProps = ({ dashboard }) => {
  const { adaptiveCards } = dashboard;
  return { adaptiveCards };
};

export default connect(mapStateToProps, null)(SliderCard);
