import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PrimaryModal from './modal/PrimaryModal';

interface ReadMoreProps {
  text: string;
  maxLength: number;
  openModalOnFullText?: boolean;
}

const ReadMore: FC<ReadMoreProps> = ({ text, maxLength = 100, openModalOnFullText }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const truncatedText = isTruncated ? text.slice(0, maxLength) : text;

  return (
    <Box>
      <Typography variant="body1">
        {truncatedText}
        {isTruncated && '...'}
        {'   '}
        {text.length > maxLength && (
          <span
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 'lighter',
              fontStyle: 'italic',
              fontSize: '0.8rem'
            }}
            onClick={openModalOnFullText ? handleModalOpen : toggleTruncate}
          >
            {isTruncated ? 'Read More' : 'Read Less'}
          </span>
        )}
      </Typography>
      {openModalOnFullText && (
        <PrimaryModal open={isModalOpen} onClose={handleModalClose}>
          {text}
        </PrimaryModal>
      )}
    </Box>
  );
};

export default ReadMore;
