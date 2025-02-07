import React from 'react';
import { IconBookmark, IconUser } from '@tabler/icons-react';
import ShareMenu from './ShareMenu';

const BlogPostHeader = ({ title, publisher, publishDate, type, author, authorImage }) => {
  console.log('BlogPostHeader rendered with:', { type, author, authorImage });
  return (
    <header className="mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
        {title}
      </h1>
      <hr className="border-border mb-6" />
      <div className="flex items-center justify-between mb-6">
        {type === 'article' ? (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              {authorImage ? (
                <img 
                  src={authorImage} 
                  alt={author} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Author image failed to load:', authorImage);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-full h-full bg-secondary/20 flex items-center justify-center ${authorImage ? 'hidden' : ''}`}
              >
                <IconUser className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground">{author || publisher}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time>Published on {publishDate}</time>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div>
              <h4 className="font-medium text-foreground">{publisher}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time>Published on {publishDate}</time>
              </div>
            </div>
          </div>
        )}
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
