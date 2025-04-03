import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface PreviewLogoProps {
  imageUrl: string;
  size?: "small" | "large";
}

function PreviewLogo({ imageUrl, size = "large" }: PreviewLogoProps) {
  return (
    <View
      style={[
        styles.container,
        size === "small" ? styles.smallContainer : styles.largeContainer,
      ]}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  largeContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
  },
  smallContainer: {
    width: 70,
    height: 70,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default PreviewLogo;
