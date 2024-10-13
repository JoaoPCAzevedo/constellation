import React from "react";
import { View, StyleSheet } from "react-native";
import FilterForm from "@/components/FilterForm";
import VehicleList from "@/components/VehicleList";
import { Stack } from "expo-router";

const HomeScreen: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Vehicle List" }} />
      <View style={styles.container}>
        <FilterForm />
        <VehicleList />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;
