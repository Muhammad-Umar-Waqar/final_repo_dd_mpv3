import { Box } from '@mui/material';

const Text = ({ input }) => {
  if (!input?.primary?.text) return null;

  const content = input.primary.text
    .map(item => item.text)
    .join('');

  return (
    <div 
      className="w-100 mt-5 prose prose-lg prose-indigo"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Text;