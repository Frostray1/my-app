import React from "react";
import { Helmet } from "react-helmet-async";

type HeadCodeInjectorProps = {
  code: string;
};

const HeadCodeInjector: React.FC<HeadCodeInjectorProps> = ({ code }) => {
  return (
    <Helmet>
      <script type="text/javascript">{code}</script>
    </Helmet>
  );
};

export default HeadCodeInjector;
