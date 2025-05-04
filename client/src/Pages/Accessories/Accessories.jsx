



import React, {useState, useRef, useEffect} from "react"
import { dog_logo } from '../../Components/ArrayData/logo'
import './Accessories.css'
import { useQuery, gql } from '@apollo/client'



const GET_DOGS = gql `
query GetDogs  {
    dogs_breed {
        title,
        type
    }
}
`;



const Accessories = () => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
     const { loading, error, data } = useQuery(GET_DOGS)
    
          










    



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




                {/*-----------// 👇 GraphQL code from server: This section displays the dog breed data fetched from the GraphQL API-----------*/}
                <div className="graphql-container">
                <ul>
                {data.dogs_breed.map((elements, index) => (
                <li key={index}>
                <strong>{elements.title}  {elements.type}</strong>
                </li>
            ))}
                </ul>
                </div>





            </div>




        </div>





    </>
  )
}

export default Accessories
