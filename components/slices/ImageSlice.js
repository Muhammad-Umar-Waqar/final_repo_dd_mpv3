import Image from 'next/image';

const ImageSlice = ({ input }) => {
  if (!input?.primary?.image?.url) return null;

  const { image, image_alt_text, caption } = input.primary;

  return (
    <div className="flex flex-row justify-center my-5">
      <Image.default
        src={image.url}
        alt={image_alt_text || ''}
        width={image.dimensions?.width || 800}
        height={image.dimensions?.height || 600}
      />
    </div>
  );
};

export default ImageSlice;