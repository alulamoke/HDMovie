import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

import { SEO } from "@/components/SEO";

const Settings = () => {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 150,
    });
  }, []);

  return (
    <>
      <SEO title="HDMovie-Settings" />
      Settings
    </>
  );
};

export default Settings;
