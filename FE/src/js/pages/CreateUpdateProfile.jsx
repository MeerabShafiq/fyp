import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from '../../scss/pages/createUpdateProfile.module.scss';

import { fetchrequest } from '../../function';
import clsx from 'clsx';


const CreateUpdateProfile = () => {
  let hasErrors = false;
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


  //error handles
  const [errors, setErrors] = useState({
    instituteName: '',
    degreeName: '',
    dateFromEd: '',
    dateToEd: '',
    industryName: '',
    dateFromInd:'',
    dateToInd:'',
    institueFile:'',
    description:'',

  });






  const handleSubmitChange = async (event) => {
    event.preventDefault()
//check user input
//name
if(!profile.education.instituteName){
  setErrors((p)=>({...p, instituteName:"empty"}));
  hasErrors = true;
}else {
  setErrors((p) => ({ ...p, instituteName: '' }));
}


//degree
if(!profile.education.degreeName){
  setErrors((p)=>({...p, degreeName:"empty"}));
  hasErrors = true;
}else {
  setErrors((p) => ({ ...p, degreeName: '' }));
}


//start date
if(!profile.education.dateFromEd){
  setErrors((p)=>({...p, dateFromEd:"empty"}));
  hasErrors = true;
}else {
  setErrors((p) => ({ ...p, dateFromEd: '' }));
}


//end date
if(!profile.education.dateToEd){
  setErrors((p)=>({...p, dateToEd:"empty"}));
  hasErrors = true;
}else {
  setErrors((p) => ({ ...p, dateToEd: '' }));
}

//industry name
if(!profile.industry.industryName){
  setErrors((p)=>({...p, industryName:"empty"}));
  hasErrors = true;
}else {
  setErrors((p) => ({ ...p, industryName: '' }));
}


//start date
if(!profile.industry.dateFromInd){
  setErrors((p)=>({...p, dateFromInd:"empty"}));
  hasErrors = true;
}else {
  setErrors((p) => ({ ...p, dateFromInd: '' }));
}


//end date
if(!profile.industry.dateToInd){
  setErrors((p)=>({...p, dateToInd:"empty"}));
  hasErrors = true;
}else {
  setErrors((p) => ({ ...p, dateToInd: '' }));
}

//description
if(!profile.description){
  setErrors((p)=>({...p, description:"empty"}));
  hasErrors = true;
}else {
  setErrors((p) => ({ ...p, description: '' }));
}


//errors
if (hasErrors) {
  console.log('Form not submitted');
} else{

    //submt data
    const data = {
      userId,
      instituteName: profile.education.instituteName,
      degreeName: profile.education.degreeName,
      dateFromEd: profile.education.dateFromEd,
      dateToEd: profile.education.dateToEd,
      industryName: profile.industry.industryName,
      dateFromInd: profile.industry.dateFromInd,
      dateToInd: profile.industry.dateToInd,
      description: profile.description

     
    };
  await fetchrequest ({endpoint:'edit-profile' , method: 'post', data:{...data}}).then((res)=>{
    if(res.data.success){
      res.status = 200
      navigate('/home')
    }
  })
    


    console.log(data)
  };
}
useEffect(() => {
  hasErrors = !!(errors.instituteName || errors.degreeName || errors.dateFromEd || errors.dateToEd || errors.industryName || errors.dateFromInd || errors.dateToInd ||errors.description);
}, [errors]);
  return (
    <Container >
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
                <option value='1'>Open this select menu</option>
                <option value='UET'>UET</option>
                <option value='NUST'>NUST</option>
                <option value='UMT'>UMT</option>
                
              </Form.Select>
              {errors.instituteName && <span className='text-danger'>{errors.instituteName}</span>}
            </Form.Group>
           
            <Row>
              <Col>
                <Form.Group className={styles.degreename}>
                  <Form.Label>Name of Degree</Form.Label>
                  <Form.Control placeholder='Dgree Name' name='degreeName' value={profile.degreeName} onChange={handleInstituteChange} />
                  {errors.degreeName && <span className='text-danger'>{errors.degreeName}</span>}
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
                  {errors.dateFromEd && <span className='text-danger' style={{paddingLeft:"10px"}}>{errors.dateFromEd}</span>}
                  {errors.dateToEd && <span className='text-danger' style={{paddingLeft:"130px"}}>{errors.dateToEd}</span>}
                </Form.Group>
              </Col>
            </Row>
            <h2>Industurial Information</h2>
            <Form.Group className='mb-3'>
              <Form.Label>Name of Industury</Form.Label>
              <Form.Control placeholder='Industry name' name='industryName' value={profile.industryName} onChange={handleIdustryChange} />
              
              {errors.industryName && <span className='text-danger'>{errors.industryName}</span>}

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
            {errors.dateFromInd && <span className='text-danger' style={{paddingLeft:"10px"}}>{errors.dateFromInd}</span>}
            {errors.dateToInd && <span className='text-danger' style={{paddingLeft:"330px"}}>{errors.dateToInd}</span>}


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
            {errors.description && <span className='text-danger' style={{paddingTop:"-2px"}}>{errors.description}</span>}
            <div style={{paddingTop:"10px"}}>
            <Button onClick={handleSubmitChange}>Save</Button>
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default CreateUpdateProfile;








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