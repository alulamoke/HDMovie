import { useState } from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  PinterestShareButton,
  PinterestIcon,
} from 'react-share';
import { FaShare } from 'react-icons/fa';

import Button from '../../Button';
import { cn } from '../../../lib';

const ShareButton = ({ title }) => {
  const [open, setOpen] = useState(false);

  const shareMediaList = [
    {
      provider: FacebookShareButton,
      icon: FacebookIcon,
      title: 'Facebook',
    },
    {
      provider: WhatsappShareButton,
      icon: WhatsappIcon,
      title: 'Whatsapp',
    },
    {
      provider: TwitterShareButton,
      icon: TwitterIcon,
      title: 'Twitter',
    },
    {
      provider: TelegramShareButton,
      icon: TelegramIcon,
      title: 'Telegram',
    },
    {
      provider: PinterestShareButton,
      icon: PinterestIcon,
      title: 'Pinterest',
    },
  ];
  return (
    <div className="relative">
      <Button
        title="Share"
        Icon={FaShare}
        left
        solid
        onClick={() => setOpen((prev) => !prev)}
      />
      <div
        className={cn(
          'absolute py-12 w-max px-8 flex-col gap-12 rounded-md shadow-2xl z-10 bg-white transition-all duration-500 ease-in-out',
          open ? 'flex' : 'hidden'
        )}
      >
        {shareMediaList.map((shareMedia, i) => (
          <shareMedia.provider
            key={i}
            url={window.location.href}
            className="flex items-center gap-4"
          >
            <shareMedia.icon size={30} round />
            <p className="text-[1.4rem] font-semibold hover:underline">
              Share to {shareMedia.title}
            </p>
          </shareMedia.provider>
        ))}
      </div>
    </div>
  );
};

export default ShareButton;
