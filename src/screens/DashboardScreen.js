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
  Modal,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderAdd from '../component/HeaderAdd';
import SQLite from 'react-native-sqlite-storage';
import {all} from 'axios';

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

const DashboardScreen = ({navigation}) => {
  const [spinner, setspinner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  // useEffect ======================================================================================
  useEffect(() => {
    createEmailDetailTable(); //create the table
    createFarmDetailTable(); //create the table
    createPaddockDetailTable(); //create the table
    createRainFallDetailTable(); //create the table
    // createTallyDetailTable(); //create the table
    checkUserExist();
    getFarmItemData();
  });
  // Databse ======================================================================================
  //create table function
  const createEmailDetailTable = () => {
    db.executeSql(
      'CREATE TABLE IF NOT EXISTS emaildetail (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR, name VARCHAR)',
      [],
      result => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Create table error', error);
      },
    );
  };

  //create table function
  const createFarmDetailTable = () => {
    db.executeSql(
      'CREATE TABLE IF NOT EXISTS farmdetail (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR,area VARCHAR)',
      [],
      result => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Create table error', error);
      },
    );
  };
  //create table function
  const createPaddockDetailTable = () => {
    db.executeSql(
      'CREATE TABLE IF NOT EXISTS paddockdetail (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR,age VARCHAR,total VARCHAR)',
      [],
      result => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Create table error', error);
      },
    );
  };
  //create table function
  const createRainFallDetailTable = () => {
    db.executeSql(
      'CREATE TABLE IF NOT EXISTS rainfalldetail (id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR, mililiter VARCHAR,farmname VARCHAR)',
      [],
      result => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Create table error', error);
      },
    );
  };
  // //create table function
  // const createTallyDetailTable = () => {
  //   db.executeSql("CREATE TABLE IF NOT EXISTS emaildetail (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR, name VARCHAR)",[], (result) => {
  //     console.log("Table created successfully");
  //   }, (error) => {
  //     console.log("Create table error", error)
  //   })
  // }

  // Render ======================================================================================
  const checkUserExist = () => {
    // setspinner(true);
    let sql = 'SELECT * FROM emaildetail';
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, resultSet) => {
          var length = resultSet.rows.length;
          for (var i = 0; i < length; i++) {
            console.log(resultSet.rows.item(i));
            setEmail(resultSet.rows.item(i).email);
            global.email = resultSet.rows.item(i).email;
            console.log('global.email', global.email);
            // setspinner(false);
          }
        },
        error => {
          console.log('List user error', error);
          //setspinner(false);
        },
      );
    });
    console.log('global.email', global.email);
  };
  const getFarmItemData = async () => {
    // setspinner(true);
    let sql = 'SELECT * FROM farmdetail';
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, resultSet) => {
          var length = resultSet.rows.length;
          let tempData = [];
          for (var i = 0; i < length; i++) {
            console.log(resultSet.rows.item(i));
            setName(resultSet.rows.item(i).name);
            // tempData.push(resultSet.rows.item(i));
          }
          // setFarmData(tempData);
          // setspinner(false);
        },
        error => {
          console.log('List user error', error);
          // setspinner(false);
        },
      );
    });
  };
  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#68BBE3'} barStyle={'dark-content'} />
        <HeaderAdd
          headerText={'Add Farm'}
          leftIcon={images.PlusIcon}
          onPress1={() => {
            setModalVisible(true);
            // navigation.navigate('SettingScreen');
          }}
          ProfileIconstyle={styles.ProfileIcon}
        />

        <View style={styles.rowView}>
          <TouchableOpacity
            onPress={() => {
              // alert(email)
              if (email === undefined) {
                Alert.alert(
                  'Alert',
                  'Please fill user detail to procced further.',
                  [
                    {
                      text: 'Cancle',
                      onPress: () => {
                        console.log('OK Pressed');
                      },
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.navigate('SettingScreen');
                        console.log('OK Pressed');
                      },
                    },
                  ],
                );
              } else if (name === undefined) {
                Alert.alert(
                  'Alert',
                  'Please fill farm detail to procced further.',
                  [
                    {
                      text: 'Cancle',
                      onPress: () => {
                        console.log('OK Pressed');
                      },
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.navigate('AddFarmScreen');
                        console.log('OK Pressed');
                      },
                    },
                  ],
                );
              } else {
                navigation.navigate('RecordSaveScreen');
              }
            }}
            style={styles.boxView}>
            <Image
              source={images.rainfall}
              resizeMode="contain"
              style={styles.imageicon}
            />
            <Text style={styles.titleText}>Rainfall Recorder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // alert(global.email)
              if (email === undefined) {
                Alert.alert(
                  'Alert',
                  'Please fill user detail to procced further.',
                  [
                    {
                      text: 'Cancle',
                      onPress: () => {
                        console.log('OK Pressed');
                      },
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.navigate('SettingScreen');
                        console.log('OK Pressed');
                      },
                    },
                  ],
                );
              } else if (name === undefined) {
                Alert.alert(
                  'Alert',
                  'Please fill farm detail to procced further.',
                  [
                    {
                      text: 'Cancle',
                      onPress: () => {
                        console.log('OK Pressed');
                      },
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.navigate('AddFarmScreen');
                        console.log('OK Pressed');
                      },
                    },
                  ],
                );
              } else {
                navigation.navigate('FarmTallyScreen');
              }
            }}
            style={styles.boxView}>
            <Image
              source={images.cowtally}
              resizeMode="contain"
              style={styles.imageicon}
            />
            <Text style={styles.titleText}>Tally</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('SettingScreen');
                }}
                style={{flexDirection: 'row'}}>
                <Image
                  source={images.user}
                  resizeMode="contain"
                  style={styles.otherIcon}
                />
                <Text
                  style={[
                    styles.titleText,
                    {marginTop: responsiveScreenFontSize(0)},
                  ]}>
                  Add Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('AddFarmScreen');
                }}
                style={{
                  flexDirection: 'row',
                  marginTop: responsiveScreenWidth(2),
                }}>
                <Image
                  source={images.Location}
                  resizeMode="contain"
                  style={styles.otherIcon}
                />
                <Text
                  style={[
                    styles.titleText,
                    {marginTop: responsiveScreenFontSize(0)},
                  ]}>
                  Add Farm
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('AddPaddockScreen');
                }}
                style={{
                  flexDirection: 'row',
                  marginTop: responsiveScreenWidth(2),
                }}>
                <Image
                  source={images.ridding}
                  resizeMode="contain"
                  style={styles.otherIcon}
                />
                <Text
                  style={[
                    styles.titleText,
                    {marginTop: responsiveScreenFontSize(0)},
                  ]}>
                  Add Paddock
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  centeredView: {
    flex: 1,
    marginTop: responsiveScreenWidth(10),
  },
  modalView: {
    margin: responsiveScreenWidth(5),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: responsiveScreenWidth(5),
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '60%',
  },
  ProfileIcon: {
    height: responsiveScreenWidth(8),
    width: responsiveScreenWidth(8),
    alignSelf: 'center',
    marginTop: responsiveScreenWidth(1),
  },
  otherIcon: {
    height: responsiveScreenWidth(6),
    width: responsiveScreenWidth(6),
    alignSelf: 'center',
    margin: responsiveScreenWidth(1.5),
  },
});

export default DashboardScreen;
