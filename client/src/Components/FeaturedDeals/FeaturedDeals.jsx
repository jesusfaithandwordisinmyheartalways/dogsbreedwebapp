



import React, { useState, useRef, useEffect } from "react";
import { featured_deals } from "../ArrayData/deals";
import "./FeaturedDeals.css";

const FeaturedDeals = () => {
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
      <div  ref={containerRef} className={`FeaturedDeals-Container ${isVisible ? "fade-in" : ""}`}>
        <div className="FeaturedDeals-Wrapper">
          <div className="image-carousel-deal-wrapper">
            <h3>Feature For Dogs Deals</h3>
            <div className="arrow-wrapper">
              {/* Left Arrow */}
              <div></div>
              <div></div>
              {/* Right Arrow */}
            </div>
          </div>



          {/* Horizontal Scroll Gallery */}
          <div className="scroll-container">
            <img src={featured_deals.dog_promotion} alt="Dog Promotion" />
            <img src={featured_deals.dog_promotion_two} alt="Dog Promotion Two" />
            <img src={featured_deals.dog_promotion_three} alt="Dog Promotion Three" />
            <img src={featured_deals.dog_promotion_four} alt="Dog Promotion Four" />
            <img src={featured_deals.dog_promotion_five} alt="Dog Promotion Five" />
            <img src={featured_deals.dog_promotion_six} alt="Dog Promotion Six" />
            <img src={featured_deals.dog_promotion_seven} alt="Dog Promotion Seven" />
          </div>
        </div>
      </div>
    </>
  );
};






export default FeaturedDeals;