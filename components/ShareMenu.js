import { useTranslations } from "../utils/i18n";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { IconShare2, IconLink, IconBrandX, IconBrandFacebook, IconBrandLinkedin } from "@tabler/icons-react";

const ShareMenu = ({ title, className = "" }) => {
  const { t } = useTranslations();

  // Share functionality
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
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    };

    if (platform === "copyLink") {
      shareLinks.copyLink();
    } else {
      window.open(shareLinks[platform], "_blank");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 hover:bg-secondary/10 rounded-full">
          <IconShare2 className="w-6 h-6" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50"
      >
        <div className="py-2">
          <div className="ml-4">
            <p className="font-bold">{t("article.share.title")}</p>
          </div>

          {/* Share options */}
          <button
            onClick={() => handleShare("copyLink")}
            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/10"
          >
            <IconLink className="w-4 h-4" />
            {t("article.share.copyLink")}
          </button>
          <button
            onClick={() => handleShare("x")}
            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/10"
          >
            <IconBrandX className="w-4 h-4" />
            {t("article.share.platforms.x")}
          </button>
          <button
            onClick={() => handleShare("facebook")}
            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/10"
          >
            <IconBrandFacebook className="w-4 h-4" />
            {t("article.share.platforms.facebook")}
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/10"
          >
            <IconBrandLinkedin className="w-4 h-4" />
            {t("article.share.platforms.linkedin")}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareMenu;