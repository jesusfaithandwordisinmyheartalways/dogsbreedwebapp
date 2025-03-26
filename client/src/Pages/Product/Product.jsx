


import React, { useContext, useEffect, useState } from 'react';
import SidebarCart from "../../Components/SidebarCart/SidebarCart"
import { useParams } from 'react-router-dom';
import { dogs_products } from '../../Components/ArrayData/adoptdogs';
import { DogStoreContext } from '../../Context/DogStoreProvider';
import { Truck, ShoppingCart, ChevronUp, ChevronDown } from "lucide-react";
import SimilarDogs from '../../Components/SimilarDogs/SimilarDogs';
import Reviews from '../../Components/Reviews/Reviews';
import './Product.css'





const Product = () => {
    const { productId } = useParams() 
    const [productData, setProductData] = useState(null);
    const [size, setSize] = useState('')
    const [image, setImage] = useState('');
    const [hoverImage, setHoverImage] = useState('');
    const [zoom, setZoom] = useState(false);
    const [multiselect, setMultiSelect] = useState([])
    const [magnifierStyle, setMagnifierStyle] = useState({ display: 'none' });
    const [accordionIsOpen, setAccordionIsOpen] = useState(false)
    const [displaySidebar,  setDisplaySidebar] = useState(false)

    const { AddCartItems, updateSelectedSize,buttonOptions, 
        setButtonOptions, setSelectedSizes, selectedSizes  } = useContext(DogStoreContext)




        useEffect(() => {
          if (displaySidebar) {
            document.body.classList.add("overlay-active");
            localStorage.setItem("overlayActive", "true");
          } else {
            document.body.classList.remove("overlay-active");
            localStorage.removeItem("overlayActive");
          }
        }, [displaySidebar]);
      









    
        useEffect(() => {
            const storedPickupOption = localStorage.getItem('selectedPickupOption');
            if (storedPickupOption) {
                setButtonOptions(JSON.parse(storedPickupOption));
            }
        }, []);







            useEffect(() => {
                const storedSizes =  localStorage.getItem(`selectedSizes_${productId}`);
                try {
                    const parsedSizes = storedSizes ? JSON.parse(storedSizes) : [];
                    setMultiSelect(parsedSizes);
                } catch (error) {
                    console.error("Error parsing selectedSizes:", error);
                    localStorage.removeItem('selectedSizes'); // Clear invalid data
                }
            }, [productId]);





              // Function to handle pickup option selection
         const userPickupOption = (option) => {
            if (buttonOptions !== option) {
                setButtonOptions(option);
                localStorage.setItem("selectedPickupOption", JSON.stringify(option));
            }
    };





        // Function to handle size selection
        const userSizeChange = (e) => {
            const newSize = e.target.value;
            if (newSize && !multiselect.includes(newSize)) {
                const updatedSizes = [...multiselect, newSize];
                setMultiSelect(updatedSizes);
                localStorage.setItem(`selectedSizes_${productId}`, JSON.stringify(updatedSizes));
                updateSelectedSize(productId, updatedSizes); // Update global state
            }
        };



        // Function to remove a selected size
        const removeSelectedSize = (sizeToRemove) => {
              const updatedSizes = multiselect.filter(size => size !== sizeToRemove);
               setMultiSelect(updatedSizes);
               localStorage.setItem(`selectedSizes_${productId}`, JSON.stringify(updatedSizes));
        };







    const UserCartAccess = () => {
        if (multiselect.length === 0) {
          alert('Please select a size');
          return;
        }

        if (!buttonOptions) {  // Check if no pickup option is selected
            alert('Please select a pickup option');
            return;
        }


         // Add the product to the cart
         AddCartItems(productData.id, multiselect);
         setDisplaySidebar(true); 
       };





       const closeSidebar = () => {
        setDisplaySidebar(false);
    };


     






       useEffect(() => {
        if (!productId || productId === 'undefined') {
            console.error('Error: productId is missing!');
            return;
        }
    
        const productFound = dogs_products.find((data) => String(data.id) === String(productId));
        if (productFound) {
            setProductData(productFound);
            setImage(Array.isArray(productFound.image) ? productFound.image[0] : productFound.image);
        } else {
            console.error('Product not found', productId);
        }
    }, [productId]);






      const userMouseMove = (e) => {
        if (!zoom) return;

        const imgContainer = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - imgContainer.left) / imgContainer.width) * 100;
        const y = ((e.clientY - imgContainer.top) / imgContainer.height) * 100;

        setMagnifierStyle({
            backgroundImage: `url(${image})`,
            backgroundPosition: `${x}% ${y}%`,
            backgroundSize: "250%",
            display: 'block',
            left: `${e.clientX - 100}px`,
            top: `${e.clientY - 100}px`
        });

      }




      const userMouseLeave = () => {
        setZoom(false);
        setMagnifierStyle({ display: 'none' });
      }



      const windowZoom = () => {
        setZoom(!zoom);
        if (!zoom) {
            setMagnifierStyle({ display: 'none' });
        }
      }
        


      const toggleAccordion = () => {
        setAccordionIsOpen((prev) => {
            console.log("Accordion toggled:", !prev);
            return !prev;
        });
    };








    return productData ? (
        <>

            <SidebarCart display={displaySidebar} closeSidebar={closeSidebar} />

            <div className="product-container">
                <div className="product-wrapper">


                <div className="top-left-main-image-wrapper">


                <div className='top-left-images'>
                  {productData.image.map((data, index) => (
                    <div key={index}>
                      <img onClick={() => setImage(data)} onMouseEnter={() => setHoverImage(data)} src={data} alt={productData.name} className="thumbnail" ></img>
                    </div>
                  ))}
                </div>

                <div  onClick={windowZoom} onMouseLeave={userMouseLeave} onMouseMove={userMouseMove}  className="main-image-container" >

                <img className={zoom ? 'zoomed' : ''} src={hoverImage || image}  alt={productData.name}></img> 
                <div className="magnifier" style={magnifierStyle}></div>
                 </div>


              </div>





              <div className="top-right-wrapper">

              <div><h3>{productData.name}</h3></div>

              <div className='sku-wrapper'>
                <div>SKU#:{productData.SKU_NUM}</div>
                <div>item#{productData.itemNum}</div>
              </div>

              <div className='product-price-wrapper'>
                <div>${productData.old_price.toFixed(2)}</div>
                <div>${productData.new_price.toFixed(2)}</div>

              </div>


                  {/* Multi-Select Dropdown */}
              <div className='product-size-wrapper'>
                <div><h4>Size:</h4></div>
                 <select onChange={userSizeChange} value={size}>
                   <option value="">Select Size</option>
                   {productData.sizes.map((data) => (
                    <option key={data} value={data}>{data}</option>
                   ))}

                 </select>

                   {/* Display Selected Sizes */}
                   <div className="selected-sizes">
                            {multiselect.map((data) => (
                                <span key={data} className="selected-size"> {data} 
                                    <button onClick={() => removeSelectedSize(data)}>❌</button>
                                </span>
                            ))}
                        </div>


              </div>




              <div className='how-order-wrapper'>
                  <div>How to Order</div>

              </div>



              <div className='pickup-options-wrapper'>
                <div><button  onClick={() => userPickupOption('storePickup')} 
                className={buttonOptions === 'StorePickup' ? 'active' : ''} >Store Pickup <ShoppingCart size={14} /></button>
                
                </div>

                <div><button onClick={() => userPickupOption('sameDayDelivery')}  
                className={buttonOptions === 'SameDayDelivery' ? 'active' : ''} >
                 Same Day Delivery <Truck size={14} /></button>
                </div>


                <div><button onClick={() => userPickupOption('shipToHome')} 
                className={buttonOptions === 'ShipToHome' ? 'active' : ''} >
                 Ship to Home 🚚 </button>
                </div>


              </div>





              <div className='add-to-cart'><button onClick={UserCartAccess}> Add to Cart</button></div>





              <div className="accordion-wrapper">
                 <div className={`accordion ${accordionIsOpen ? 'active' : ''}`}>
                 <button onClick={toggleAccordion}>  Breed Details 
                    {accordionIsOpen ? <ChevronUp className="chevron-icon" size={13} /> : <ChevronDown className="chevron-icon" size={13} />}
                   </button>
                 </div>

                <div className={`panel ${accordionIsOpen ? "open" : ""}`}>
                    {productData.description.map((data, index) => (
                 <div key={index}>
                    <ul>
                      <li>{data}</li>
                      <li>this breed of dogs contains great interest</li>
                   </ul>
                   
                   </div>
                ))}
            </div>
     </div>




              </div>

            



                </div>











                    <SimilarDogs />
                    <Reviews />





            </div>
        </>

    ): (

        <div> dog inventory not found</div>
    )
        
    
}





export default Product