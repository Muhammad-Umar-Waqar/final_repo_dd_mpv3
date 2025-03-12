import Image from 'next/image';
import { Button } from '@mui/material';

import { useTranslations } from '../../utils/i18n';

const AmazonProduct = ({ input }) => {
    const { t } = useTranslations();

    return (
        <div className="text-center my-10">
            {input.primary.product_image?.url && (
                <div className="flex justify-center">
                    <Image.default
                        src={input.primary.product_image.url}
                        alt={input.primary.product_image.alt || t('article.slices.amazon_product.default_alt')}
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
                        className="!bg-[#d5d5d5] hover:!bg-[#d5d5d5]/80 !text-black"
                    >
                        {t('article.slices.amazon_product.buy_button')}
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default AmazonProduct;