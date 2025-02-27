import { Alert, AlertTitle } from '@mui/material';

const SuccessBox = ({ input }) => {
    return (
        <Alert 
            severity="success"
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
            {input.primary.success_content.text && (
                <div dangerouslySetInnerHTML={{ __html: input.primary.success_content.text }} />
            )}
        </Alert>
    )
}
export default SuccessBox;