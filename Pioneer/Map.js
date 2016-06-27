import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Geolocation,
  MapView
} from 'react-native';

class MyMap extends Component {
  constructor(){
    super();
    this.state = {
      markers: [{
        latitude: 37.7824,
        longitude: -122.3995,
        title: 'learn surfing'
      }]
    };
  }

  render(){
    return(
      <View>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
          annotations={this.state.markers}
        />
      </View>
    )
  }


}

const styles = StyleSheet.create({
  map: {
    height: 300,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
});

export default MyMap;
