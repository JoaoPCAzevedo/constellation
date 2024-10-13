import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FilterForm from "@/components/FilterForm";
import { useVehicleStore } from "@/store/vehicleStore";

// Mock the useVehicleStore hook
jest.mock("@/store/vehicleStore", () => ({
  useVehicleStore: jest.fn(() => ({
    filters: {
      make: "",
      model: "",
      minBid: 0,
      maxBid: Infinity,
      showFavourites: false,
    },
    setFilters: jest.fn(),
  })),
}));

describe("FilterForm", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(<FilterForm />);
    expect(getByPlaceholderText("Make")).toBeTruthy();
    expect(getByPlaceholderText("Model")).toBeTruthy();
    expect(getByPlaceholderText("Min Bid")).toBeTruthy();
    expect(getByPlaceholderText("Max Bid")).toBeTruthy();
    expect(getByText("Show Favourites Only")).toBeTruthy();
  });

  it("calls setFilters when inputs change", () => {
    const { getByPlaceholderText } = render(<FilterForm />);
    const makeInput = getByPlaceholderText("Make");
    fireEvent.changeText(makeInput, "Toyota");
    expect(useVehicleStore().setFilters).toHaveBeenCalledWith({
      make: "Toyota",
    });
  });

  it("calls setFilters when switch is toggled", () => {
    const { getByTestId } = render(<FilterForm />);
    const favouriteSwitch = getByTestId("favourite-switch");
    fireEvent(favouriteSwitch, "valueChange", true);
    expect(useVehicleStore().setFilters).toHaveBeenCalledWith({
      showFavourites: true,
    });
  });
});
