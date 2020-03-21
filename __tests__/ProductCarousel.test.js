import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import ProductCarousel from "../src/components/ProductCarousel";

describe("ProductCarousel Snapshot Tests", () => {
  let productCarouselElement;
  beforeEach(() => {
    productCarouselElement = renderer.create(<ProductCarousel list={[{}]} />);
  });
  it("Renders the ProductCarousel Correctly", () => {
    let tree = productCarouselElement.toJSON();
    console.log(tree);
    expect(tree).toMatchSnapshot();
  });
});

describe("ProductCarousel shallow rendering tests", () => {
  it("Should be disabled if set to disabled", () => {
    let carousel = mount(<ProductCarousel />);
    console.log(carousel);
  });
});
