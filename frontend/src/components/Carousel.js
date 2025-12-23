import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Carousel.css';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1600',
      alt: 'Agriculture moderne'
    },
    {
      url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600',
      alt: 'Équipement agricole'
    },
    {
      url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1600',
      alt: 'Champs agricoles'
    },
    {
      url: 'https://images.unsplash.com/photo-1625246165159-155c3454b8f2?w=1600',
      alt: 'Cultures agricoles'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image.url} alt={image.alt} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevious} aria-label="Image précédente">
        <FaChevronLeft />
      </button>
      <button className="carousel-arrow carousel-arrow-right" onClick={goToNext} aria-label="Image suivante">
        <FaChevronRight />
      </button>

      {/* Dots Indicator */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

