import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { colors, typography } from "../../theme";

interface HeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
}

function Header({ title, rightComponent }: HeaderProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {rightComponent && (
          <View style={styles.rightComponent}>{rightComponent}</View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {},
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontFamily: typography.fontFamily,
    fontWeight: "600",
  },
  rightComponent: {
    position: "absolute",
    right: 16,
  },
});

export default Header;
