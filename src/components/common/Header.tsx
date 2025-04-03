import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { colors, typography } from "../../theme";

interface HeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
}

function Header({ title, rightComponent }: HeaderProps) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {rightComponent ? (
          <>
            <Text style={styles.title}>{title}</Text>
            <View>{rightComponent}</View>
          </>
        ) : (
          <Text style={styles.centeredTitle}>{title}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontFamily: typography.fontFamily,
    fontWeight: "800",
  },
  centeredTitle: {
    color: colors.text,
    fontSize: 18,
    fontFamily: typography.fontFamily,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
});

export default Header;
