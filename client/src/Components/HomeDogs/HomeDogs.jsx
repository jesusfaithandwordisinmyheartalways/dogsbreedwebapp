


import React, { useState, useEffect, useRef } from 'react';
import './HomeDog.css';
import DogProductItem from '../DogProductItem/DogProductItem';
import { dogs_products } from '../ArrayData/adoptdogs';

const HomeDogs = () => {
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
        <div ref={containerRef} className={`home-dog-container ${isVisible ? 'fade-in' : ''}`} >
            <h2 className="gallery-title">Adoptable Dogs</h2>
            
            {/* Scrollable Gallery Wrapper */}
            <div className="scroll-gallery">
                {dogs_products.map((data) => (
                    <DogProductItem 
                        key={data.id} 
                        id={data.id} 
                        image={data.image} 
                        hoverImage={data.hoverImage} 
                        name={data.name} 
                        old_price={data.old_price} 
                        new_price={data.new_price} 
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeDogs;