import { Alert } from '@mui/material';

const WarningBox = ({ input }) => {
  return (
    <Alert
      severity="error"
      variant="outlined"
      sx={{ my: 2 }}
    >
      {input.primary.warning?.map((warning, index) => (
        <div
          key={index}
          dangerouslySetInnerHTML={{ __html: warning.text }}
          className="w-100"
        />
      ))}
    </Alert>
  );
};

export default WarningBox;