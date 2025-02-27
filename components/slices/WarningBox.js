import { Alert, AlertTitle } from '@mui/material';

const WarningBox = ({ input }) => {
  return (
    <Alert 
      severity="warning"
      variant="outlined"
      sx={{ 
        my: 2,
        '& .MuiAlert-message': {
          width: '100%'
        }
      }}
    >
      {input.primary.title && (
        <AlertTitle>{input.primary.title}</AlertTitle>
      )}
      {input.primary.warning_content.text && (
        <div dangerouslySetInnerHTML={{ __html: input.primary.warning_content.text }} />
      )}
    </Alert>
  );
};

export default WarningBox;