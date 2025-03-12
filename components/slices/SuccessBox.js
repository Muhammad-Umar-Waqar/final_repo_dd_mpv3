import { Alert } from '@mui/material';

const SuccessBox = ({ input }) => {
    return (
        <Alert 
            severity="success"
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
    )
}
export default SuccessBox;