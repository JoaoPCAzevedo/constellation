import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import VehicleCard from "@/components/VehicleCard";

const mockToggleFavourite = jest.fn();

// Mock the useVehicleStore hook
jest.mock("@/store/vehicleStore", () => ({
  useVehicleStore: jest.fn((selector) =>
    selector({ toggleFavourite: mockToggleFavourite })
  ),
}));

// Mock the useAuctionTimer hook
jest.mock("@/hooks/useAuctionTimer", () => ({
  useAuctionTimer: jest.fn(() => ({
    title: "Time until auction:",
    value: "1d 2h 3m",
  })),
}));

describe("VehicleCard", () => {
  const mockVehicle = {
    id: "1",
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    engineSize: "1.8L",
    fuel: "Petrol",
    mileage: 10000,
    startingBid: 15000,
    auctionDateTime: "2023-12-31T23:59:59",
    favourite: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(<VehicleCard vehicle={mockVehicle} />);
    expect(getByText("Toyota Corolla")).toBeTruthy();
    expect(getByText("Year: 2021")).toBeTruthy();
    expect(getByText("Engine: 1.8L")).toBeTruthy();
    expect(getByText("Fuel: Petrol")).toBeTruthy();
    expect(getByText("Mileage: 10000")).toBeTruthy();
    expect(getByText("Starting Bid: $15000")).toBeTruthy();
    expect(getByText("Time until auction: 1d 2h 3m")).toBeTruthy();
  });

  it("calls toggleFavourite when favourite button is pressed", () => {
    const { getByText } = render(<VehicleCard vehicle={mockVehicle} />);
    const favouriteButton = getByText("🤍");

    fireEvent.press(favouriteButton);

    expect(mockToggleFavourite).toHaveBeenCalledWith("1");
  });
});
