import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Alert, ScrollView,} from 'react-native';
import CheckBox from './CheckBox';
import axios from 'axios';

const App = () => {

  const ButtonConfig = [
  { key: 'filterStatus', label: 'Filtr', url: 'http://172.20.10.2/api/filter' },
  { key: 'light1status', label: 'Lampa 1', url: 'http://172.20.10.2/api/lamp1' },
  { key: 'light2status', label: 'Lampa 2', url: 'http://172.20.10.2/api/lamp2' },
  { key: 'pump1status', label: 'Pompa 1', url: 'http://172.20.10.2/api/pump1' },
  { key: 'pump2status', label: 'Pompa 2', url: 'http://172.20.10.2/api/pump2'  },
  { key: 'pump3status', label: 'Pompa 3', url: 'http://172.20.10.2/api/pump3'  },

];
const statusData = [
  { key: 'temperature', label: 'Temperatura' },
  { key: 'filterStatus', label: 'Filtr' },
  { key: 'light1status', label: 'Lampa 1' },
  { key: 'light2status', label: 'Lampa 2' },
  { key: 'pump1status', label: 'Pompa 1' },
  { key: 'pump2status', label: 'Pompa 2' },
  { key: 'pump3status', label: 'Pompa 3' },
  { key: 'waterRelease', label: 'Wypuszczanie wody' },
];


const simulateGetResponse = () => ({
  temperature: '',
  light1status: false,
  light2status: false,
  pump1status: true,
  pump2status: false,
  pump3status: true,
  filterStatus: false,
  waterRelease: false,
});

const [varius, setVarius] = useState(simulateGetResponse());

const toggleStatus = (key, url) => {
  setVarius((prevVarius) => ({ ...prevVarius, [key]: !prevVarius[key] }));
  // axios({
  //   method: 'post',
  //   url: url,
  //   data: { on: !varius[key] },
  // });

};

const onPressWaterRelease = () => {
  setVarius({ ...varius, waterRelease: true });
  setTimeout(() => {
    setVarius((prevVarius) => ({ ...prevVarius, waterRelease: false }));
  }, 15000);

  // axios({
  //   method: 'post',
  //   url: 'http://172.20.10.2/api/water',
  //   data: {},
  // });
};

// useEffect(() => {
// setTimeout(()=>{
//   setVarius(simulateGetResponse());
// }, 1000)

  // axios({
  //   method: 'get',
  //   url: 'http://172.20.10.2/api/status',
  // }).then((response) => {
  //   setVarius(response.data);
  // });
// }, []);

    return (
<ScrollView style={styles.body}>
<View>
<View style={styles.contaiter}>

      <View>
        <View style={styles.switch_pumps}>
          <Text style={styles.txt_switchPumps}>Włączanie pomp</Text>
        </View>
        <View>
          <CheckBox />
        </View>
      </View>

{/* ///////////////////////View all buttons/////////////////////////////// */}
<View style={styles.view_switches}>
        {ButtonConfig.map((button) => (
            <View
              key={button.key}
              style={{
                backgroundColor: varius[button.key] ? '#2D81FF' : '#FFFFFF',
                borderRadius: 25,
                marginRight: 10,
                marginBottom: 15,
                marginLeft: 20,
              }}
            >
              <Pressable
                android_ripple={{ color: '#EAEEF3' }}
                hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                activeOpacity={0.4}
                onPress={() => toggleStatus(button.key, button.url)}
              >
                <View style={styles.switches_txt}>
                  <Text
                    style={{
                      color: varius[button.key] ? '#FFFFFF' : '#414141',
                    }}
                  >
                    {varius[button.key] ? `✘  Wyłącz ${button.label}` : `✔   Włącz ${button.label}`}
                  </Text>
                </View>
              </Pressable>
            </View>
          ))}
{/* /////////////////////////////////////// WATER RELEASE ////////////////////////// */}
          <View 
          key={'waterRelease'}
            style={{
                backgroundColor: varius.waterRelease ? '#2D81FF' : '#FFFFFF',
                borderRadius: 25,
                marginRight: 10,
                marginBottom: 15,
                marginLeft: 20,
              }}>
          <Pressable
            android_ripple={{ color: '#00f' }}
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            activeOpacity={0.04}
            onPress={onPressWaterRelease}>

              <View style={styles.switches_txt}>
              <Text   
              style={{
                color: varius.waterRelease ? '#FFFFFF' : '#414141',}} >
              {varius.waterRelease ? 'Wypuść wodę' : 'Wypuść wodę'}
            </Text>
            </View>
          </Pressable>
        </View>
  </View>
</View>


      <View style={styles.Status}>
      <Text style={styles.txt_status}>Status</Text>
      </View>

{/* //////////////////////////View STATUS buttons////////////////////////// */}
<View style={styles.responseStatus}>
  {statusData.map((item) => (
    <View style={styles.txtDataStatus} key={item.key}>
      <Text style={styles.labelResponse}>{item.label}: </Text>
      <View>
        {item.key === "temperature" ? (
          <Text
            style={{
              color: varius[item.key] ? '#2D81FF' : '#000000',
              fontSize: 16,
              flexDirection: 'row',
              marginLeft: 1,
              fontWeight: '700',
            }}>
            {varius[item.key]} ℃
          </Text>
        ) : (
          <Text
            style={{
              color: varius[item.key] ? '#2D81FF' : '#000000',
              fontSize: 16,
              flexDirection: 'row',
              marginLeft: 1,
              fontWeight: '700',
            }}>
            {varius[item.key] ? 'włączono' : 'wyłączono'}
          </Text>
        )}
      </View>
    </View>
  ))}
</View>

</View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#EAEEF3',
    flex:1,
  },
  
  switch_pumps: {
    marginBottom: 8,
    marginTop:8,
    alignItems: 'center',
  },
txt_switchPumps: {
    fontSize: 24,
    fontWeight:'700',
    color: '#000000',
  },
  view_switches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center',
  },
  switches_txt: {
    justifyContent:'center',
    alignItems:'center',
    width:160,
    height:40,
  },
  Status:{
    marginLeft: 14,
  },
  txt_status:{
    fontSize:18,
    fontWeight:'700',
    color: '#000000',
  },
  labelResponse:{
    color: '#000000',
    fontSize: 16,
    fontWeight:'400',
  },
  responseStatus:{
    backgroundColor:'#FFFFFF',
    marginTop:18,
    marginLeft:10,
    marginRight:10,
    borderRadius:6, 
    paddingBottom:10,
  },
  txtDataStatus:{
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 15,
  },
});
export default App;
       
     
       
    
      
       
