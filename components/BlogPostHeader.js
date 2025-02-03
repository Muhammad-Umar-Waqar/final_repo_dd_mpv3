import React from 'react';
import { IconBookmark } from '@tabler/icons-react';
import ShareMenu from './ShareMenu';

const BlogPostHeader = ({ title, publisher, publishDate }) => {
  return (
    <header className="mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
        {title}
      </h1>
      <hr className="border-border mb-6" />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h4 className="font-medium text-foreground">{publisher}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <time>Published on {publishDate}</time>

            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-secondary/10 rounded-full">
            <IconBookmark className="w-6 h-6" />
          </button>
          <ShareMenu title={title} />
        </div>
      </div>
      <hr className="border-border" />
    </header>
  );
};

export default BlogPostHeader;