import { Box, Button } from '@mui/material';
import Image from 'next/image';

const AmazonProduct = ({ input }) => {
    return (
        <div className="text-center my-10">
            {input.primary.product_image?.url && (
                <div className="flex justify-center">
                    <Image.default
                        src={input.primary.product_image.url}
                        alt={input.primary.product_image.alt || 'Producto Amazon'}
                        width={input.primary.product_image.dimensions.width}
                        height={input.primary.product_image.dimensions.height}
                        objectFit="contain"
                    />
                </div>
            )}

            <p className="font-bold mt-4">
                {input.primary.product_name?.[0]?.text}
            </p>

            <div className="flex flex-row justify-center my-5">
                <a 
                    href={input.primary.product_link?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button 
                        variant="contained" 
                        className="bg-yellow-300 hover:bg-themeBrandColor hover:text-white"
                    >
                        Comprar en Amazon
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default AmazonProduct;