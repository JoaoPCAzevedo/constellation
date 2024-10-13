import { create } from "zustand";
import vehiclesData from "@/vehicles.json";

// Define the structure of a Vehicle object
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  engineSize: string;
  fuel: string;
  year: number;
  mileage: number;
  auctionDateTime: string;
  startingBid: number;
  favourite: boolean;
}

// Define the structure of the store state and actions
interface VehicleState {
  // Array of all vehicles
  vehicles: Vehicle[];
  // Array of vehicles after applying filters
  filteredVehicles: Vehicle[];
  // Current filter settings
  filters: {
    make: string;
    model: string;
    minBid: number;
    maxBid: number;
    showFavourites: boolean;
  };
  // Action to update filters
  setFilters: (filters: Partial<VehicleState["filters"]>) => void;
  // Action to toggle favourite status of a vehicle
  toggleFavourite: (id: string) => void;
  // Action to apply current filters to the vehicle list
  applyFilters: () => void;
}

// Create the store using Zustand
export const useVehicleStore = create<VehicleState>((set, get) => ({
  // Initialize vehicles with data from JSON file
  vehicles: vehiclesData, // No need to map and add IDs, they're already in the data
  // Initially, filtered vehicles are the same as all vehicles
  filteredVehicles: vehiclesData,
  // Initial filter settings
  filters: {
    make: "",
    model: "",
    minBid: 0,
    maxBid: Infinity,
    showFavourites: false,
  },

  // Action to update filters
  setFilters: (newFilters) => {
    // Update the filters state
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    // Apply the updated filters
    get().applyFilters();
  },

  // Action to toggle favourite status of a vehicle
  toggleFavourite: (id: string) => {
    set((state) => ({
      vehicles: state.vehicles.map((vehicle) =>
        vehicle.id === id
          ? { ...vehicle, favourite: !vehicle.favourite }
          : vehicle
      ),
    }));
    // Re-apply filters after toggling favourite
    get().applyFilters();
  },

  // Action to apply current filters to the vehicle list
  applyFilters: () => {
    set((state) => ({
      filteredVehicles: state.vehicles.filter((vehicle) => {
        const { make, model, minBid, maxBid, showFavourites } = state.filters;
        return (
          (!make || vehicle.make.toLowerCase().includes(make.toLowerCase())) &&
          (!model ||
            vehicle.model.toLowerCase().includes(model.toLowerCase())) &&
          vehicle.startingBid >= minBid &&
          vehicle.startingBid <= maxBid &&
          (!showFavourites || vehicle.favourite)
        );
      }),
    }));
  },
}));
