import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useVehicleStore } from "@/store/vehicleStore";
import VehicleCard from "@/components/VehicleCard";

export default function VehicleList() {
  // Get filtered vehicles from the store
  const filteredVehicles = useVehicleStore((state) => state.filteredVehicles);

  return (
    <FlatList
      data={filteredVehicles}
      renderItem={({ item }) => <VehicleCard vehicle={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
