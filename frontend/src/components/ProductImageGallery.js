import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ProductImageGallery.css';

const ProductImageGallery = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure images is always an array
  const imageArray = Array.isArray(images) ? images : (images ? [images] : []);
  
  if (imageArray.length === 0) {
    return (
      <div className="product-image-gallery">
        <div className="gallery-main-image">
          <div className="no-image-placeholder">
            <span>Aucune image disponible</span>
          </div>
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="product-image-gallery">
      {/* Main Image */}
      <div className="gallery-main-image">
        <img 
          src={imageArray[currentIndex]} 
          alt={`${productName} - Image ${currentIndex + 1}`}
          className="main-image"
        />
        
        {/* Navigation Arrows */}
        {imageArray.length > 1 && (
          <>
            <button 
              className="gallery-nav-btn gallery-nav-prev"
              onClick={goToPrevious}
              aria-label="Image précédente"
            >
              <FaChevronLeft />
            </button>
            <button 
              className="gallery-nav-btn gallery-nav-next"
              onClick={goToNext}
              aria-label="Image suivante"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* Image Counter */}
        {imageArray.length > 1 && (
          <div className="image-counter">
            {currentIndex + 1} / {imageArray.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {imageArray.length > 1 && (
        <div className="gallery-thumbnails">
          {imageArray.map((image, index) => (
            <button
              key={index}
              className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToImage(index)}
              aria-label={`Voir l'image ${index + 1}`}
            >
              <img 
                src={image} 
                alt={`${productName} - Miniature ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;

