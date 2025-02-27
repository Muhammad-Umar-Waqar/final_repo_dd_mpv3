import { Box, Paper, Typography, Button } from '@mui/material';
import NextImage from 'next/image';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AmazonProduct = ({ input }) => {
    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                my: 4,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 3
            }}
        >
            {input.primary.product_image?.url && (
                <Box sx={{ width: { xs: '100%', sm: '200px' } }}>
                    <NextImage
                        src={input.primary.product_image.url}
                        alt={input.primary.product_title || 'Amazon Product'}
                        width={200}
                        height={200}
                        objectFit="contain"
                    />
                </Box>
            )}

            <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {input.primary.product_title}
                </Typography>

                {input.primary.product_description?.text && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <div dangerouslySetInnerHTML={{ __html: input.primary.product_description.text }} />
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    href={input.primary.amazon_link?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<ShoppingCartIcon />}
                    sx={{ mt: 2 }}
                >
                    Amazon
                </Button>
            </Box>
        </Paper>
    );
};

export default AmazonProduct;