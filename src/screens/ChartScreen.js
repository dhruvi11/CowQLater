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
  Dimensions,
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import images from '../res/imageConstant/images';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../utils/Size';
import {BarChart} from 'react-native-chart-kit';

import HeaderAdd from '../component/HeaderAdd';

const ChartScreen = ({navigation}) => {
  const [spinner, setspinner] = useState(false);
  // UseEffect ======================================================================================

  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <StatusBar backgroundColor={'#68BBE3'} barStyle={'dark-content'} />
          <HeaderAdd
            onPress={() => {
              navigation.goBack();
            }}
            headerText={'Charts'}
            rightIcon={images.backArrow}
          />
          <BarChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                },
              ],
            }}
            width={Dimensions.get('window').width - 50}
            height={220}
            yAxisLabel={'Ltr'}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#68BBE3',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              alignSelf:"center",
              justifyContent:"center",
              marginTop:responsiveScreenWidth(10)
            }}
          />
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

  boxView: {
    height: responsiveScreenWidth(35),
    width: responsiveScreenWidth(35),
    borderRadius: responsiveScreenWidth(1),
    // backgroundColor: colors.gray,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default ChartScreen;
