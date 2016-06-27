import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from  'react-native-google-places-autocomplete';
import api from './api.js'　　　

import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Geolocation
} from 'react-native';

var apiKey = 'AIzaSyCj9yUP6BgnHAX-qFkkEQDmgce9hB_vpuo';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: Navigator.NavigationBar.Styles.General.NavBarHeight,
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
// import api from './api.js'
// import Card from './Card.js'
// const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
class Main extends Component {
  constructor(){
    super();
    this.state = {
      currentLocationLoaded: false,
      error: false,
      travelLocationName: '',
      travelLocationLng: '',
      travelLocationLat: '',
      cards: []
    }
  }

  handleByLocationSubmit(){
    api.getPlaces(this.state.travelLocationLng,this.state.travelLocationLat)
    .then((response) => {
      if(response.message === 'Not Found'){
        this.setState({
          error: 'No places found',
        })
      } else {
        this.setState({
          cards: response.results,
          error: false,
          travelLocationName: '',
          travelLocationLng: '',
          travelLocationLat: ''
        });
        this.props.navigator.push({
          title: 'CardContainer',
          index: 0,
          collection: this.state.cards
        });
      }
    })
    // update indicator spinner
    // Make API call to Google Geocode Service based on address
    // Set lng/lat
    // OK Make Google Places API call
    // reroute to the cards passing the Google Places information
  }

  handleAroundMeSubmit(){
    api.getPlaces(this.state.travelLocationLng,this.state.travelLocationLat)
    .then((response) => {
      if(response.message === 'Not Found'){
        this.setState({
          error: 'No places found',
        })
      } else {
        this.setState({
          cards: response.results,
          error: false,
          travelLocationName: '',
          travelLocationLng: '',
          travelLocationLat: '',
        });
        this.props.navigator.push({
          title: 'CardContainer',
          index: 0,
          collection: this.state.cards
        });
      }
    })

  }
  updateCoordinates(lng,lat){
    this.setState({
      travelLocationLat: lat,
      travelLocationLng: lng,
    });
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          travelLocationLat: position.coords.latitude,
          travelLocationLng: position.coords.longitude,
        });
        this.handleAroundMeSubmit()
      },
      (error) => {

        // this._disableRowLoaders();
        alert(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }


  render() {

    return (

      <View style={styles.mainContainer}>
      <GooglePlacesAutocomplete
        enableEmptySections = {true}
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          lat = details.geometry.location.lat;
          lng = details.geometry.location.lng;
          desc = data.description;
          // description
          this.updateCoordinates(lng,lat);
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: apiKey,
          language: 'en', // language of the results
          types: '(cities)', // default: 'geocode'
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}

        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food',
        }}


        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        predefinedPlaces={[]}
      />
        {/*<Text style={styles.title}> Find your next destination ! </Text>*/}
        {/*<TextInput
          style={styles.searchInput}
          value={this.state.travelLocation}
          onChangeText={(text) => this.setState({travelLocationName: text})}
        />*/}
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleByLocationSubmit.bind(this)}
          underlayColor='white'>
            <Text style={styles.buttonText}> Discover Now </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.getCurrentLocation.bind(this)}
          underlayColor='white'>
            <Text style={styles.buttonText}> Around me </Text>
        </TouchableHighlight>

      </View>
    )
  }
}



export default Main;
