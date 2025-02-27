import { Box } from '@mui/material';

const VideoBlock = ({ input }) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        m: 1
      }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          paddingTop: '56.25%', // 16:9 Aspect Ratio
          '& > iframe': {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%'
          }
        }}
        dangerouslySetInnerHTML={{ __html: input.primary.video.text }}
      />
    </Box>
  );
};

export default VideoBlock;