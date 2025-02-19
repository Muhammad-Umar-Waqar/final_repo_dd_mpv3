import React, { useState, useRef, useEffect } from 'react';
import { IconShare2, IconLink, IconBrandX, IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';

const ShareMenu = ({ title, className = "" }) => {
  const { t } = useTranslations();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const shareMenuRef = useRef(null);
  const shareButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareMenuRef.current && 
        !shareMenuRef.current.contains(event.target) &&
        !shareButtonRef.current.contains(event.target)
      ) {
        setIsShareMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = (platform) => {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(title);
    
    const shareLinks = {
      copyLink: () => {
        navigator.clipboard.writeText(window.location.href);
        // You might want to add a toast notification here
      },
      x: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
    };

    if (platform === 'copyLink') {
      shareLinks.copyLink();
    } else {
      window.open(shareLinks[platform], '_blank');
    }
    
    setIsShareMenuOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button 
        ref={shareButtonRef}
        className="p-2 hover:bg-secondary/10 rounded-full"
        onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
      >
        <IconShare2 className="w-6 h-6" />
      </button>
      
      {isShareMenuOpen && (
        <div 
          ref={shareMenuRef}
          className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50"
          style={{
            position: 'absolute',
            right: '0',
            top: '100%',
            transform: 'translateY(8px)'
          }}
        >
          <div className="py-2">
            <div className="ml-4"><p className="font-bold">{t('article.share.title')}</p></div>
            
            <button
              onClick={() => handleShare('copyLink')}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/10"
            >
              <IconLink className="w-4 h-4" />
              {t('article.share.copyLink')}
            </button>
            <button
              onClick={() => handleShare('x')}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/10"
            >
              <IconBrandX className="w-4 h-4" />
              {t('article.share.platforms.x')}
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/10"
            >
              <IconBrandFacebook className="w-4 h-4" />
              {t('article.share.platforms.facebook')}
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/10"
            >
              <IconBrandLinkedin className="w-4 h-4" />
              {t('article.share.platforms.linkedin')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;