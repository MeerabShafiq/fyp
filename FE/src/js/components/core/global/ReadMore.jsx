import React, { useState } from 'react';

const ReadMore = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText = text.slice(0, maxLength);
  const displayText = isTruncated ? truncatedText + '...' : text;

  return (
    <>
      <p>
        {displayText}
        {text.length > maxLength && <span onClick={toggleTruncate}>{isTruncated ? 'Read More' : 'Read Less'}</span>}
      </p>
    </>
  );
};

export default ReadMore;
