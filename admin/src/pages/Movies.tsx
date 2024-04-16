import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

import { SEO } from "@/components/SEO";

const Movies = () => {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 150,
    });
  }, []);

  return (
    <>
      <SEO title="HDMovie-Movies" />
      Movies
    </>
  );
};

export default Movies;
