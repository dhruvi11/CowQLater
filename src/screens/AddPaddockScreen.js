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
import SQLite from 'react-native-sqlite-storage';

//database connection
const db = SQLite.openDatabase(
  {
    name: 'mydb',
    location: 'default',
  },
  () => {
    console.log('Database connected!');
  }, //on success
  error => console.log('Database error', error), //on error
);

const AddPaddockScreen = ({navigation}) => {
  const [paddockNumber, setpaddockNumber] = useState('');
  const [animalCount, setanimalCount] = useState('');
  const [animalAge, setanimalAge] = useState('');
  const [animalName, setanimalName] = useState('');
  // const [paddockCategory2, setpaddockCategory2] = useState('Horse');
  // const [paddockCategory3, setpaddockCategory3] = useState('');
  const [spinner, setspinner] = useState(false);
  // UseEffect ======================================================================================
  const saveAddPaddockInfo = async () => {
    let sql = 'INSERT INTO paddockdetail (name,age,total) VALUES (?,?,?)';
    let params = [animalName,animalAge,animalCount];
    db.executeSql(
      sql,
      params,
      result => {
        Alert.alert('Success', 'Paddock detail updated successfully.', [
          {
            text: 'OK',
            onPress: () => {
              setspinner(false);
              navigation.goBack();
              console.log('OK Pressed');
            },
          },
        ]);
      },
      error => {
        console.log('Create user error', error);
      },
    );
  };
  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <StatusBar backgroundColor={'#68BBE3'} barStyle={'dark-content'} />
          <Spinner visible={spinner} size={'large'} color="#0E86D4" />
          <HeaderAdd
            onPress={() => {
              navigation.goBack();
            }}
            headerText={'Add Paddock'}
            rightIcon={images.backArrow}
          />
          <View style={{paddingTop: responsiveScreenWidth(5)}}>
            <Text style={styles.titleText}>Paddock Number</Text>
            <TextInput
              placeholder="Farm Name"
              style={styles.textInputStyle}
              value={paddockNumber}
              onChangeText={value => {
                console.log(value);
                setpaddockNumber(value);
              }}
            />
            <Text style={styles.titleText}>Category</Text>
            <View>

            </View>
            <Text style={styles.titleText}>Count</Text>
            <TextInput
              placeholder="0"
              style={styles.textInputStyle}
              value={animalCount}
              onChangeText={value => {
                console.log(value);
                setanimalCount(value);
              }}
            />
            <Text style={styles.titleText}>Age</Text>
            <TextInput
              placeholder="0"
              style={styles.textInputStyle}
              value={animalAge}
              onChangeText={value => {
                console.log(value);
                setanimalAge(value);
              }}
            />
          </View>
          <LinearGradient
            colors={['#68BBE3', '#0E86D4', '#055C9D']}
            style={styles.btnStyle}>
            <TouchableOpacity
              onPress={() => {
                if(farmname!=""){
                setspinner(true);
                saveAddPaddockInfo();
            }
              }}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
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

export default AddPaddockScreen;
