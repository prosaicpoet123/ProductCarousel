import React from "react";
import ReactDOM from "react-dom";
import ProductCarousel from "./components/ProductCarousel";

import styles from "./styles/styles.css";
import productList from "./data/productList";

class App extends React.Component {
  render() {
    return (
      <ProductCarousel
        list={productList} // the data for the carousel
        itemsToShow={5} // number of items to show by default
        itemsToScroll={5} // number of items to scroll by on click
        speed={500} // speed of the animation in milliseconds
        responsive={[
          {
            breakpoint: 580,
            settings: {
              itemsToShow: 1,
              itemsToScroll: 1
            }
          },
          {
            breakpoint: 700,
            settings: {
              itemsToShow: 2,
              itemsToScroll: 2
            }
          }
        ]}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
