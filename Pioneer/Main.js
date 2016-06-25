import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import api from './api.js'

// import api from './api.js'
// import Card from './Card.js'

class Main extends Component {
  constructor(){
    super();
    this.state = {
      isLoading: false,
      error: false,
      travelLocationName: '',
      travelLocationLng: '-33.867591',
      travelLocationLat: '151.201196',
    }
  }

  handleByLocationSubmit(){
    this.setState({
      isLoading: true
    });
    api.getPlaces(this.state.travelLocationLng,this.state.travelLocationLat)
    .then((response) => {
      if(response.message === 'Not Found'){
        this.setState({
          error: 'No places found',
          isLoading: false
        })
      } else {
        console.log(response.results);
        this.props.navigator.push({
          title: 'Card',
          passProps: {locationsSet: response.results}
        });
        this.setState({
          isLoading: false,
          error: false,
          travelLocationName: '',
          travelLocationLng: '-33.867591',
          travelLocationLat: '151.201196',
        })
      }
    })
    // update indicator spinner
    // Make API call to Google Geocode Service based on address
    // Set lng/lat
    // OK Make Google Places API call
    // reroute to the cards passing the Google Places information
    console.log(this.state.travelLocationName);
    console.log("Logic for search by location");
  }

  handleAroundMeSubmit(){
    // update indicator spinner
    // Access current location to get lng lat information
    // Make Google Places API call
    // reroute to the cards passing the Google Places information
    console.log('Logic for search around me');
  }

  render() {

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Find your next destination ! </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.travelLocation}
          onChangeText={(text) => this.setState({travelLocationName: text})}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleByLocationSubmit.bind(this)}
          underlayColor='white'>
            <Text style={styles.buttonText}> By location </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleAroundMeSubmit.bind(this)}
          underlayColor='white'>
            <Text style={styles.buttonText}> Around me </Text>
        </TouchableHighlight>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default Main;
