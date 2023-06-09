import React, {useEffect, useState} from 'react';
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
  TextInput,
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import images from '../res/imageConstant/images';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../utils/Size';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import HeaderAdd from '../component/HeaderAdd';

const CountPaddockScreen = ({navigation}) => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [numberValue, setnumberValue] = useState(0);
  const [spinner, setspinner] = useState(false);

  // UseEffect ======================================================================================

  // UseEffect ======================================================================================

  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#68BBE3'} barStyle={'dark-content'} />
        <Spinner visible={spinner} size={'large'} color="#0E86D4" />
        <HeaderAdd
          onPress={() => {
            navigation.goBack();
          }}
          headerText={'Tally Paddock'}
          rightIcon={images.backArrow}
        />
        <View style={{paddingTop: responsiveScreenWidth(5)}}>
          <Text style={styles.titleText}>Paddock 1</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '15%',
              }}>
              <Text style={styles.titleText}>{'Cow'}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '70%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setValue1(value1 + 1);
                }}
                style={styles.boxBoderView}>
                <Text
                  style={[
                    styles.titleText,
                    {
                      fontSize: responsiveScreenFontSize(2),
                      alignSelf: 'center',
                      textAlign: 'center',
                      marginTop: responsiveScreenWidth(-0.5),
                    },
                  ]}>
                  {'+'}
                </Text>
              </TouchableOpacity>
              <TextInput
                value={value1}
                onChangeText={text => {
                  setValue1(text);
                }}
                placeholder="0"
                style={{
                  width: '30%',
                  borderColor: colors.gray_dark,
                  borderWidth: responsiveScreenWidth(0.3),
                  height: responsiveScreenWidth(10),
                  marginTop: responsiveScreenWidth(3),
                  width: responsiveScreenWidth(25),
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setValue1(value1 - 1);
                }}
                style={styles.boxBoderView}>
                <Text
                  style={[
                    styles.titleText,
                    {
                      fontSize: responsiveScreenFontSize(2),
                      alignSelf: 'center',
                      textAlign: 'center',
                      marginTop: responsiveScreenWidth(-0.5),
                    },
                  ]}>
                  {'-'}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '15%',
              }}>
              <Text style={styles.titleText}>{value1}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '15%',
              }}>
              <Text style={styles.titleText}>{'Horse'}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '70%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setValue2(value2 + 1);
                }}
                style={styles.boxBoderView}>
                <Text
                  style={[
                    styles.titleText,
                    {
                      fontSize: responsiveScreenFontSize(2),
                      alignSelf: 'center',
                      textAlign: 'center',
                      marginTop: responsiveScreenWidth(-0.5),
                    },
                  ]}>
                  {'+'}
                </Text>
              </TouchableOpacity>
              <TextInput
                value={value2}
                onChangeText={text => {
                  setValue2(text);
                }}
                placeholder="0"
                style={{
                  width: '30%',
                  borderColor: colors.gray_dark,
                  borderWidth: responsiveScreenWidth(0.3),
                  height: responsiveScreenWidth(10),
                  marginTop: responsiveScreenWidth(3),
                  width: responsiveScreenWidth(25),
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setValue2(value2 - 1);
                }}
                style={styles.boxBoderView}>
                <Text
                  style={[
                    styles.titleText,
                    {
                      fontSize: responsiveScreenFontSize(2),
                      alignSelf: 'center',
                      textAlign: 'center',
                      marginTop: responsiveScreenWidth(-0.5),
                    },
                  ]}>
                  {'-'}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '15%',
              }}>
              <Text style={styles.titleText}>{value2}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '15%',
              }}>
              <Text style={styles.titleText}>{'Bull'}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '70%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setValue3(value3 + 1);
                }}
                style={styles.boxBoderView}>
                <Text
                  style={[
                    styles.titleText,
                    {
                      fontSize: responsiveScreenFontSize(2),
                      alignSelf: 'center',
                      textAlign: 'center',
                      marginTop: responsiveScreenWidth(-0.5),
                    },
                  ]}>
                  {'+'}
                </Text>
              </TouchableOpacity>
              <TextInput
                value={value3}
                onChangeText={text => {
                  setValue3(text);
                }}
                placeholder="0"
                style={{
                  width: '30%',
                  borderColor: colors.gray_dark,
                  borderWidth: responsiveScreenWidth(0.3),
                  height: responsiveScreenWidth(10),
                  marginTop: responsiveScreenWidth(3),
                  width: responsiveScreenWidth(25),
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setValue3(value3 - 1);
                }}
                style={styles.boxBoderView}>
                <Text
                  style={[
                    styles.titleText,
                    {
                      fontSize: responsiveScreenFontSize(2),
                      alignSelf: 'center',
                      textAlign: 'center',
                      marginTop: responsiveScreenWidth(-0.5),
                    },
                  ]}>
                  {'-'}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '15%',
              }}>
              <Text style={styles.titleText}>{value3}</Text>
            </View>
          </View>
        </View>
        <LinearGradient
          colors={['#68BBE3', '#0E86D4', '#055C9D']}
          style={styles.btnStyle}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CountPaddockScreen');
            }}>
            <Text style={styles.titleText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  textInputStyle: {
    height: responsiveScreenWidth(15),
    margin: responsiveScreenWidth(1.2),
    width: '80%',
    borderColor: colors.gray,
    borderWidth: 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.BLACK,
    fontWeight: '500',
    margin: responsiveScreenWidth(1),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  saveText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.white,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imageicon: {
    height: responsiveScreenWidth(30),
    width: responsiveScreenWidth(50),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  boxBoderView: {
    height: responsiveScreenWidth(7),
    width: responsiveScreenWidth(10),
    borderColor: colors.gray_dark,
    borderWidth: responsiveScreenWidth(0.4),
    justifyContent: 'center',
    alignItems: 'center',
    margin: responsiveScreenWidth(5),
  },
  boxImage: {
    height: responsiveScreenWidth(4),
    width: responsiveScreenWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowView: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: responsiveScreenWidth(5),
  },
  btnStyle: {
    height: responsiveScreenWidth(13),
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: responsiveScreenWidth(1),
    position: 'absolute',
    bottom: responsiveScreenWidth(10),
  },
  boxView: {
    height: responsiveScreenWidth(35),
    width: responsiveScreenWidth(35),
    borderRadius: responsiveScreenWidth(1),
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: colors.gray_dark,
    borderWidth: responsiveScreenWidth(0.2),
    borderRadius: responsiveScreenWidth(0.5),
    paddingHorizontal: 8,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CountPaddockScreen;
