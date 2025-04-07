



import React, {useState, useRef, useEffect} from "react"
import { dog_logo } from '../../Components/ArrayData/logo'
import './Accessories.css'
import { dog, bone } from 'lucide-react';






const Accessories = () => {

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

        <div ref={containerRef} className={`accessories-container ${isVisible ? "fade-in" : ""}`} >

            <div className='accessories-main-wrapper'>
                <div><h3>Accessories for Dogs Lovers </h3></div>
            </div>



          



            <div className="accessories-wrapper-two">
                <div className="sec">
                     <div><img src={dog_logo.Accessories_Image} alt=""></img></div>
                    <div><h3>Ear Cleaner – To prevent infections.</h3></div>
                </div>

                <div className="sec">
                     <div><img src={dog_logo.Accessories_Image_Two} alt=""></img></div>
                    <div><h3>Toothbrush & Dog Toothpaste – For dental hygiene.</h3></div>
                </div>


                <div className="sec">
                    <div><img src={dog_logo.Accessories_Image_Three} alt=""></img></div>
                    <div><h3>Dog Shampoo & Conditioner – Keeps their coat clean and healthy.</h3></div>
                </div>



            </div>




        </div>





    </>
  )
}

export default Accessories
