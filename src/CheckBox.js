import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

// const basePost = 'https://webhook.site/f2c69319-f3c0-45d2-b088-9e3e426c57b4';
// const baseGet = 'http://192.168.0.110/api/info';

// Symulacja odpowiedzi GET
const simulateGetResponse = () => ({
  monday: false,
  tuesday: true,
  wednesday: false,
  thursday: false,
  friday: true,
  saturday: false,
  sunday: false,
});

export default function Checkbox() {
  const [state, setState] = useState(simulateGetResponse());

  const DaysofWeek = [
    { key: 'monday', label: 'Pn' },
    { key: 'tuesday', label: 'Wt' },
    { key: 'wednesday', label: 'Śr' },
    { key: 'thursday', label: 'Cz' },
    { key: 'friday', label: 'Pt' },
    { key: 'saturday', label: 'Sb' },
    { key: 'sunday', label: 'Nd' },
  ];

  const ChoiceDays = (index) => {
    setState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const SavePressHandler = () => {
    const checkedDays = [
      state.sunday,
      state.monday,
      state.tuesday,
      state.wednesday,
      state.thursday,
      state.friday,
      state.saturday,
    ];
    Alert.alert(JSON.stringify(checkedDays));

    // axios({
    //   method: 'post',
    //   url: basePost,
    //   data: { checkedDays },
    // });
  };

  // useEffect(() => {
    // Symulacja żądania GET
    // setTimeout(() => {
    //   setState(simulateGetResponse());
    // }, 1000); // Opóźnienie symulacji żądania GET

    // Pobranie danych przy użyciu Axios (teraz zasymulowane)
    // axios({
    //   method: 'get',
    //   url: baseGet,
    // }).then((response) => {
    //   setState(response.data);
    // });
  // }, []);

  return (
    <View>
      <View style={styles.buttonAndText}>
        <View>
          <Text style={styles.text_daysOfWeek}>Dni tygodnia</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={SavePressHandler}
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
          >
            <Text style={styles.text_button}>Zapisz dni</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.checkbox}>
          {DaysofWeek.map((day) => (
            <View
              key={day.key}
              style={{
                backgroundColor: state[day.key] ? '#2D81FF' : '#F9F9F9',
                height: 45,
                width: 45,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => ChoiceDays(day.key)}
                hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                activeOpacity={0.4}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: state[day.key] ? '#FFFFFF' : '#414141',
                    textAlign: 'center',
                  }}
                >
                  {day.label}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFFFFF',
    borderRadius:6,
    height:65,
    marginBottom:20,
    marginLeft:10,
    marginRight:10,

  },

  checkbox:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    height: 65,
  },


text_button:{
  color:'#2D81FF',
  fontWeight:'bold',
  fontSize: 16,
  
  
},
  buttonAndText:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:18,
    marginLeft: 14,
    marginRight: 16,
  },
  text_daysOfWeek:{
    color:'#000000',
    fontSize:18,
    fontWeight:'700'
  },




});