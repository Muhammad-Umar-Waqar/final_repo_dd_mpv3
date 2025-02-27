import { Alert, AlertTitle } from '@mui/material';

const InfoBox = ({ input }) => {
    return (
        <Alert 
            severity="info"
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
            {input.primary.info_content.text && (
                <div dangerouslySetInnerHTML={{ __html: input.primary.info_content.text }} />
            )}
        </Alert>
    )
}
export default InfoBox;