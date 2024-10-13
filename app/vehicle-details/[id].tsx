import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useVehicleStore } from "@/store/vehicleStore";
import { Stack, useLocalSearchParams } from "expo-router";
import { useAuctionTimer } from "@/hooks/useAuctionTimer";

type RootStackParamList = {
  VehicleDetails: { id: number };
};

type VehicleDetailsRouteProp = RouteProp<RootStackParamList, "VehicleDetails">;

interface VehicleDetailsProps {
  route: VehicleDetailsRouteProp;
}

const VehicleDetailsScreen: React.FC<VehicleDetailsProps> = () => {
  const { id } = useLocalSearchParams();
  const vehicleId = typeof id === "string" ? parseInt(id) : NaN;
  const vehicle = useVehicleStore((state) => state.vehicles[vehicleId]);

  if (isNaN(vehicleId) || !vehicle) {
    return <Text>Vehicle not found</Text>;
  }

  const timeUntilAuction = useAuctionTimer(vehicle.auctionDateTime);

  return (
    <>
      <Stack.Screen
        options={{
          title: `${vehicle.make} ${vehicle.model}`,
          headerBackTitle: "Back",
        }}
      />
      <ScrollView style={styles.container}>
        <Image
          source={{
            uri: `https://picsum.photos/seed/${vehicle.make}${vehicle.model}/600/400`,
          }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{`${vehicle.make} ${vehicle.model}`}</Text>
          <View style={styles.detailsGrid}>
            <Text style={styles.detailItem}>
              <Text style={styles.bold}>Year:</Text> {vehicle.year}
            </Text>
            <Text style={styles.detailItem}>
              <Text style={styles.bold}>Engine Size:</Text> {vehicle.engineSize}
            </Text>
            <Text style={styles.detailItem}>
              <Text style={styles.bold}>Fuel Type:</Text> {vehicle.fuel}
            </Text>
            <Text style={styles.detailItem}>
              <Text style={styles.bold}>Mileage:</Text> {vehicle.mileage}
            </Text>
            <Text style={styles.detailItem}>
              <Text style={styles.bold}>Starting Bid:</Text> $
              {vehicle.startingBid}
            </Text>
            <Text style={styles.detailItem}>
              <Text style={styles.bold}>{timeUntilAuction?.title}</Text>{" "}
              {timeUntilAuction?.value}
            </Text>
          </View>
          <View style={styles.additionalInfo}>
            <Text style={styles.subtitle}>Additional Information</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              auctor, nunc id aliquam tincidunt, nisl nunc tincidunt nunc, vitae
              aliquam nunc nunc vitae nunc. Sed euismod, nunc id aliquam
              tincidunt, nisl nunc tincidunt nunc, vitae aliquam nunc nunc vitae
              nunc.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detailItem: {
    width: "50%",
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  additionalInfo: {
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default VehicleDetailsScreen;
