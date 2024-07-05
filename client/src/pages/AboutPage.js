import React from "react";
import Layout from "./../components/Layout/Layout";
import "../styles/Footer.css";

const AboutPage = () => {
  return (
    <Layout title={"About us"}>
      <div className="row ">
        <div className="col-md-6 ">
          <img
            src="/images/about.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Absolutely! Here's a draft for the "About Us" page for your
            ecommerce website, Shopy, created using the MERN stack: Welcome to
            Shopy! At Shopy, we believe that shopping should be more than just a
            transaction – it should be an experience. Our journey began with a
            simple idea: to create a platform that brings together quality
            products, seamless shopping, and exceptional customer service.
            Founded on the principles of innovation and customer satisfaction,
            Shopy is your one-stop destination for all your shopping needs.
            Whether you're searching for the latest fashion trends, tech
            gadgets, home decor, or anything in between, we've got you covered.
            What sets us apart is our commitment to providing a personalized
            shopping experience tailored to your preferences. Our intuitive
            interface makes it easy to navigate through a vast array of
            products, while our advanced search and filter options ensure that
            you find exactly what you're looking for, every time. But Shopy is
            more than just an ecommerce platform – it's a community. We're
            passionate about connecting people with the products they love and
            fostering meaningful interactions along the way. From our dedicated
            customer support team to our vibrant social media presence, we're
            here to support you at every step of your shopping journey. As a
            proudly MERN stack-powered platform, we leverage the latest
            technologies to deliver a seamless and secure shopping experience.
            Our robust backend infrastructure ensures fast load times and
            reliable performance, while our responsive frontend design ensures
            that you can shop anytime, anywhere, on any device. Above all, we're
            committed to integrity and transparency in everything we do. From
            our product sourcing practices to our pricing policies, you can
            trust that Shopy has your best interests at heart. Thank you for
            choosing Shopy. We're honored to be a part of your shopping
            experience, and we look forward to serving you for years to come.
            Happy shopping! The Shopy Team
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
