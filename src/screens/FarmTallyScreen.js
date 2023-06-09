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

let tempFarmData;
let tempPaddockData;
const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const FarmTallyScreen = ({navigation}) => {
  const [FarmData, setFarmData] = useState([]);
  const [PaddockData, setPaddockData] = useState([]);
  const [spinner, setspinner] = useState(false);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isAge, setisAge] = useState(false);
  const [isCount, setisCount] = useState(false);

  // UseEffect ======================================================================================
  useEffect(async () => {
    setspinner(true);
    getItemData();
  }, []);
  // UseEffect ======================================================================================
  getItemData = async () => {
    tempFarmData = await AsyncStorage.getItem('farmData');
    tempPaddockData = await AsyncStorage.getItem('paddockData');
    console.log(tempFarmData);
    console.log(tempPaddockData);
    setFarmData(JSON.parse(tempFarmData));
    setPaddockData(JSON.parse(tempPaddockData));
    console.log(FarmData);
    setspinner(false);
  };

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
          headerText={'Tally Farm'}
          rightIcon={images.backArrow}
        />
        <View style={{paddingTop: responsiveScreenWidth(5)}}>
          <Text style={styles.titleText}>Farm Name</Text>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus1 && {borderColor: colors.gray_dark},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={FarmData}
            maxHeight={300}
            labelField="item"
            valueField="value"
            placeholder={!isFocus1 ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value1}
            onFocus={() => setIsFocus1(true)}
            onBlur={() => setIsFocus1(false)}
            onChange={item => {
              setValue1(item.item);
              setIsFocus1(false);
            }}
          />
          <Text style={styles.titleText}>Select Paddock</Text>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus2 && {borderColor: colors.gray_dark},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={PaddockData}
            maxHeight={300}
            labelField="item"
            valueField="value"
            placeholder={!isFocus2 ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value2}
            onFocus={() => setIsFocus2(true)}
            onBlur={() => setIsFocus2(false)}
            onChange={item => {
              setValue2(item.item);
              setIsFocus2(false);
            }}
          />
        </View>
        {value2 != '' ? (
          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View style={{width: '50%', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  setisAge(!isAge);
                }}
                style={styles.boxBoderView}>
                {isAge ? (
                  <Image
                    source={images.rightarrow}
                    resizeMode="contain"
                    style={styles.boxImage}
                  />
                ) : null}
              </TouchableOpacity>
              <Text
                style={[
                  styles.titleText,
                  {
                    marginTop: responsiveScreenWidth(4),
                    marginStart: responsiveScreenWidth(2),
                  },
                ]}>
                Age
              </Text>
            </View>
            <View style={{width: '50%', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  setisCount(!isCount);
                }}
                style={styles.boxBoderView}>
                {isCount ? (
                  <Image
                    source={images.rightarrow}
                    resizeMode="contain"
                    style={styles.boxImage}
                  />
                ) : null}
              </TouchableOpacity>
              <Text
                style={[
                  styles.titleText,
                  {
                    marginTop: responsiveScreenWidth(4),
                    marginStart: responsiveScreenWidth(2),
                  },
                ]}>
                Count
              </Text>
            </View>
          </View>
        ) : null}
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
    width: '80%',
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
    height: responsiveScreenWidth(6),
    width: responsiveScreenWidth(6),
    borderColor: colors.gray_dark,
    borderWidth: responsiveScreenWidth(0.2),
    marginTop: responsiveScreenWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
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

export default FarmTallyScreen;
