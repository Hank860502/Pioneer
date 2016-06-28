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
      lat: 33,
      lng:-137,
      latitudeDelta: 50,
      longitudeDelta: 50,
    }
  }
  componentWillMount(){
    if(this.props.collection.length>0){
      var latitude = this.props.collection.map(function(e){
        return e.latitude
      });
      var longitude = this.props.collection.map(function(e){
        return e.longitude
      });

      var maxLat = Math.max(...latitude);
      var minLat = Math.min(...latitude);
      var maxLng = Math.max(...longitude);
      var minLng = Math.min(...longitude);

      this.state.lat = (maxLat+minLat) /2
      this.state.lng = (maxLng+minLng) /2
      this.state.latitudeDelta = (maxLat - minLat)*1.5 + 0.001
      this.state.longitudeDelta = (maxLng - minLng)*1.5 + 0.001
    };
  }

  render(){
    if(this.props.collection.length>0){
      return(
        <View>
          <MapView
            style={styles.map}
            region={{
              latitude: this.state.lat,
              longitude: this.state.lng,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta,
            }}
            //showsUserLocation={true}
            //followUserLocation={true}
            annotations={this.props.collection}
          />
        </View>
      )
    }else{
      return(
        <View style={styles.rowContainer}>
          <Text style={styles.welcome}>
            START SWIPING
          </Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  map: {
    height: 300,
    margin: 10,
    marginTop:80,
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  rowContainer: {
    padding: 10
  },
});

export default MyMap;
