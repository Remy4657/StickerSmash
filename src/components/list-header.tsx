import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

//import { useCartStore } from '../store/cart-store';

export const ListHeader = () => {
  // const { getItemCount } = useCartStore();

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  // };

  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("@/assets/images/react-logo.png")}
              style={styles.avatarImage}
            />
            <Text style={styles.avatarText}>Hello codewithlari</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Link style={styles.cartContainer} href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <FontAwesome
                    name="shopping-cart"
                    size={25}
                    color="gray"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />

                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity
            // onPress={handleSignOut}
            style={styles.signOutButton}
          >
            <FontAwesome name="sign-out" size={25} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.heroContainer}>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={styles.heroImage}
        />
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={[]}
          renderItem={({ item }) => (
            <Link asChild href={``}>
              <Pressable style={styles.category}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            </Link>
          )}
          keyExtractor={(item) => item?.name}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
    gap: 20,
    padding: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
  cartContainer: {},
  signOutButton: {},
  heroContainer: {
    width: "100%",
    height: 200,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  categoriesContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  category: {
    width: 100,
    alignItems: "center",
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  categoryText: {},
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: 10,
    backgroundColor: "#1BC464",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
