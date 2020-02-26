import React from "react";
import ReactDOM from "react-dom";
import ProductCarousel from "./ProductCarousel";

import styles from "./styles/styles.css";
import productList from "./data/productList";

class App extends React.Component {
  render() {
    return (
      <ProductCarousel
        list={productList}
        itemsToShow={5}
        skipBy={1}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
