// pages/clothing/men/casual-shirts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const CasualShirts = () => {
  const [subSubCategory, setSubSubCategory] = useState(null);

  useEffect(() => {
    const fetchSubSubCategory = async () => {
      try {
        const response = await axios.get('/api/subsubcategories?name=Casual Shirts');
        setSubSubCategory(response.data.subSubcategories[0]); // Assuming the response has an array of sub-subcategories
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
      <p>This is the Casual Shirts page.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default CasualShirts;
