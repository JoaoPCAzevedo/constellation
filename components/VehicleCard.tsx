import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useVehicleStore, type Vehicle } from "@/store/vehicleStore";
import { Link } from "expo-router";
import { useAuctionTimer } from "@/hooks/useAuctionTimer";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const toggleFavourite = useVehicleStore((state) => state.toggleFavourite);
  const timeUntilAuction = useAuctionTimer(vehicle.auctionDateTime);

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: `https://picsum.photos/seed/${vehicle.make}/300/200`,
        }}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`${vehicle.make} ${vehicle.model}`}</Text>
        <TouchableOpacity onPress={() => toggleFavourite(vehicle.id)}>
          <Text>{vehicle.favourite ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      </View>
      <Text>Year: {vehicle.year}</Text>
      <Text>Engine: {vehicle.engineSize}</Text>
      <Text>Fuel: {vehicle.fuel}</Text>
      <Text>Mileage: {vehicle.mileage}</Text>
      <Text>Starting Bid: ${vehicle.startingBid}</Text>
      <Text>{`${timeUntilAuction?.title} ${timeUntilAuction?.value}`}</Text>
      <Link
        style={styles.buttonDetails}
        href={`/vehicle-details/${vehicle.id}`}
      >
        View details
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonDetails: {
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    textAlign: "center",
    backgroundColor: "#3498db",
    color: "white",
  },
});
