import { Alert } from '@mui/material';
import { QuoteIcon } from 'lucide-react';

const QuoteBox = ({ input }) => {
  return (
    <Alert
      icon={<QuoteIcon fontSize="inherit" />}
      severity="info"
      className="italic"
    >
      {input.primary.quote?.[0]?.text && (
        <div
          dangerouslySetInnerHTML={{ __html: input.primary.quote[0].text }}
          className="w-100"
        />
      )}
    </Alert>
  );
};

export default QuoteBox;