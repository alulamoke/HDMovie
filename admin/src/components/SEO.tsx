import { Helmet } from "react-helmet";

type TSEOProps = {
  title?: string;
  description?: string;
};

export const SEO = ({
  title = "HDMovie",
  description = "Watch the largest collection of Movies and TV shows anytime anywhere!",
}: TSEOProps) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};
