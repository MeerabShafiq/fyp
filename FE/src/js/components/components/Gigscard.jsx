import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReadMore from '../../components/core/global/ReadMore';
import { fetchrequest } from '../../../function';

const Gigscard = ({buyer}) => {
  const [loading, setLoading]=useState(false)
  const [gigs, setGigs]=useState([])
  const userId = JSON?.parse(localStorage?.getItem('user-token'))?.userId;
  useEffect(() => {
    setLoading(true)
    fetchrequest({
      endpoint:buyer?`gigs/${userId}`:'gigs'
    }).then((res) => {
      setGigs(res.data.results||[]);
      setLoading(false)
    })
  }, [buyer])

  return (
    <Container>
      <Row>
        {loading?<div className='p-5'>loading...</div>:gigs.map((gig,i) => (
          <Col md={4} key={i} className='p-2'>
            <Card className='p-2'>
              <img src='https://dummyimage.com/600x600/000/fff' alt='' className='rounded-4' />
              <div className='d-flex my-3 justify-content-between'>
                <div> <Link to='/gig-detail'>{gig.title}</Link> </div>
                <div>RS. {gig.price}</div>
              </div>
              <ReadMore text={gig.description} maxLength={50} />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gigscard;
