



import React, {useState, useRef, useEffect} from "react"
import './ListOfBreeds.css'
import DogProductItem from "../DogProductItem/DogProductItem";
import { dogs_products } from '../ArrayData/adoptdogs';



const ListOfBreeds = () => {
        const containerRef = useRef(null);
        const [isVisible, setIsVisible] = useState(false);
    


        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                },
                { threshold: 0.2 }
            );
    
            if (containerRef.current) {
                observer.observe(containerRef.current);
            }
    
            return () => {
                if (containerRef.current) {
                    observer.unobserve(containerRef.current);
                }
            };
        }, []);
    
    



   



    return (
        <>
        <div ref={containerRef} className={`ListOfBreeds-Container ${isVisible ? "fade-in" : ""}`} >

                <div className="deals-by-pet-wrappper">
                    <div><h3> Deals by Pet</h3></div>
                </div>









             
                  <div className="ListOfBreeds-Wrapper">
                  {dogs_products.slice(0, 4).map((data) => (
                        <DogProductItem key={data.id} 
                        id={data.id} 
                        image={data.image} 
                        hoverImage={data.hoverImage}
                         name={data.name} 
                         old_price={data.old_price}
                         new_price={data.new_price} />
                
                
                 ))}
                   
                  </div>





        </div>


        </>
    )
}







export default ListOfBreeds