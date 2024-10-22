// import React, { useState, useRef, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";
// import { FilteredProductData } from "../type";

// interface IProps {
//   imageList: FilteredProductData;
// }

// const Carousel: React.FC<IProps> = ({ imageList }) => {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   const [nav1, setNav1] = useState<Slider | null>(null);
//   const [nav2, setNav2] = useState<Slider | null>(null);

//   const nav1Ref = useRef<Slider>(null);
//   const nav2Ref = useRef<Slider>(null);

//   useEffect(() => {
//     setNav1(nav1Ref.current);
//     setNav2(nav2Ref.current);
//   }, []);

//   const mainSettings = {
//     asNavFor: nav2,
//     ref: nav1Ref,
//     arrows: true,
//     dots: false,
//   };

//   const thumbnailSettings = {
//     asNavFor: nav1,
//     ref: nav2Ref,
//     slidesToShow: imageList?.variants.length,
//     swipeToSlide: true,
//     focusOnSelect: true,
//     centerMode: true,
//     centerPadding: "0px",
//     arrows: false,
//   };
//   return (
//     <div className="carousel-container">
//       <Slider {...mainSettings}>
//         {imageList?.variants.map((variant, index) => (
//           <div
//             key={index}
//             className="image-wrapper flex text-center"
//             onMouseEnter={() => setHoveredIndex(index)}
//             onMouseLeave={() => setHoveredIndex(null)}
//           >
//             <Image
//               width={400}
//               height={400}
//               alt={`Image ${index}`}
//               src={
//                 hoveredIndex === index
//                   ? variant.back_image
//                   : variant.front_image
//               }
//               className="image"
//             />
//           </div>
//         ))}
//       </Slider>
//       <Slider {...thumbnailSettings}>
//         {imageList?.variants.map((variant, index) => (
//           <div
//             key={index}
//             className="thumbnail-wrapper"
//             onMouseEnter={() => setHoveredIndex(index)}
//             onMouseLeave={() => setHoveredIndex(null)}
//           >
//             <Image
//               width={100}
//               height={100}
//               alt={`Thumbnail Image ${index}`}
//               src={variant.front_image}
//               className="thumbnail"
//             />
//           </div>
//         ))}
//       </Slider>
//       <style jsx>{`
//         .carousel-container {
//           width: 100%;
//         }
//         .slick-slide {
//           display: flex !important;
//           justify-content: center !important;
//           align-items: center !important;
//         }
//         .slick-list {
//           overflow: hidden;
//         }
//         .slick-track {
//           display: flex;
//         }
//         .image-wrapper {
//           width: 400px;
//           height: 400px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }
//         .image {
//           object-fit: cover;
//           width: 400px;
//           height: 400px;
//         }
//         .thumbnail-wrapper {
//           width: 100px;
//           height: 100px;
//           display: flex !important;
//           justify-content: center;
//           align-items: center;
//         }
//         .thumbnail {
//           object-fit: scale-down;
//           width: 100px;
//           height: 100px;
//         }
//         .image-wrapper {
//           display: flex !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Carousel;

// import React, { useState, useRef, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";

// interface FilteredProductData {
//   cover_image: string;
//   variants: {
//     front_image: string;
//     back_image: string;
//   }[];
// }

// interface IProps {
//   imageList: FilteredProductData;
// }

// const Carousel: React.FC<IProps> = ({ imageList }) => {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   const [nav1, setNav1] = useState<Slider | null>(null);
//   const [nav2, setNav2] = useState<Slider | null>(null);

//   const nav1Ref = useRef<Slider>(null);
//   const nav2Ref = useRef<Slider>(null);

//   useEffect(() => {
//     setNav1(nav1Ref.current);
//     setNav2(nav2Ref.current);
//   }, []);

//   const mainSettings = {
//     asNavFor: nav2,
//     ref: nav1Ref,
//     arrows: true,
//     dots: false,
//   };

//   const thumbnailSettings = {
//     asNavFor: nav1,
//     ref: nav2Ref,
//     slidesToShow: imageList?.variants.length,
//     swipeToSlide: true,
//     focusOnSelect: true,
//     centerMode: true,
//     centerPadding: "0px",
//     arrows: false,
//   };

//   const slideToImage = (index: number) => {
//     if (nav1) {
//       nav1.slickGoTo(index);
//     }
//   };

//   return (
//     <div className="carousel-container">
//       <Slider {...mainSettings}>
//         {imageList?.variants.map((variant, index) => (
//           <div
//             key={index}
//             className="image-wrapper flex text-center"
//             onMouseEnter={() => setHoveredIndex(index)}
//             onMouseLeave={() => setHoveredIndex(null)}
//           >
//             <Image
//               width={400}
//               height={400}
//               alt={`Image ${index}`}
//               src={
//                 hoveredIndex === index
//                   ? variant.back_image
//                   : variant.front_image
//               }
//               className="image"
//             />
//           </div>
//         ))}
//       </Slider>
//       <Slider {...thumbnailSettings}>
//         {imageList?.variants.map((variant, index) => (
//           <div
//             key={index}
//             className="thumbnail-wrapper"
//             onMouseEnter={() => setHoveredIndex(index)}
//             onMouseLeave={() => setHoveredIndex(null)}
//           >
//             <Image
//               width={100}
//               height={100}
//               alt={`Thumbnail Image ${index}`}
//               src={variant.front_image}
//               className="thumbnail"
//             />
//           </div>
//         ))}
//       </Slider>
//       <div className="button-container">
//         <button onClick={() => slideToImage(0)}>First</button>
//         <button onClick={() => slideToImage(1)}>Second</button>
//         <button onClick={() => slideToImage(2)}>Third</button>
//       </div>
//       <style jsx>{`
//         .carousel-container {
//           width: 100%;
//         }
//         .slick-slide {
//           display: flex !important;
//           justify-content: center !important;
//           align-items: center !important;
//         }
//         .slick-list {
//           overflow: hidden;
//         }
//         .slick-track {
//           display: flex;
//         }
//         .image-wrapper {
//           width: 400px;
//           height: 400px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }
//         .image {
//           object-fit: cover;
//           width: 400px;
//           height: 400px;
//         }
//         .thumbnail-wrapper {
//           width: 100px;
//           height: 100px;
//           display: flex !important;
//           justify-content: center;
//           align-items: center;
//         }
//         .thumbnail {
//           object-fit: scale-down;
//           width: 100px;
//           height: 100px;
//         }
//         .button-container {
//           display: flex;
//           justify-content: center;
//           margin-top: 20px;
//         }
//         .button-container button {
//           margin: 0 10px;
//           padding: 10px 20px;
//           background-color: #007bff;
//           color: white;
//           border: none;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Carousel;

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

interface FilteredProductData {
  cover_image: string;
  variants: {
    front_image: string;
    back_image: string;
  }[];
}

interface IProps {
  imageList: FilteredProductData;
}

const Carousel = forwardRef(({ imageList }: IProps, ref) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  const nav1Ref = useRef<Slider>(null);
  const nav2Ref = useRef<Slider>(null);

  useEffect(() => {
    setNav1(nav1Ref.current);
    setNav2(nav2Ref.current);
  }, []);

  useImperativeHandle(ref, () => ({
    slideTo(index: number) {
      if (nav1) {
        nav1.slickGoTo(index);
      }
    },
  }));

  const mainSettings = {
    asNavFor: nav2,
    ref: nav1Ref,
    arrows: true,
    dots: false,
  };

  const thumbnailSettings = {
    asNavFor: nav1,
    ref: nav2Ref,
    slidesToShow: imageList?.variants.length,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
  };
  return (
    <div className="carousel-container">
      {imageList?.variants?.length > 1 ? (
        <Slider {...mainSettings}>
          {imageList?.variants.map((variant, index) => (
            <div
              key={index}
              className="image-wrapper flex text-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                width={400}
                height={400}
                alt={`Image ${index}`}
                src={
                  hoveredIndex === index
                    ? variant.back_image
                    : variant.front_image
                }
                className="image"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <Image
          width={400}
          height={400}
          alt={`Image`}
          src={imageList?.variants?.[0]?.front_image}
          className="image"
        />
      )}
      {imageList?.variants?.length > 1 ? (
        <Slider {...thumbnailSettings}>
          {imageList?.variants.map((variant, index) => (
            <div
              key={index}
              className="thumbnail-wrapper"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                width={100}
                height={100}
                alt={`Thumbnail Image ${index}`}
                src={variant.front_image}
                className="thumbnail"
              />
            </div>
          ))}
        </Slider>
      ) : null}

      <style jsx>{`
        .carousel-container {
          width: 100%;
        }
        .slick-slide {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
        .slick-list {
          overflow: hidden;
        }
        .slick-track {
          display: flex;
        }
        .image-wrapper {
          width: 400px;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .image {
          object-fit: cover;
          width: 400px;
          height: 400px;
        }
        .thumbnail-wrapper {
          width: 100px;
          height: 100px;
          display: flex !important;
          justify-content: center;
          align-items: center;
        }
        .thumbnail {
          object-fit: scale-down;
          width: 100px;
          height: 100px;
        }
        .image-wrapper {
          display: flex !important;
        }
      `}</style>
    </div>
  );
});
Carousel.displayName = "Carousel";
export default Carousel;
