import React from 'react';
import { Card, Container } from 'react-bootstrap';

const GigDetail = () => {
  const text = ` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
    into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
    software like Aldus PageMaker including versions of Lorem Ipsum.`;
  return (
    <Container>
      <h2>Gig details</h2>
      <Card>
        <h3>Gig Information:</h3>
        <div>
          <h3>Title of the gig here</h3>
          <div>{text}</div>
          <div>
            <div>hours</div>
            <div>rp 2000</div>
          </div>
          <img src='https://dummyimage.com/300x300/000/fff' alt='' />
        </div>
      </Card>
    </Container>
  );
};

export default GigDetail;
