// src/components/routes/Hero.js
import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { src: "/images/bannerImgOne.jpg", alt: "Banner Image One" },
  { src: "/images/bannerImgTwo.jpg", alt: "Banner Image Two" },
  { src: "/images/bannerImgThree.jpg", alt: "Banner Image Three" },
  { src: "/images/bannerImgFour.jpg", alt: "Banner Image Four" },
  { src: "/images/bannerImgFive.jpg", alt: "Banner Image Five" },
];

const HeroPage = () => {
  const [dotActive, setDotActive] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "210px",
        }}
      >
        <ul
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 0,
            margin: 0,
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#131921",
                color: "white",
                padding: "8px 0",
                cursor: "pointer",
                border: "1px solid #f3a847",
              }
            : {
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#232F3E",
                color: "white",
                padding: "8px 0",
                cursor: "pointer",
                border: "1px solid white",
              }
        }
      >
        {i + 1}
      </div>
    ),
  };

  return (
    <div className="w-full h-full relative">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.src}
              alt={image.alt}
              layout="responsive"
              width={1920}
              height={1080}
              className="w-full"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroPage;
