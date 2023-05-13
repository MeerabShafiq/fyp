import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReadMore from '../../components/core/global/ReadMore';
import { fetchrequest } from '../../../function';
import gigImage from '../../../assets/best-fiverr-gigs.png'

const Gigscard = ({buyer}) => {
  const [loading, setLoading]=useState(false)
  const [gigs, setGigs]=useState([])
  const userId = JSON?.parse(localStorage?.getItem('user-token'))?.userId;
  useEffect(() => {
    setLoading(true)
    fetchrequest({
      endpoint:buyer?'gigs':`gigs/${userId}`
    }).then((res) => {
      setGigs(res.data.results||[]);
      setLoading(false)
    })
  }, [buyer])

  return (
    <Container>
      <Row>
        {loading?<div className='p-5'>loading...</div>: gigs?.length?gigs.map((gig,i) => (
          <Col md={4} key={i} className='p-2'>
            <Card className='p-2'>
              <img width={200} height={250} src={gig.imageUrl||gigImage} alt='' className='rounded-4' />
              <div className='d-flex my-3 justify-content-between'>
                <div> <Link to='/gig-detail' state={gig}>{gig.title}</Link> </div>
                <div>RS. {gig.price}</div>
              </div>
              <ReadMore text={gig.description} maxLength={50} />
            </Card>
          </Col>
        )): <div>
          <h1 className='text-center'>No gig found</h1>
          </div>}
      </Row>
    </Container>
  );
};

export default Gigscard;
