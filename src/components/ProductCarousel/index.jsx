import React, { useState, useLayoutEffect } from "react";
import ProductCard from "../ProductCard";

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
  return data.find(item => windowWidth < item.breakpoint);
}

function getNewPositions(direction, carousel) {
  const position =
    direction === "next"
      ? carousel.position + 1 * carousel.itemsToScroll
      : carousel.position - 1 * carousel.itemsToScroll;
  const translate =
    direction === "next"
      ? carousel.translate - carousel.width * carousel.itemsToScroll
      : carousel.translate + carousel.width * carousel.itemsToScroll;
  return { position, translate };
}

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
    position: 0,
    itemsToScroll,
    itemsToShow
  });
  const [windowWidth] = useWindowSize();
  const productlist = React.createRef();
  useLayoutEffect(() => {
    const { width } = productlist.current.getBoundingClientRect();
    const responsiveData = handleResponsiveData(responsive, windowWidth);
    updateCarousel({
      position: 0,
      translate: 0,
      itemsToShow: responsiveData
        ? responsiveData.settings.itemsToShow
        : itemsToShow,
      itemsToScroll: responsiveData
        ? responsiveData.settings.itemsToScroll
        : itemsToScroll,
      width:
        width /
        (responsiveData ? responsiveData.settings.itemsToShow : itemsToShow)
    });
  }, [windowWidth]);
  if (!list || !list.length) return null;
  const handleOnClick = direction => {
    const { position, translate } = getNewPositions(direction, carousel);
    console.log(position);
    console.log(list.length - carousel.itemsToShow);
    updateCarousel({
      ...carousel,
      width: carousel.width,
      translate,
      position
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
          <div
            className="CarouselTrack"
            style={{
              width: `${list.length * carousel.width}px`,
              transform: `translate3d(${carousel.translate}px, 0px, 0px)`,
              transition: `transform ${speed}ms ease-in-out`
            }}
          >
            {list.map((item, i) => {
              return (
                <div
                  className="CarouselItem"
                  key={i}
                  style={{ width: `${carousel.width}px` }}
                >
                  <ProductCard item={item} />
                </div>
              );
            })}
          </div>
        </div>
        <button
          className="nextBtn"
          onClick={e => handleOnClick("next")}
          disabled={carousel.position === list.length - carousel.itemsToShow}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
