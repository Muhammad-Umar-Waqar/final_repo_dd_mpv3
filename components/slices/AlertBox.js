import { Alert } from '@mui/material';

const AlertBox = ({ input }) => {
    return (
        <Alert 
            variant="outlined" 
            severity="error"
            sx={{ 
                width: '100%',
                '& .MuiAlert-message': {
                    width: '100%'
                }
            }}
        >          
            {input.primary.alert_content.text && (
                <div 
                    dangerouslySetInnerHTML={{ __html: input.primary.alert_content.text }}
                />
            )}
        </Alert>
    )
}

export default AlertBox;