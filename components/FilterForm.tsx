import React, { useState, useCallback, useEffect } from "react";
import { View, TextInput, Switch, Text, StyleSheet } from "react-native";
import { useVehicleStore } from "@/store/vehicleStore";
import { useDebounce } from "@/hooks/useDebounce";

export default function FilterForm() {
  const { filters, setFilters } = useVehicleStore();
  const [localFilters, setLocalFilters] = useState(filters);

  const applyFilters = useCallback(
    (newFilters: typeof filters) => {
      setFilters(newFilters);
    },
    [setFilters]
  );

  const debouncedApplyFilters = useDebounce(applyFilters, 500);

  const handleChange = useCallback(
    (name: string, value: string | boolean | number) => {
      setLocalFilters((prev) => {
        const newFilters = { ...prev, [name]: value };
        debouncedApplyFilters(newFilters);
        return newFilters;
      });
    },
    [debouncedApplyFilters]
  );

  const handleSwitchChange = useCallback(
    (value: boolean) => {
      handleChange("showFavourites", value);
    },
    [handleChange]
  );

  // Sync local filters with global filters
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Make"
        value={localFilters.make}
        onChangeText={(value) => handleChange("make", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={localFilters.model}
        onChangeText={(value) => handleChange("model", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Min Bid"
        value={localFilters.minBid.toString()}
        onChangeText={(value) => handleChange("minBid", Number(value))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Max Bid"
        value={
          localFilters.maxBid === Infinity ? "" : localFilters.maxBid.toString()
        }
        onChangeText={(value) =>
          handleChange("maxBid", value ? Number(value) : Infinity)
        }
        keyboardType="numeric"
      />
      <View style={styles.switchContainer}>
        <Text>Show Favourites Only</Text>
        <Switch
          value={localFilters.showFavourites}
          onValueChange={handleSwitchChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
