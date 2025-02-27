import React from "react";
import { Paper, Box, Typography } from '@mui/material';

const PaperForm = ({ input }) => {
  return (
    <Paper 
      elevation={2}
      sx={{
        p: 4,
        my: 4,
        bgcolor: 'background.paper',
        borderRadius: 2
      }}
    >
      {input.primary.form_title && (
        <Typography 
          variant="h5" 
          component="h3" 
          sx={{ mb: 3, fontWeight: 'bold' }}
        >
          {input.primary.form_title}
        </Typography>
      )}
      
      <Box
        sx={{
          '& iframe': {
            width: '100%',
            border: 'none',
            minHeight: '500px'
          }
        }}
        dangerouslySetInnerHTML={{ __html: input.primary.form_embed.text }}
      />
    </Paper>
  );
};

export default PaperForm;