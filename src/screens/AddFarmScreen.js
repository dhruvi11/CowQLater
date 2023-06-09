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
import HeaderAdd from '../component/HeaderAdd';

const AddFarmScreen = ({navigation}) => {
  const [farmname, setFarmName] = useState('DC House');
  const [paddockCategory1, setpaddockCategory1] = useState('Cow');
  const [paddockCategory2, setpaddockCategory2] = useState('Horse');
  const [paddockCategory3, setpaddockCategory3] = useState('');
  const [spinner, setspinner] = useState(false);
  const [tempFarmName, settempFarmName] = useState([]);
  const [tempPaddock, settempPaddock] = useState([]);

  // UseEffect ======================================================================================
  useEffect(async () => {
    getItemData();
  }, []);
  // UseEffect ======================================================================================
  const getItemData = async () => {
    let tempFarmName1 = await AsyncStorage.getItem('farmData');
    let tempPaddock1 = await AsyncStorage.getItem('paddockData');

    console.log(tempFarmName1);
    console.log(tempPaddock1);

    if (tempFarmName1 != null) {
      settempFarmName(tempFarmName.concat(tempFarmName1))
      console.log(tempFarmName);
    }

    if (tempPaddock1 != null) {
      settempPaddock(tempPaddock.concat(tempPaddock1))
      console.log(tempPaddock);
    }

    console.log('tempFarmName',tempFarmName);
    console.log("tempPaddock",tempPaddock);
  };
  // UseEffect ======================================================================================
  const saveFarmInfo = async () => {
    console.log('tempPaddock2', tempFarmName);
    console.log('tempPaddock2', tempPaddock);

    if (tempFarmName == null) {
      let data = {};
      data.value = farmname;
      data.item = farmname;

      tempFarmName.push(data);
      await AsyncStorage.setItem('farmData', JSON.stringify(tempFarmName));
    } else {
      let data = {};
      data.value = farmname;
      data.item = farmname;

      tempFarmName.push(data);
      await AsyncStorage.setItem('farmData', JSON.stringify(tempFarmName));
      console.log('tempFarmName11', tempFarmName);
    }

    if (tempPaddock == null) {
      let data = {};
      data.value = paddockCategory1;
      data.item = paddockCategory1;
      tempPaddock.push(data);
      settempPaddock(tempPaddock);
    } else {
      let data1 = {};
      data1.value = paddockCategory1;
      data1.item = paddockCategory1;

      tempPaddock.push(data1);
      settempPaddock(tempPaddock);

      let data2 = {};
      data2.value = paddockCategory2;
      data2.item = paddockCategory2;

      tempPaddock.push(data2);
      settempPaddock(tempPaddock);

      let data3 = {};
      data3.value = paddockCategory2;
      data3.item = paddockCategory2;

      tempPaddock.push(data2);
      settempPaddock(tempPaddock);
      console.log('tempPaddock11', tempPaddock);
    }
    console.log('tempPaddock2', tempFarmName);
    console.log('tempPaddock2', tempPaddock);
    await AsyncStorage.setItem('farmData', JSON.stringify(tempFarmName));
    await AsyncStorage.setItem('paddockData', JSON.stringify(tempPaddock));
    alert('Data updated');
    setspinner(false);
    navigation.goBack();
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
          headerText={'Setting'}
          rightIcon={images.backArrow}
        />
        <View style={{paddingTop: responsiveScreenWidth(5)}}>
          <Text style={styles.titleText}>Farm Name</Text>
          <TextInput
            placeholder="Farm Name"
            style={styles.textInputStyle}
            value={farmname}
            onChangeText={value => {
              console.log(value);
              setFarmName(value);
            }}
          />
          <Text style={styles.titleText}>Paddock Category1</Text>
          <TextInput
            placeholder="Paddock Category1"
            style={styles.textInputStyle}
            value={paddockCategory1}
            onChangeText={value => {
              console.log(value);
              setpaddockCategory1(value);
            }}
          />
          <Text style={styles.titleText}>Paddock Category2</Text>
          <TextInput
            placeholder="Paddock Category2"
            style={styles.textInputStyle}
            value={paddockCategory2}
            onChangeText={value => {
              console.log(value);
              setpaddockCategory2(value);
            }}
          />
          <Text style={styles.titleText}>Paddock Category3</Text>
          <TextInput
            placeholder="Paddock Category3"
            style={styles.textInputStyle}
            value={paddockCategory3}
            onChangeText={value => {
              console.log(value);
              setpaddockCategory3(value);
            }}
          />
        </View>
        <LinearGradient
          colors={['#68BBE3', '#0E86D4', '#055C9D']}
          style={styles.btnStyle}>
          <TouchableOpacity
            onPress={() => {
              setspinner(true);
              saveFarmInfo();
            }}>
            <Text style={styles.saveText}>Save</Text>
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
});

export default AddFarmScreen;
