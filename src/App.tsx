import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routing";
import { HelmetProvider } from "react-helmet-async";
import HeadCodeInjector from "./components/HeadCodeInjector";

const App: React.FC = () => {
  const customCode = `
  console.warn('Custom code injected into head!');
`;
  return (
    <HelmetProvider>
      <HeadCodeInjector code={customCode} />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};

export default App;
