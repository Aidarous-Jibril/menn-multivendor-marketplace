import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Head from "next/head";
import axios from "axios";

const SubCategoryPage = ({ categories, subSubcategories }) => {
  const router = useRouter();
  const { mainCategory, subCategory } = router.query;

  // Find the name of the current subcategory
  const currentSubCategory = categories.find(
    (maincat) => maincat.slug === mainCategory
  );

  return (
    <>
      <Head>
        <meta
          name="description"
          content={`Explore products in the ${subCategory ? subCategory.replace(/-/g, " ") : "Unknown Category"} category`}
        />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header categories={categories} />;
        <div className="flex-grow py-8 container mx-auto px-4 sm:pb-20 md:pb-28">
          {/* Back to Subcategories Link */}
          <Link href={`/category/${mainCategory}`} passHref legacyBehavior>
            <a className="text-blue-600 hover:underline mb-4 inline-block">
              &larr; Back to {currentSubCategory?.name || "previous category"}
            </a>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {subCategory ? subCategory.replace(/-/g, " ") : "Unknown Sub-Subcategory"}
          </h2>

          {subSubcategories?.length > 0 ? (
            <div className="relative overflow-x-auto">
              <div className="flex flex-nowrap gap-6 items-center justify-center md:justify-start">
                {subSubcategories.map((subSubCat) => (
                  <div
                    key={subSubCat._id}
                    className="flex flex-col items-center text-center flex-shrink-0"
                  >
                    <Link
                      href={`/category/${mainCategory}/${subCategory}/${subSubCat.slug}`}
                      passHref
                      legacyBehavior
                    >
                      <a className="cursor-pointer">
                        <div className="w-20 md:w-24 lg:w-32 h-20 md:h-24 lg:h-32 rounded-full bg-gray-100 overflow-hidden">
                          <img
                            src={
                              subSubCat.imageUrl ||
                              "https://via.placeholder.com/100"
                            }
                            alt={subSubCat.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm my-4 truncate">{subSubCat.name}</p>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center mt-4">No sub-subcategories available.</p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const { mainCategory, subCategory } = context.params;
    console.log("Query Params in getServerSideProps:", context.query);
    try {
      const [categoriesRes, subcategoriesRes, subSubcategoriesRes] = await Promise.all([
        axios.get(`${baseURL}/api/categories`).catch(err => { console.error("Categories Error:", err); return null; }),
        axios.get(`${baseURL}/api/subcategories?categorySlug=${mainCategory}`).catch(err => { console.error("Sub Categories Error:", err); return null; }),
        axios.get(`${baseURL}/api/sub-subcategories?subCategorySlug=${subCategory}`).catch(err => { console.error("Sub Sub-Categories Error:", err); return null; }),
      ]);
  
      return {
        props: {
          categories: categoriesRes.data.categories || [],
          subcategories: subcategoriesRes.data.subcategories || [],
          subSubcategories: subSubcategoriesRes.data.subSubcategories || [],
        },
      };
    } catch (error) {
      console.error("Error fetching data:", error.message);
  
      return {
        props: {
          categories: [],
          subcategories: [],
          subSubcategories: [],
        },
      };
    }
  }
  


export default SubCategoryPage;
