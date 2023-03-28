import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReadMore from '../../components/core/global/ReadMore';

const Gigscard = () => {
  const data = ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'];
  const text = ` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
  into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
  software like Aldus PageMaker including versions of Lorem Ipsum.`;
  return (
    <Container>
      <Row>
        {data.map((p,i) => (
          <Col md={4} key={i} className='p-2'>
            <Card className='p-2'>
              <img src='https://dummyimage.com/600x600/000/fff' alt='' className='rounded-4' />
              <div className='d-flex my-3 justify-content-between'>
                <div> <Link to='/gig-detail'>Gig name here</Link> </div>
                <div>RS. 1000</div>
              </div>
              <ReadMore text={text} maxLength={50} />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gigscard;
