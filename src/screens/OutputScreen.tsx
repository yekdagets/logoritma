import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { colors, typography } from "../theme";
import { SCREEN_TITLES } from "../constants";
import { getLogoRequest } from "../services/logoService";
import Header from "../components/common/Header";
import { LogoRequest } from "../types";

type OutputScreenRouteProp = RouteProp<RootStackParamList, "Output">;

function OutputScreen() {
  const route = useRoute<OutputScreenRouteProp>();
  const { requestId } = route.params;

  const [logoData, setLogoData] = useState<LogoRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogoData = async () => {
      try {
        setLoading(true);
        const data = await getLogoRequest(requestId);
        setLogoData(data);
      } catch (err) {
        console.error("Error fetching logo data:", err);
        setError("Failed to load logo data");
      } finally {
        setLoading(false);
      }
    };

    fetchLogoData();
  }, [requestId]);

  const renderCloseButton = () => {
    return <View style={styles.closeButtonContainer} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={SCREEN_TITLES.OUTPUT}
        rightComponent={renderCloseButton()}
      />

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={colors.primaryGradientStart}
            />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : logoData?.imageUrl ? (
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: logoData.imageUrl }}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No logo image available</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const sharedStyles = {
  text: {
    fontFamily: typography.fontFamily,
    color: colors.text,
  },
  centered: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    ...sharedStyles.centered,
  },
  loadingContainer: {
    flex: 1,
    ...sharedStyles.centered,
  },
  errorContainer: {
    flex: 1,
    ...sharedStyles.centered,
  },
  errorText: {
    ...sharedStyles.text,
    fontSize: 16,
    textAlign: "center",
  },
  logoContainer: {
    width: "100%",
    height: 300,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    ...sharedStyles.centered,
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  closeButtonContainer: {
    padding: 8,
  },
});

export default OutputScreen;
