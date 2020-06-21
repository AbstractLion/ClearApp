import React, {useEffect, useState} from 'react';
import {TouchableOpacity, ScrollView, StyleSheet, Text, View} from 'react-native';
import {VictoryChart, VictoryLine, VictoryPie} from 'victory-native';
import { Calendar } from 'react-native-calendars';
import { PieChart } from 'react-native-chart-kit';

const dateMoodData = new Map();

const graphicColor = ['#388087', '#6fb3b8', '#badfe7']; // Colors
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 0 }, { y: 100 }];

const JOY_COLOR = 'orange';
const ANGRY_COLOR = 'red';
const SAD_COLOR = 'lightblue';

const moodCount = {
  joy: 10,
  angry: 5,
  sad: 62
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

export default function AnalyticsScreen() {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    const moodData = Object.keys(moodCount).map(mood => {
      return {
        y: moodCount[mood],
      };
    })
    setGraphicData(moodData);
    // display
  }, []);



  return (
    <ScrollView style={{ flex: 1 }}>
      <VictoryPie
        animate={{ easing: 'exp' }}
        data={graphicData}
        width={250}
        height={250}
        colorScale={graphicColor}
        innerRadius={50}
      />
      <VictoryChart>
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
          ]}
        />
      </VictoryChart>
      <Calendar
        onDayPress={(day) => {console.log(day)}}
        onDayLongPress={(day) => {console.log('selected day', day)}}
        onMonthChange={(month) => {console.log('month changed', month)}}
        hideExtraDays={true}
        firstDay={0}
        hideDayNames={true}
        onPressArrowLeft={substractMonth => substractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
				dayComponent={({ date, state }) => {
				  console.log(date);
				  if (!dateMoodData.has(date.timestamp)) {
				  	dateMoodData.set(date.timestamp, [
              {
                name: '',
                value: Math.random() * 1000,
                color: JOY_COLOR
              },
              {
                name: '',
                value: Math.random() * 100,
                color: SAD_COLOR
              },
              {
                name: '',
                value: Math.random() * 200,
                color: ANGRY_COLOR
              },
            ]);
          }

          return (
            <TouchableOpacity>
              <View style={{
              height: 50,
              width: 50,
              position: 'relative',
              flex: -1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                <View style={StyleSheet.absoluteFill}>
                  <PieChart
                    data={dateMoodData.get(date.timestamp)}
                    width={50}
                    height={50}
                    paddingLeft={12}
                    chartConfig={chartConfig}
                    hasLegend={false}
                    accessor="value"
                    backgroundColor="transparent"
                  />
                </View>
                <View style={{
                  flex: -1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  backgroundColor: 'white',
                  width: 30,
                  height: 30
                }}>
                  <Text>{date.day}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </ScrollView>
  );
}
