import React, { useState, useLayoutEffect } from "react";
import ProductCard from "./ProductCard";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const ProductCarousel = ({ list, itemsToShow = 5, skipBy = 1 }) => {
  const [carousel, updateCarousel] = useState({
    width: 150,
    translate: 0,
    position: 0
  });
  const [width] = useWindowSize();
  let productlist = React.createRef();
  useLayoutEffect(() => {
    const { width } = productlist.current.getBoundingClientRect();
    updateCarousel({ width: width / itemsToShow, translate: 0, position: 0 });
  }, [width]);
  if (!list) return null;
  const divStyle = {
    width: `${list.length * carousel.width}px`,
    transform: `translate3d(${carousel.translate}px, 0px, 0px)`,
    transition: "transform 0.5s ease-in-out"
  };
  const itemStyle = {
    width: `${carousel.width}px`
  };
  const handleOnClick = direction => {
    const newTranslation =
      direction === "next"
        ? carousel.translate - carousel.width * skipBy
        : carousel.translate + carousel.width * skipBy;
    const newPosition =
      direction === "next"
        ? carousel.position + 1 * skipBy
        : carousel.position - 1 * skipBy;
    updateCarousel({
      width: carousel.width,
      translate: newTranslation,
      position: newPosition
    });
  };
  return (
    <div className="ProductCarousel">
      <div className="CarouselList" ref={productlist}>
        <div className="CarouselSlider" style={divStyle}>
          {list.map((item, i) => {
            return (
              <div className="CarouselItem" style={itemStyle}>
                <ProductCard item={item} key={i} />
              </div>
            );
          })}
        </div>
        <div className="CarouselUI">
          <button
            className="backBtn"
            onClick={e => handleOnClick("back")}
            disabled={carousel.position === 0}
          >
            Back
          </button>
          <button
            className="nextBtn"
            onClick={e => handleOnClick("next")}
            disabled={carousel.position === list.length - itemsToShow}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;

//https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
