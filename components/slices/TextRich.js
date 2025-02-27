import { Box } from '@mui/material';
import { RichText } from 'prismic-reactjs';
// import { linkResolver } from '../../utils/linkResolver';

const TextRich = ({ input }) => (
  <Box 
    component="div"
    sx={{
      width: '100%',
      mt: 5,
      '& a': {
        color: 'primary.main',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    }}
  >
    <RichText
      render={input.primary.rich_text.richText}
    //   linkResolver={linkResolver}
    />
  </Box>
);

export default TextRich;