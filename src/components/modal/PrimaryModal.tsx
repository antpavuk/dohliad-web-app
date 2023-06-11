import { FC } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

interface BrandModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '70%',
  bgcolor: 'background.paper',
  border: '2px solid yellow',
  boxShadow: 24,
  p: 4
};

const PrimaryModal: FC<BrandModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {title && (
          <Typography variant="h6" component="h2" sx={{ mb: 2, textDecoration: 'underline blue' }}>
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default PrimaryModal;
