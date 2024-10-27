"use client"
import { Image as MedusaImage } from "@medusajs/medusa";
import { Container } from "@medusajs/ui";
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0].id);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const thumbnailsRef = useRef<HTMLButtonElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setShowThumbnails(window.innerWidth >= 985);
    };

    handleResize(); // Check window width on initial render

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imageId = entry.target.id;
          setSelectedImage(imageId);
        }
      });
    }, observerOptions);

    imageRefs.current.forEach((imageRef) => {
      observer.observe(imageRef);
    });

    return () => {
      observer.disconnect();
    };
  }, [images]);

  const handleThumbnailClick = (imageId: string) => {
    setSelectedImage(imageId);
    const imageElement = document.getElementById(imageId);
    if (imageElement) {
      imageElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-start">
      {showThumbnails && (
        <div className="flex flex-col w-100 sticky top-0 h-screen overflow-y-auto mr-4 gap-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              ref={(element) => (thumbnailsRef.current[index] = element as HTMLButtonElement)}
              onClick={() => handleThumbnailClick(image.id)}
              className={`w-full h-20 flex items-center justify-center cursor-pointer ${selectedImage === image.id ? 'bg-gray-200' : ''
                }`}
            >
              <Image
                src={image.url}
                alt={`Product image thumbnail ${image.id}`}
                width={60}
                height={60}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
      <div className="flex-1">
        {images.map((image, index) => (
          <Container
            key={image.id}
            ref={(element) => (imageRefs.current[index] = element as HTMLDivElement)}
            className="relative aspect-[4/3] w-full overflow-hidden bg-ui-bg-subtle"
            id={image.id}
          >
            <Image
              src={image.url}
              className="absolute inset-0 rounded-rounded"
              alt={`Product image ${image.id}`}
              fill
              sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              style={{
                objectFit: "none",
              }}
            />
          </Container>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;