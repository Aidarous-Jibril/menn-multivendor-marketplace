import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Head from "next/head";
import axios from "axios";

const CategoryPage = ({ categories, subcategories }) => {
  const router = useRouter();
  const { mainCategory } = router.query;

  return (
    <>
      {/* Meta Description Tag for SEO */}
      <Head>
        <meta
          name="description"
          content={`Explore products in the ${
            mainCategory ? mainCategory.replace(/-/g, " ") : "Unknown Category" } category`} />
      </Head>

      <Header categories={categories} />
      <div className="py-8 container mx-auto px-4 sm:pb-20 md:pb-28">
        {/* Back to Home Link */}
        <Link href="/" passHref legacyBehavior>
          <a className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to Home
          </a>
        </Link>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {mainCategory ? mainCategory.replace(/-/g, " ") : "Unknown Sub-Subcategory"}
        </h2>
        {subcategories?.length > 0 ? (
          <div className="relative overflow-x-auto">
            <div className="flex flex-nowrap gap-6 items-center justify-center md:justify-start">
              {subcategories.map((subcat) => (
                <div
                  key={subcat._id}
                  className="flex flex-col items-center text-center flex-shrink-0"
                >
                  <Link
                    href={`/category/${mainCategory}/${subcat.slug}`}
                    passHref
                    legacyBehavior
                  >
                    <a className="cursor-pointer">
                      <div className="w-20 md:w-24 lg:w-32 h-20 md:h-24 lg:h-32 rounded-full bg-gray-100 overflow-hidden">
                        <img
                          src={subcat.imageUrl}
                          alt={subcat.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm my-4 truncate">{subcat.name}</p>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">No subcategories available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

  export async function getServerSideProps(context) {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const { mainCategory } = context.query;

    try {
      // Using Promise.all for parallel fetching
      const [categoriesRes, subcategoriesRes, ] = await Promise.all([
        axios.get(`${baseURL}/api/categories`).catch(err => { console.error("Categories Error:", err); return null; }),
        axios.get(`${baseURL}/api/subcategories?categorySlug=${mainCategory}`).catch(err => { console.error("Sub Categories Error:", err); return null; }),
      ]);
  
      return {
        props: {
          categories: categoriesRes.data.categories  || [],
          subcategories: subcategoriesRes.data.subcategories|| [],
        },
      };
    } catch (error) {
      console.error("Error fetching data:", error.message);
  
      return {
        props: {
          categories: [],
          subcategories: [],
        },
      };
    }
  }

  
export default CategoryPage;
