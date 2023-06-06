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
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import HeaderAdd from '../component/HeaderAdd';
import {EmailData} from '../constants/EmailData';

const RecordSaveScreen = ({navigation}) => {
  const [dateValue, setdateValue] = useState(new Date(Date.now()));
  const [openValue, setOpen] = useState(false);
  const [spinner, setspinner] = useState(false);
  const [mlValue, setmlValue] = useState('');
  // UseEffect ======================================================================================

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
      EmailData(userEmail, 'Recorded Rain Fall', data);
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
      <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#68BBE3'} barStyle={'dark-content'} />
        <Spinner visible={spinner} size={'large'} color="#0E86D4" />
        <HeaderAdd
          onPress={() => {
            navigation.goBack();
          }}
          // onPress1={() => {
          //   navigation.navigate("ChartScreen");
          // }}
          headerText={'Record Data'}
          rightIcon={images.backArrow}
          leftIcon={images.barchart}
        />
        <View style={{paddingTop: responsiveScreenWidth(5)}}>
          <View style={styles.viewRow}>
            <TextInput
              style={styles.textInputStyle}
              value={dateValue}
              placeholder="01/01/2023"
              editable={false}
            />
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setOpen(true);
              }}>
              <Image
                resizeMode="contain"
                source={images.calendar}
                style={styles.imageicon}
              />
            </TouchableOpacity>
          </View>
          <Calendar
            // Customize the appearance of the calendar
            style={{
              borderWidth: 0.5,
              borderColor: 'gray',
              height: 350,
              width: '80%',
              alignSelf: 'center',
              marginTop:responsiveScreenWidth(2)
            }}
            // Specify the current date
            current={new Date(Date.now())}
            // Callback that gets called when the user selects a day
            onDayPress={day => {
              console.log('selected day', day);
              var tempDate = day.day + '/' + day.month + '/' + day.year;
              setdateValue(tempDate);
            }}
            // Mark specific dates as marked
            // markedDates={{
            //   '2023-06-01': {
            //     selected: true,
            //     marked: true,
            //     selectedColor: 'blue',
            //   },
            //   '2023-06-02': {marked: true},
            //   '2023-06-03': {
            //     selected: true,
            //     marked: true,
            //     selectedColor: 'blue',
            //   },
            // }}
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
            <View style={{width: '60%',marginTop:responsiveScreenWidth(5)}}>
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
              mailData();
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
});

export default RecordSaveScreen;
