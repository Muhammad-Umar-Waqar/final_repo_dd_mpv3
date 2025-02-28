import React from 'react';
import { RichText } from 'prismic-reactjs';

const TextRich = ({ input }) => {
  return (
    <div className="w-full mt-5 [&>p]:text-base [&>p]:leading-relaxed [&>p]:mb-4 [&>a]:text-themeBrandColor [&>a]:no-underline hover:[&>a]:underline [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-6 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-5 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mb-4 [&>h4]:text-xl [&>h4]:font-bold [&>h4]:mb-3 [&>h5]:text-lg [&>h5]:font-bold [&>h5]:mb-2 [&>h6]:text-base [&>h6]:font-bold [&>h6]:mb-2">
      <RichText render={input.primary.rich_text} />
    </div>
  );
};

export default TextRich;