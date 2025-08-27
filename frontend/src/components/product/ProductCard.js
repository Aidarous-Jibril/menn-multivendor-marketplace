import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import CountdownTimer from "../routes/sales/CountdownTimer";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography"; 
import { Box } from "@mui/material";
import { useSelector } from "react-redux";


const ProductCard = ({ product, isSale = false, saleEndDate, isMoreFromSeller = false, }) => {
  const [sampleRating, setSampleRating] = useState(0);
  const { symbol, code, rates } = useSelector((state) => state.currency);

  const originalPrice = parseFloat(product?.originalPrice) || 0;
  const discountedPrice = parseFloat(product?.discountPrice) || 0;

  const convertedOriginal = code === "USD"
    ? originalPrice
    : originalPrice * (rates[code] || 1);
  
  const convertedDiscount = code === "USD"
    ? discountedPrice
    : discountedPrice * (rates[code] || 1);
  

  useEffect(() => {
    setSampleRating(Math.random() * (5 - 3) + 3);
  }, []);

  const calculateDiscountPercentage = (original, discounted) => {
    if (original > 0) {
      const discountPercentage = ((original - discounted) / original) * 100;
      return discountPercentage.toFixed(0);
    }
    return 0;
  };

  const discountPercentage = calculateDiscountPercentage(originalPrice, discountedPrice);

  const imageUrl = product?.images?.[0]?.url;

  return (
    <Link href={isSale ? `/sale/${product._id}` : `/product/${product._id}`} legacyBehavior>
      <Card
        sx={{
          width: '100%',                 
          backgroundColor: isSale ? "#fff8e1" : "white",
          border: isSale
            ? "2px solid red"
            : isMoreFromSeller
            ? "2px solid green"
            : "1px solid #ddd",
          borderRadius: "15px",
          cursor: "pointer",
        }}
      >
      {/* More from Seller Design */}
      {isMoreFromSeller ? (
        <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
          <Box
            sx={{
              display: "flex",
              mb: 1.5,
              backgroundColor: "#f9f9f9",
              p: 1,
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                flex: "0 0 80px",
                height: "80px",
                position: "relative",
                mr: 1,
                overflow: "hidden",
                borderRadius: "4px",
                backgroundColor: "#fff",
              }}
            >
              <Image
                src={imageUrl || "/images/sgalaxy.jpeg"}
                alt={product?.name || "Product Image"}
                layout="fill"
                objectFit="contain"
                sizes="(max-width: 640px) 64px, 80px"
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{  fontSize: "12px", mb: 0.5 }} >
                {product?.name
                  ? product.name.slice(0, 15).toUpperCase() +
                    (product.name.length > 20 ? "..." : "")
                  : "UNKNOWN"}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333", mb: 0.5 }}>
                {symbol}{convertedDiscount.toFixed(2)}
              </Typography>
            </Box>

            {/* Discount Percentage */}
            {discountPercentage && (
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "#ff4d4f",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: "bold",
                  p: "4px 6px",
                  borderRadius: "50px",
                }}
              >
                {`${discountPercentage}% OFF`}
              </Box>
            )}
          </Box>
        </Box>
      ) : isSale ? (
        <Box sx={{ p: 1, textAlign: "center" }}>
          {/* Image Section */}
          <AspectRatio ratio="1" sx={{ minHeight: isSale ? 160 : 220 }}>
            <Image
              src={imageUrl || "/images/sgalaxy.jpeg"}
              alt={product?.name || "Product Image"}
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </AspectRatio>

          {/* Discount Percentage */}
          {discountPercentage > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                backgroundColor: "red",
                color: "white",
                p: "5px 10px",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            >
              {discountPercentage}% OFF
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body2" sx={{  fontSize: "10px", flexGrow: 1, textAlign: "left" }}>
              {product?.name
                ? product.name.slice(0, 12).toUpperCase() +
                  (product.name.length > 12 ? "..." : "")
                : "UNKNOWN"}
            </Typography>
            <Typography sx={{ fontSize: "md", fontWeight: "bold", color: "red", ml: 1 }}>
              {symbol}{convertedDiscount.toFixed(2)}
            </Typography>
          </Box>

          {/* Countdown Timer */}
          {saleEndDate && (
            <Box sx={{ mt: 1 }}>
              <CountdownTimer
                endDate={saleEndDate}
                textColor="text-white"
                bgColor="bg-red-600"
                textSize="text-sm"
              />
            </Box>
          )}
        </Box>
      ) : (
        <Box>
          {/* Image Section */}
          <AspectRatio ratio="1" sx={{ minHeight: isSale ? 160 : 220 }}>
            <Image
              src={imageUrl || "/images/sgalaxy.jpeg"}
              alt={product?.name || "Product Image"}
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </AspectRatio>

          {/* Discount Percentage */}
          {discountPercentage > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                backgroundColor: isSale ? "red" : "green",
                color: "white",
                p: "5px 10px",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            >
              {discountPercentage}% OFF
            </Box>
          )}

          {/* Brand */}
          <Typography variant="body2" sx={{fontSize: "10px",}}>
            {product?.brand || "UNKNOWN"}
          </Typography>

          {/* Product Name */}
              <Typography variant="body2" sx={{  fontSize: "12px", mb: 0.5 }} >
            {product?.name
              ? product.name.slice(0, 15).toUpperCase() +
                (product.name.length > 15 ? "..." : "")
              : "UNKNOWN"}
          </Typography>

          {/* Rating and Pricing */}
          <CardContent sx={{ pt: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1, pl: 1 }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < Math.floor(product?.rating || sampleRating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
                size={12}
              />
              ))}
              <Typography sx={{ ml: 1, fontSize: "14px" }}>{(product?.rating || sampleRating).toFixed(1)} / 5</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", pl: 1, pr: 1 }}>
              {/* Original Price */}
              <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray", fontSize: "12px", mb: 0.5 }}>
                {symbol}{convertedOriginal.toFixed(2)}
              </Typography>

              {/* Discounted Price */}
              <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "green" }}>
                {symbol}{convertedDiscount.toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      )}
      </Card>
    </Link>
  );
};

export default ProductCard;
