


import React, { useContext, useEffect, useState } from 'react'
import './Category.css'
import SearchBar from '../../Components/SearchBar/SearchBar'
import { dogs_products } from '../../Components/ArrayData/adoptdogs'
import { DogStoreContext } from '../../Context/DogStoreProvider'
import { Link } from "react-router-dom";






const Category = () => {
   const { search } =  useContext(DogStoreContext)
   const [filteredProducts, setFilteredProducts] = useState(dogs_products)
   const [selectedCategories, setSelectedCategories] = useState([]);
   const [selectedSubCategories, setSelectedSubCategories] = useState([]);
   const [selectedBrands, setSelectedBrands] = useState([]);
   const [selectedSizes, setSelectedSizes] = useState([]);
   const [selectedDiscounts, setSelectedDiscounts] = useState([]);
   const [sortType, setSortType] = useState('relevant');
   const [minPrice, setMinPrice] = useState(0);
   const [maxPrice, setMaxPrice] = useState(1000);
   const [fadeIn, setFadeIn] = useState(false);





   // Handles category selection
   const categoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
 };



 // Handles subcategory selection
 const subCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedSubCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
 };





  // Handles brand selection
  const brandChange = (event) => {
    const { value } = event.target;
    setSelectedBrands((prev) =>
       prev.includes(value) ? prev.filter((brand) => brand !== value) : [...prev, value]
    );
 };




  // Handles size selection
  const sizeChange = (event) => {
    const { value } = event.target;
    setSelectedSizes((prev) =>
       prev.includes(value) ? prev.filter((size) => size !== value) : [...prev, value]
    );
 };




 // Handles discount selection
 const discountChange = (event) => {
  const { value } = event.target;
  setSelectedDiscounts((prev) =>
     prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
  );
};






 // Apply filters based on search, category, subcategory, price, and sorting
 const applyFilters = () => {
    let updatedProducts = dogs_products;

    // Filter by search query
    if (search.trim() !== '') {
       updatedProducts = updatedProducts.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
       );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
       updatedProducts = updatedProducts.filter((product) =>
          selectedCategories.includes(product.category)
       );
    }

    // Filter by subcategories
    if (selectedSubCategories.length > 0) {
       updatedProducts = updatedProducts.filter((product) =>
          selectedSubCategories.includes(product.subCategory)
       );
    }


     // Filter by brands
     if (selectedBrands.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
         Array.isArray(product.brand) && product.brand.some((brand) => selectedBrands.includes(brand))
      );
   }


     // Filter by sizes
     if (selectedSizes.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
         Array.isArray(product.sizes) && product.sizes.some((size) => selectedSizes.includes(size))
      );
  }




    // Filter by discounts
    if (selectedDiscounts.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
         Array.isArray(product.discount_percentage) &&
         product.discount_percentage.some((discount) => selectedDiscounts.includes(discount.toString()))
      );
   }




    // Filter by price range
    updatedProducts = updatedProducts.filter(
       (product) => product.new_price >= minPrice && product.new_price <= maxPrice
    );

    // Apply sorting
    if (sortType === 'low-high') {
       updatedProducts.sort((a, b) => a.new_price - b.new_price);
    } else if (sortType === 'high-low') {
       updatedProducts.sort((a, b) => b.new_price - a.new_price);
    }

    setFilteredProducts(updatedProducts);
 };




 // Effect to apply filters whenever user changes selection
 useEffect(() => {
   applyFilters(); // filters first
 }, [search, selectedCategories, selectedSubCategories, selectedBrands, selectedSizes, selectedDiscounts, sortType, minPrice, maxPrice]);
 
 // After filteredProducts updates, scroll to top
 useEffect(() => {
   if (filteredProducts.length > 0) {
     setTimeout(() => {
       window.scrollTo({ top: 0, behavior: 'smooth' });
     }, 100); // short delay to allow render
   }
 }, [filteredProducts]);




 // Extract unique brand names from dog_products
 const uniqueBrands = [...new Set(dogs_products.flatMap((product) => Array.isArray(product.brand) ? product.brand : []))];
 const uniqueSizes = [...new Set(dogs_products.flatMap((product) => Array.isArray(product.sizes) ? product.sizes : []))];
 const uniqueDiscounts = [...new Set(dogs_products.flatMap((product) => 
  Array.isArray(product.discount_percentage) ? product.discount_percentage : []
))];




useEffect(() => {
   setFadeIn(true);
}, []);



useEffect(() => {
   window.scrollTo({
     top: 0,
     behavior: 'smooth'
   });
 }, [filteredProducts]);




 useEffect(() => {
   window.scrollTo({ top: 0, behavior: 'smooth' });
 }, [search]);


  return (
    <>
     <SearchBar />




    <div  className={`collection-container ${fadeIn ? 'fade-in' : ''}`} >
      <div className='collection-wrapper-right'>

        <div className={'select'}>
           <select onChange={(e) => setSortType(e.target.value)}>
                           <option value='relevant'>Sort by: Relevant</option>
                           <option value='low-high'>Sort by: Low to High</option>
                           <option value='high-low'>Sort by: High to Low</option>
                        </select>
        </div>
      </div>





      <div className='main-wrapper'>

          <div className={'CATEGORIES'}>
            <div className='category-wrapper'>
            <div><h3>Types of Dogs</h3></div>
           <div>
              <label>White Dog<input onChange={categoryChange} type='checkbox' value='White Dog'></input></label>
           </div>  
           <div>
           <label>Mix Dog<input onChange={categoryChange} type='checkbox' value='Mix Dog'></input></label>
           </div>
           <div>
           <label>Light Brown Dog<input onChange={categoryChange} type='checkbox' value='Light Brown Dog'></input></label>
           </div>

           <div>
           <label>Black & Brown Dog<input onChange={categoryChange} type='checkbox' value='Black & Brown Dog'></input></label>
           </div>

          
           <div>
           <label>Family Dog<input onChange={subCategoryChange} type='checkbox' value='Family Dog'></input></label>
           </div>

           <div>
           <label>Friendly Dog<input onChange={subCategoryChange} type='checkbox' value='Friendly Dog'></input></label>
           </div>

           <div>
           <label>Intelligent Dog<input onChange={subCategoryChange} type='checkbox' value='Intelligent Dog'></input></label>
           </div>

           <div>
           <label>Dog Shampoo<input onChange={subCategoryChange} type='checkbox' value='Dog Shampoo'></input></label>
           </div>

           <div>
              <label>Dog Ear Cleaner<input onChange={subCategoryChange} type='checkbox' value='Dog Ear Cleaner'></input></label>
              </div>

           <div>
           <label>Dog Toothbrush<input onChange={subCategoryChange} type='checkbox' value='Dog Toothbrush'></input></label>
           </div>




            </div>




              {/*----------- Price range filter */}

              <div className='price-range-filter-wrapper'>

                <div> <h3>Price Range</h3></div>
                <label>Min Price:  ${minPrice}
                <input onChange={(e) => setMinPrice(Number(e.target.value))} type='range' min="0" max="1000" step="150" value={minPrice} >
                </input></label>

                <label>Max Price: ${maxPrice}
                <input onChange={(e) => setMaxPrice(Number(e.target.value))} type='range' min="0" max="1000" step="150" value={maxPrice} >
                </input></label>

                <div> <button onClick={applyFilters}>Go</button></div>

              </div>



                 {/*----------- Brand Filters------- – */}
                 <div className='brand-filter-wrapper'>
                     <div><h3>Brand Breed Filters</h3></div>
                     {uniqueBrands.map((data) => (
                        <div key={data}>
                          <label>{data}<input onChange={brandChange} type='checkbox' value={data}></input></label>

                        </div>
                     ))}
                 </div>
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 {/*----------- Size Filter------- – */}
                 <div className='size-filter-wrapper'>
                      <div><h3>Size Filters</h3></div>
                      {uniqueSizes.map((data) => (
                        <div key={data}>
                            <label>{data}<input onChange={sizeChange} type='checkbox' value={data}></input></label>
                        </div>
                      ))}
                     

                 </div>
                 
                 
                 


                 
                 {/*----------- Discount & Deals Filter------- – */}
                 <div className='discount-filter-wrapper'>
                    <div><h3>Discount & Deals</h3></div>
                    {uniqueDiscounts.map((data) => (
                      <div key={data}>
                        <label>{data}% <input onChange={discountChange} type='checkbox' value={data}>

                        </input>
                        </label>

                      </div>
                    ))}

                 </div>










           
           </div>







             <div className='categories-section'>
                 {filteredProducts.map((data) => (
                   <div key={data.id}>
                      <Link to={`/product/${data.id}`} className='category-link'>
                         <div><img src={data.image[0]} alt=''></img></div>
                         <div><p>{data.name}</p></div>
                         <div className='category-price'><span>Order Today <p>${data.new_price.toFixed(2)}  |
                           Discount:{data.discount_percentage? data.discount_percentage[0] : null}</p></span></div>
                         
                        
                      
                         

                      </Link>

                   </div>
                 ))}

             </div>







      </div>






      <div className='flex-wrapper'>

        </div>






                 

                









    </div>





    </>
  )
}




export default Category
