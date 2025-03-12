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
            {input.primary.heading?.map((heading, index) => (
                <AlertTitle key={index} className="underline">
                    {heading.text}
                </AlertTitle>
            ))}
            {input.primary.warning?.map((warning, index) => (
                <div 
                    key={index}
                    dangerouslySetInnerHTML={{ __html: warning.text }}
                    className="w-100"
                />
            ))}
        </Alert>
    )
}
export default InfoBox;