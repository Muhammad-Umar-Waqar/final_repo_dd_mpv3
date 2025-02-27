import { Box, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const QuoteBox = ({ input }) => {
  return (
    <Box
      sx={{
        my: 4,
        px: 4,
        py: 3,
        borderLeft: 4,
        borderColor: 'primary.main',
        bgcolor: 'background.paper',
        borderRadius: 1,
        position: 'relative'
      }}
    >
      <FormatQuoteIcon 
        sx={{ 
          position: 'absolute',
          top: -12,
          left: -12,
          color: 'primary.main',
          fontSize: 40,
          transform: 'rotate(180deg)'
        }}
      />
      <Typography variant="body1" component="blockquote" sx={{ fontStyle: 'italic' }}>
        {input.primary.quote_content.text && (
          <div dangerouslySetInnerHTML={{ __html: input.primary.quote_content.text }} />
        )}
      </Typography>
      {input.primary.quote_author && (
        <Typography 
          variant="subtitle2" 
          sx={{ 
            mt: 2,
            textAlign: 'right',
            fontWeight: 'bold'
          }}
        >
          — {input.primary.quote_author}
        </Typography>
      )}
    </Box>
  );
};

export default QuoteBox;