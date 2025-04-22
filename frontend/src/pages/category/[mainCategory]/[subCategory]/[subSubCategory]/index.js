import React from "react";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Head from "next/head";
import axios from "axios";


const SubSubCategoryPage = ({ categories, subSubcategories, products, mainCategory, subCategory, subSubCategory }) => {
  // Find the name of the current subcategory
  const currentSubCategory = subSubcategories.find(
    (subSub) => subSub.slug === subSubCategory
  );

  return (
    <>
      <Head>
        <meta
          name="description"
          content={`Explore products in the ${subSubCategory ? subSubCategory.replace(/-/g, " ") : "Unknown Sub-Subcategory"} under ${subCategory ? subCategory.replace(/-/g, " ") : "Unknown Subcategory"} category`}
        />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header categories={categories} />
        <div className="flex-grow py-8 container mx-auto px-4 sm:pb-20 md:pb-28">
          {mainCategory && subCategory && (
            <Link href={`/category/${mainCategory}/${subCategory}`} passHref legacyBehavior>
              <a className="text-blue-600 hover:underline mb-4 inline-block">
                &larr; Back to {currentSubCategory?.name || "previous category"}
              </a>
            </Link>
          )}

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {subSubCategory ? subSubCategory.replace(/-/g, " ") : "Unknown Sub-Subcategory"}
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No products available in this category.
            </p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const { mainCategory, subCategory, subSubCategory } = context.params;

  try {
    const [categoriesRes, subSubcategoriesRes, productsRes] = await Promise.all([
      axios.get(`${baseURL}/api/categories`).catch(err => { console.error("Categories Error:", err); return null; }),
      axios.get(`${baseURL}/api/sub-subcategories?subCategorySlug=${subCategory}`).catch(err => { console.error("Sub Sub-Categories Error:", err); return null; }),
      axios.get(`${baseURL}/api/products?subCategory=${subCategory}&subSubCategory=${subSubCategory}`).catch(err => { console.error("Products Error:", err); return null; }),
    ]);

    return {
      props: {
        categories: categoriesRes?.data?.categories || [],
        subSubcategories: subSubcategoriesRes.data.subSubcategories || [],
        products: productsRes?.data?.products || [],
        mainCategory: mainCategory || null,
        subCategory: subCategory || null,
        subSubCategory: subSubCategory || null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        categories: [],
        subSubcategories: [],
        products: [],
        mainCategory: null,
        subCategory: null,
        subSubCategory: null,
      },
    };
  }
}

export default SubSubCategoryPage;
