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
  Dimensions
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

const screenWidth = Dimensions.get('window').width;
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#fff',
  backgroundGradientToOpacity: 0.5,

  color: (opacity = 1) => `#023047`,
  labelColor: (opacity = 1) => `#333`,
  strokeWidth: 2,

  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
};
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
            width={responsiveScreenWidth(80)}
            height={responsiveScreenWidth(50)}
            data={data}
            yAxisLabel="$"
            chartConfig={chartConfig}
            // style={styles.boxView}
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
