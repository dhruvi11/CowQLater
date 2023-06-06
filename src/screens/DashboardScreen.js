import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import images from '../res/imageConstant/images';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../utils/Size';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderAdd from '../component/HeaderAdd';

const DashboardScreen = ({navigation}) => {
  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#68BBE3'} barStyle={'dark-content'} />
        <HeaderAdd
          headerText={'Home'}
          leftIcon={images.settings}
          onPress1={() => {
            navigation.navigate('SettingScreen');
          }}
        />

        <View style={styles.rowView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RecordSaveScreen');
            }}
            style={styles.boxView}>
            <Image
              source={images.rainfall}
              resizeMode="contain"
              style={styles.imageicon}
            />
            <Text style={styles.titleText}>Rainfall Recorder</Text>
          </TouchableOpacity>
          <View style={styles.boxView}>
            <Image
              source={images.cowtally}
              resizeMode="contain"
              style={styles.imageicon}
            />
            <Text style={styles.titleText}>Tally</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  titleText: {
    fontSize: responsiveScreenFontSize(2),
    marginTop: responsiveScreenFontSize(2),
    color: '#68BBE3',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  imageicon: {
    height: responsiveScreenWidth(14),
    width: responsiveScreenWidth(14),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rowView: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: responsiveScreenWidth(10),
  },
  boxView: {
    height: responsiveScreenWidth(38),
    width: responsiveScreenWidth(40),
    borderRadius: responsiveScreenWidth(1),
    backgroundColor: colors.white,
    borderColor: '#68BBE3',
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
