import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

import { SEO } from "@/components/SEO";

const Dashboard = () => {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 150,
    });
  }, []);

  return (
    <>
      <SEO />
      Dashboard
    </>
  );
};

export default Dashboard;
