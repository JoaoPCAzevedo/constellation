import { renderHook, act } from "@testing-library/react-native";
import { useVehicleStore } from "@/store/vehicleStore";

const mockVehicles = [
  {
    id: "1",
    make: "Toyota",
    model: "Corolla",
    favourite: false,
    engineSize: "2.0L",
    fuel: "Gasoline",
    year: 2022,
    mileage: 10000,
    startingBid: 15000,
    currentBid: 16000,
    auctionDateTime: new Date().toISOString(),
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    startingBid: 12000,
    favourite: true,
    engineSize: "1.8L",
    fuel: "Petrol",
    year: 2020,
    mileage: 30000,
    auctionDateTime: new Date().toISOString(),
  },
];

describe("vehicleStore", () => {
  it("should set filters correctly", () => {
    const { result } = renderHook(() => useVehicleStore());
    act(() => {
      result.current.setFilters({ make: "Toyota", minBid: 5000 });
    });
    expect(result.current.filters.make).toBe("Toyota");
    expect(result.current.filters.minBid).toBe(5000);
  });

  it("should toggle favourite correctly", () => {
    const { result } = renderHook(() => useVehicleStore());
    act(() => {
      result.current.vehicles = [mockVehicles[0]];
      result.current.toggleFavourite(mockVehicles[0].id);
    });
    expect(result.current.vehicles[0].favourite).toBe(true);
  });

  it("should apply filters correctly", () => {
    const { result } = renderHook(() => useVehicleStore());
    act(() => {
      result.current.vehicles = mockVehicles.map((vehicle) => vehicle);
      result.current.setFilters({ make: "Toyota", showFavourites: false });
      result.current.applyFilters();
    });
    expect(result.current.filteredVehicles).toHaveLength(1);
    expect(result.current.filteredVehicles[0].make).toBe("Toyota");
  });
});
