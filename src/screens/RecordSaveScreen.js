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
  Linking,
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
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import HeaderAdd from '../component/HeaderAdd';
import {EmailData} from '../constants/EmailData';
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

const RecordSaveScreen = ({navigation}) => {
  const [dateValue, setdateValue] = useState(new Date(Date.now()));
  const [tempDate, settempDate] = useState(new Date(Date.now()));
  const [openValue, setOpen] = useState(false);
  const [spinner, setspinner] = useState(false);
  const [mlValue, setmlValue] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [FarmData, setFarmData] = useState([]);
  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  // UseEffect ======================================================================================
  useEffect(async () => {
    setspinner(true);
    getFarmItemData();
    getEmailItemData();
  }, [getFarmItemData, getEmailItemData]);
  // UseEffect ======================================================================================
  const getEmailItemData = async () => {
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
            setName(resultSet.rows.item(i).name);
            setspinner(false);
          }
        },
        error => {
          console.log('List user error', error);
          setspinner(false);
        },
      );
    });
  };
  const getDateItemData = async date => {
    setspinner(true);
    console.log('date', date);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM rainfalldetail where date = ?',
        [date],
        (tx, results) => {
          setspinner(false);
          var len = results.rows.length;
          console.log('len', len);
          console.log('len',  results.rows.item(0));
          if (len > 0 & results.rows.item(0).farmname===FarmData) {
            console.log(results.rows.item(0));
            setmlValue(results.rows.item(0).mililiter);
            setdateValue(date);
          } else {
            setmlValue('0');
            // setdateValue()
          }
        },
      );
    });
  };
  const getFarmItemData = async () => {
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
            // setName(resultSet.rows.item(i).name)
            tempData.push(resultSet.rows.item(i));
          }
          setFarmData(tempData);
          setspinner(false);
        },
        error => {
          console.log('List user error', error);
          setspinner(false);
        },
      );
    });
  };
  const saveRainFallData = async () => {
    let sql =
      'INSERT INTO rainfalldetail (date, mililiter,farmname) VALUES (?, ?,?)';
    let params = [dateValue, mlValue, value1];
    db.executeSql(
      sql,
      params,
      result => {
        setspinner(false);
        Alert.alert('Success', 'Rainfall detail updated successfully.', [
          {
            text: 'Send Mail',
            onPress: () => {
              console.log('OK Pressed');
              mailData();
            },
          },
          {
            text: 'OK',
            onPress: () => {
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

  const mailData = async () => {
    let userName = await AsyncStorage.getItem('userName');
    let userEmail = await AsyncStorage.getItem('userEmail');
    console.log(userEmail);
    console.log(userName);
    if ((userEmail === '') & (userName === '')) {
      Alert.alert('Alert', 'Need to add user data to proceed', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('SettingScreen');
          },
        },
      ]);
    } else {
      let data =
        'Hello there,\n\n Here the rainfall recorded on date ' +
        dateValue +
        ' ' +
        mlValue +
        ' in mili-liter.';
      EmailData(email, 'Recorded Rain Fall', data);
    }
    setspinner(false);
  };
  const onChange = (event, value) => {
    console.log(value);
    setdateValue(value);
    console.log(dateValue);
    setdateValue(new Date(Date.now()));
    setmlValue('');
    setOpen(false);
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
            onPress1={() => {
              navigation.navigate('ChartScreen');
            }}
            headerText={'Record Data'}
            rightIcon={images.backArrow}
            leftIcon={images.barchart}
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
              labelField="name"
              valueField="name"
              placeholder={!isFocus1 ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value1}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={item => {
                setValue1(item.name);
                setIsFocus1(false);
              }}
            />
            <Calendar
              // Customize the appearance of the calendar
              style={{
                borderWidth: 0.5,
                borderColor: 'gray',
                height: 350,
                width: '80%',
                alignSelf: 'center',
                marginTop: responsiveScreenWidth(2),
              }}
              // date={dateValue}
              // Specify the current date
              current={new Date(Date.now())}
              // Callback that gets called when the user selects a day
              onDayPress={day => {
                console.log('selected day', day);
                settempDate(day.dateString);
                var tempDate = day.day + '/' + day.month + '/' + day.year;
                setdateValue(tempDate);
                getDateItemData(tempDate);
              }}
              // Mark specific dates as marked
              markedDates={{
                [tempDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'orange',
                },
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                justifyContent: 'space-around',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <View style={{width: '40%'}}>
                <Text style={styles.titleText}>Rainfall in ML</Text>
              </View>
              <View style={{width: '60%', marginTop: responsiveScreenWidth(5)}}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="0"
                  style={[
                    styles.textInputStyle,
                    {
                      width: '60%',
                      alignSelf: 'flex-start',
                      borderColor: colors.gray,
                      borderWidth: 1,
                    },
                  ]}
                  value={mlValue}
                  onChangeText={value => {
                    console.log(value);
                    setmlValue(value);
                  }}
                />
              </View>
            </View>
          </View>
          <LinearGradient
            colors={['#68BBE3', '#0E86D4', '#055C9D']}
            style={styles.btnStyle}>
            <TouchableOpacity
              onPress={() => {
                setspinner(true);
                saveRainFallData();
              }}
              style={{}}>
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
  viewRow: {
    height: responsiveScreenWidth(15),
    margin: responsiveScreenWidth(1.2),
    width: '80%',
    borderColor: colors.gray,
    borderWidth: 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textInputStyle: {
    height: responsiveScreenWidth(13),
    margin: responsiveScreenWidth(1.2),
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(2),
  },
  titleText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.BLACK,
    fontWeight: 'bold',
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
  dateText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.BLACK,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imageicon: {
    height: responsiveScreenWidth(6),
    width: responsiveScreenWidth(7),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rowView: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    height: responsiveScreenWidth(13),
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: responsiveScreenWidth(1),
    marginTop: responsiveScreenWidth(10),
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
  datePickerStyle: {
    height: responsiveScreenWidth(15),
    margin: responsiveScreenWidth(1.2),
    marginTop: responsiveScreenWidth(2),
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
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

export default RecordSaveScreen;
