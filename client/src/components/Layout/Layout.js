import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, discription, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={discription} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
};
Layout.defaultProps = {
  title: "Ecommerce App",
  discription: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Gaurav Kumar Singh",
};
export default Layout;
