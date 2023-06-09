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
  const [modalVisible, setModalVisible] = useState(false);
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FarmTallyScreen');
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
                  Add Farm/Poddock
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
