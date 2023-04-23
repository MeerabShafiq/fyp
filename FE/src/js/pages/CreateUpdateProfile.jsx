import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from '../../scss/pages/createUpdateProfile.module.scss';
import clsx from 'clsx';
const CreateUpdateProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const colaborationRef = useRef(null);
  const name = JSON?.parse(localStorage?.getItem('user-token'))?.name;
  const userId = JSON?.parse(localStorage?.getItem('user-token'))?.userId;
  const email = JSON?.parse(localStorage?.getItem('user-token'))?.email;
  const [profile, setProfile] = useState({
    education: { instituteName: '', degreeName: '', dateFromEd: '', dateToEd: '' },
    industry: { industryName: '', dateFromInd: '', dateToInd: '', institueFile: '' },
    description: '',
  });
  //Set Ref on click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleCertificateClick = () => {
    colaborationRef.current.click();
  };
  //upload file
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setProfile({ ...profile, industry: { ...profile.industry, institueFile: event.target.files[0] } });
    console.log('Selected file:', selectedFile);
  };
  const handleFileColabration = (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
  };
  //upload file
  const handleInstituteChange = (event) => {
    setProfile({ ...profile, education: { ...profile.education, [event.target.name]: event.target.value } });
  };
  const handleIdustryChange = (event) => {
    setProfile({ ...profile, industry: { ...profile.industry, [event.target.name]: event.target.value } });
  };
  const handleSubmitChange = (event) => {
    event.preventDefault()
    const data = {
      instituteName: profile.education.instituteName,
      degreeName: profile.education.degreeName,
      dateFromEd: profile.education.dateFromEd,
      dateToEd: profile.education.dateToEd,
      industryName: profile.industry.industryName,
      dateFromInd: profile.industry.dateFromInd,
      dateToInd: profile.industry.dateToInd,
      description: profile.description

     
    };
  
    

    // navigate('/home')
    // console.log(profile.education.dateFrom,profile.education.dateTo)

    // console.log(profile.industry.dateFrom,profile.industry.dateTo);
    console.log(data)
  };
  return (
    <Container>
      <h2 className={styles.header}>Edit Profile: </h2>
      <Form>
        <div className={styles.container}>
          <div className='d-flex mt-5 mb-5'>
            <Form.Group className='mb-3 '>
              <Form.Control
                type='file'
                id='upload-image'
                label='Upload an image'
                onChange={handleFileChange}
                className='d-none'
              />
              <div htmlFor='upload-image' onClick={handleButtonClick}>
                <img src='https://dummyimage.com/80x80/000/fff' alt='' className='rounded-circle' />
              </div>
            </Form.Group>
            <div className='ms-4'>
              <h3 className={styles.username}> {name}</h3>
              <div className={styles.usermail}>{email}</div>
            </div>
          </div>
          <div>
            <h2>Educational Informaton: </h2>

            <Form.Group className='mb-3'>
              <Form.Label>Name of Instritute</Form.Label>
              <Form.Select aria-label='Default select example' name='instituteName' value={profile.instituteName} onChange={handleInstituteChange}>
                <option>Open this select menu</option>
                <option value='UET'>UET</option>
                <option value='NUST'>NUST</option>
                <option value='UMT'>UMT</option>
              </Form.Select>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className={styles.degreename}>
                  <Form.Label>Name of Degree</Form.Label>
                  <Form.Control placeholder='Dgree Name' name='degreeName' value={profile.degreeName} onChange={handleInstituteChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className={clsx(styles.degreeduration, 'mb-3 ps-5')}>
                  <Form.Label>Duration</Form.Label>
                  <div className='mb-3 d-flex'>
                    <Form.Control
                      type='date'
                      placeholder='From'
                      name='dateFromEd'
                      value={profile.education.dateFromEd}
                      className='me-3'
                      onChange={handleInstituteChange}
                    />
                 
                    <Form.Control type='date' placeholder='to' name='dateToEd' value={profile.education.dateToEd} onChange={handleInstituteChange} />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <h2>Industurial Information</h2>
            <Form.Group className='mb-3'>
              <Form.Label>Name of Industury</Form.Label>
              <Form.Control placeholder='Industry name' name='industryName' value={profile.industryName} onChange={handleIdustryChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Duration</Form.Label>
              <div className='mb-3 d-flex'>
                <Form.Control
                  type='date'
                  placeholder='From'
                  name='dateFromInd'
                  className='me-3'
                  value={profile.industry.dateFromInd}
                  onChange={handleIdustryChange}
                />
                <Form.Control type='date' placeholder='to' name='dateToInd' value={profile.industry.dateToInd} onChange={handleIdustryChange} />
              </div>
            </Form.Group>
            {/* <Form.Group className='d-block mb-4'>
              <Form.Label>Certification</Form.Label>
              <Form.Control
                className='d-none'
                id='colaboration-id'
                name='institueFile'
                ref={colaborationRef}
                type='file'
                accept=".pdf,.doc,.png,.jpeg"
                onChange={handleFileColabration}
              />
              <div className={styles.certification}>
                <Button className={styles.bordered_button} htmlFor='colaboration-id' onClick={handleCertificateClick}>
                  +
                </Button>
              </div>
            </Form.Group> */}
            <Form.Group className='mb-3 d-flex'>
              <Form.Control
                as='textarea'
                placeholder='description'
                style={{ height: '100px' }}
                name='description'
                value={profile.description}
                onChange={({ target }) => setProfile({ ...profile, description: target.value })}
              />
            </Form.Group>
            <Button onClick={handleSubmitChange}>Save</Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default CreateUpdateProfile;
