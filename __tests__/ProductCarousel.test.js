import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import ProductCarousel from "../src/components/ProductCarousel";
import ProductCard from "../src/components/ProductCard";

const productList = require("../src/data/productList.json");

describe("ProductCarousel Snapshot Tests", () => {
  let productCarouselElement;
  beforeEach(() => {
    productCarouselElement = renderer.create(
      <ProductCarousel>
        {productList.map(item => (
          <ProductCard item={item} />
        ))}
      </ProductCarousel>
    );
  });
  it("Renders the ProductCarousel Correctly", () => {
    let tree = productCarouselElement.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("ProductCarousel shallow rendering tests", () => {
  it("Should display the correct number of items", () => {
    let carousel = mount(
      <ProductCarousel>
        {productList.map(item => (
          <ProductCard item={item} />
        ))}
      </ProductCarousel>
    );
    expect(carousel.find(".CarouselItem").length).toBe(10);
  });
});
