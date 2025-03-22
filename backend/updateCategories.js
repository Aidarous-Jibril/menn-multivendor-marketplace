const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MainCategory = require('./models/mainCategory');
const SubCategory = require('./models/subCategory');
const SubSubCategory = require('./models/subSubCategory');

// Load environment variables
dotenv.config();

// Helper function to generate slugs
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Replace spaces and special characters with hyphens
    .replace(/^-+|-+$/g, '');     // Remove leading or trailing hyphens
};

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Update Main Categories
const updateMainCategories = async () => {
  const mainCategories = await MainCategory.find();
  for (let category of mainCategories) {
    category.slug = generateSlug(category.name);
    category.imageUrl = category.imageUrl || 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Provide default if needed
    await category.save();
  }
  console.log('Main categories updated.');
};

// Update Sub Categories
const updateSubCategories = async () => {
  const subCategories = await SubCategory.find();
  for (let subCategory of subCategories) {
    subCategory.slug = generateSlug(subCategory.name);
    subCategory.imageUrl = subCategory.imageUrl || 'https://media.istockphoto.com/id/864505242/sv/foto/m%C3%A4ns-kl%C3%A4der-och-personliga-tillbeh%C3%B6r.jpg?s=612x612&w=0&k=20&c=Dct5FzkWK1ST_7RpXbZe2SOAAzFYkXC9F-Vh1BVH-j4='; // Provide default if needed
    await subCategory.save();
  }
  console.log('Sub categories updated.');
};

// Update Sub-Sub Categories
const updateSubSubCategories = async () => {
  const subSubCategories = await SubSubCategory.find();
  for (let subSubCategory of subSubCategories) {
    subSubCategory.slug = generateSlug(subSubCategory.name);
    subSubCategory.imageUrl = subSubCategory.imageUrl || 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Provide default if needed
    await subSubCategory.save();
  }
  console.log('Sub-sub categories updated.');
};

// Execute the updates
const updateAllCategories = async () => {
  await updateMainCategories();
  await updateSubCategories();
  await updateSubSubCategories();
  mongoose.disconnect();
};

updateAllCategories()
  .then(() => console.log('All categories updated successfully'))
  .catch(err => console.error('Error updating categories', err));
