// pages/clothing/women/dresses.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Dresses = () => {
  const [subSubCategory, setSubSubCategory] = useState(null);

  useEffect(() => {
    const fetchSubSubCategory = async () => {
      try {
        const response = await axios.get('/api/subsubcategories', {
          params: { name: 'Dresses' }
        });
        setSubSubCategory(response.data.subSubcategories[0]);
      } catch (error) {
        console.error('Error fetching sub-subcategory data:', error);
      }
    };

    fetchSubSubCategory();
  }, []);

  if (!subSubCategory) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{subSubCategory.name}</h1>
      <p>This is the {subSubCategory.name} page.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default Dresses;
