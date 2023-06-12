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
  Alert,
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
    location: 'default'
  },
  () => { console.log("Database connected!") }, //on success
  error => console.log("Database error", error) //on error
)


const SettingScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [spinner, setspinner] = useState(false);
  // UseEffect ======================================================================================
  useEffect(async () => {
    setspinner(true);
    getItemData();
  }, []);
  // UseEffect ======================================================================================
  const getItemData = async () => {
    let sql = 'SELECT * FROM emaildetail';
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, resultSet) => {
          var length = resultSet.rows.length;
          for (var i = 0; i < length; i++) {
            console.log(resultSet.rows.item(i));
            setEmail(resultSet.rows.item(i).email)
            setName(resultSet.rows.item(i).name)
          }
          setspinner(false);
        },
        error => {
          console.log('List user error', error);
          setspinner(false);
        },
      );
    });

  };

  const savePersonalInfo = async () => {
    let sql = 'INSERT INTO emaildetail (email, name) VALUES (?, ?)';
    let params = [email, name];
    db.executeSql(
      sql,
      params,
      result => {
        navigation.goBack();
        Alert.alert('Success', 'User detail updated successfully.', [
          {text: 'OK', onPress: () => {
            setspinner(false);
            global.email=email
            console.log('OK Pressed')}},
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
      <View style={styles.container}>
        <StatusBar backgroundColor={'#68BBE3'} barStyle={'dark-content'} />
        <Spinner visible={spinner} size={'large'} color="#0E86D4" />
        <HeaderAdd
          onPress={() => {
            navigation.goBack();
          }}
          headerText={'Add Profile'}
          rightIcon={images.backArrow}
        />
        <View style={{paddingTop: responsiveScreenWidth(5)}}>
          <Text style={styles.titleText}>Full Name</Text>
          <TextInput
            placeholder="Full Name"
            style={styles.textInputStyle}
            value={name}
            onChangeText={value => {
              console.log(value);
              setName(value);
            }}
          />
          <Text style={styles.titleText}>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.textInputStyle}
            value={email}
            onChangeText={value => {
              console.log(value);
              setEmail(value);
            }}
          />
        </View>
        <LinearGradient
          colors={['#68BBE3', '#0E86D4', '#055C9D']}
          style={styles.btnStyle}>
          <TouchableOpacity
            onPress={() => {
              setspinner(true);
              savePersonalInfo();
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

export default SettingScreen;
