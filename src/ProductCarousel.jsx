import React, { useState, useLayoutEffect } from "react";
import ProductCard from "./ProductCard";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function handleResponsiveData(data, windowWidth) {
  let returnData;
  data.forEach((item) => {
    if (windowWidth < item.breakpoint) returnData = item;
  })
  return returnData;
};

const ProductCarousel = ({
  list,
  itemsToShow = 5,
  itemsToScroll = 1,
  speed = 500,
  responsive = []
}) => {
  const [carousel, updateCarousel] = useState({
    width: 150,
    translate: 0,
    position: 0
  });
  const [windowWidth] = useWindowSize();
  let productlist = React.createRef();
  useLayoutEffect(() => {
    const { width } = productlist.current.getBoundingClientRect();
    const responsiveData = handleResponsiveData(responsive, windowWidth);
    updateCarousel({ ...carousel, itemsToScroll, width: width / (responsiveData ? responsiveData.settings.itemsToShow : itemsToShow) });
  }, [windowWidth]);
  if (!list) return null;
  const divStyle = {
    width: `${list.length * carousel.width}px`,
    transform: `translate3d(${carousel.translate}px, 0px, 0px)`,
    transition: `transform ${speed}ms ease-in-out`
  };
  const itemStyle = {
    width: `${carousel.width}px`
  };
  const handleOnClick = direction => {
    const newTranslation =
      direction === "next"
        ? carousel.translate - carousel.width * itemsToScroll
        : carousel.translate + carousel.width * itemsToScroll;
    const newPosition =
      direction === "next"
        ? carousel.position + 1 * itemsToScroll
        : carousel.position - 1 * itemsToScroll;
    updateCarousel({
      width: carousel.width,
      translate: newTranslation,
      position: newPosition
    });
  };
  return (
    <div className="ProductCarousel">
      <div className="CarouselList">
        <button
          className="backBtn"
          onClick={e => handleOnClick("back")}
          disabled={carousel.position === 0}
        >
          Back
        </button>
        <div className="CarouselSlider" ref={productlist}>
          <div className="CarouselTrack" style={divStyle}>
            {list.map((item, i) => {
              return (
                <div className="CarouselItem" key={i} style={itemStyle}>
                  <ProductCard item={item} />
                </div>
              );
            })}
          </div>
        </div>
        <button
          className="nextBtn"
          onClick={e => handleOnClick("next")}
          disabled={carousel.position === list.length - itemsToShow}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;

//https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
