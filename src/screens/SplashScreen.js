import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from "react-native";
// Custom ======================================================================================
import colors from "../res/colors/colors";
import images from "../res/imageConstant/images";
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "../utils/Size";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  // UseEffect ======================================================================================
  useEffect(async () => {
    setTimeout(async () => {
        navigation.navigate("DashboardScreen");
    }, 3000);
  });

  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <Image
          source={images.LogoIcon}
          resizeMode="contain"
          style={styles.imageicon}
        /> */}
        <Text style={styles.titleText}>Welcome to CowQLater</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText:{
    fontSize:responsiveScreenFontSize(3),
    color:colors.BLACK,
    fontWeight:"bold",
    alignSelf:"center",
    textAlign:"center"
  },
  imageicon: {
    height: responsiveScreenWidth(30),
    width: responsiveScreenWidth(50),
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default SplashScreen;