import React, { useState } from 'react';

const ReadMore = ({ text='', maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText = text?.length>50? text.slice(0, maxLength):text;
  const displayText = !isTruncated ? truncatedText + '...' : text;

  return (
    <>
      <p>
        {displayText}
        {text.length > maxLength && <b onClick={toggleTruncate} className='ms-2'>{isTruncated ? ' More' : ' Less'}</b>}
      </p>
    </>
  );
};

export default ReadMore;
