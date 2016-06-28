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
  Geolocation,
  Image
} from 'react-native';

var apiKey = 'AIzaSyDYWDEGapBa4gIQBtafipikpKs1kXYbOgg';

// import api from './api.js'
// import Card from './Card.js'
// const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
class Main extends Component {
  constructor(){
    super();
    this.state = {
      // currentLocationLoaded: false,
      error: false,
      travelLocationName: '',
      travelLocationLng: '',
      travelLocationLat: '',
      cards: []
    }
  }

  handleDiscoverSubmit(){
    if (this.state.travelLocationName == 'San Francisco'){
      console.log("Custom Location");
      api.getPioneerPlaces().then((response) => {
        // console.log(response);
        var formattedCollection = response.map(function(location){
          var rLocation = {};
          rLocation['title'] = location.name;
          location.description ? rLocation['description'] = location.description : rLocation['description'] = null;
          if (location.photos){
            rLocation['photos'] = location.photos;
          } else {
             rLocation['photos'] = ["https://www.technodoze.com/wp-content/uploads/2016/03/default-placeholder.png"];
          };
          location.price_level ? rLocation['price_level'] = location.price : rLocation['price_level'] = null;
          location.rating ? rLocation['rating'] = location.rating : rLocation['rating'] = null;
          location.types ? rLocation['types'] = location.types : rLocation['types'] = [];
          rLocation['longitude'] = location.longitude;
          rLocation['latitude'] = location.latitude;
          // console.log(rLocation);
          return rLocation;
        });
        this.setState({
          cards: formattedCollection,
          error: false,
          travelLocationName: '',
          travelLocationLng: '',
          travelLocationLat: '',
          // currentLocationLoaded: false
        });
        this.props.navigator.push({
          title: 'CardContainer',
          index: 0,
          collection: this.state.cards
        });
      })
    } else {
      api.getGooglePlaces(this.state.travelLocationLng,this.state.travelLocationLat)
      .then((response) => {
        if(response.message === 'Not Found'){
          this.setState({
            error: 'No places found',
          })
        } else {
          var formattedCollection = response.results.map(function(location){
            var rLocation = {};
            rLocation['title'] = location.name;
            if (location.photos){
              rLocation['photos'] = location.photos.map(function(photo){
                return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`
                });
            } else {
               rLocation['photos'] = ["https://www.technodoze.com/wp-content/uploads/2016/03/default-placeholder.png"];
            };
            location.price_level ? rLocation['price_level'] = location.price_level : rLocation['price_level'] = null;
            location.rating ? rLocation['rating'] = location.rating : rLocation['rating'] = null;
            location.types ? rLocation['types'] = location.types : rLocation['types'] = [];
            rLocation['longitude'] = location.geometry.location.lng;
            rLocation['latitude'] = location.geometry.location.lat;
            return rLocation;
          });
          this.setState({
            cards: formattedCollection,
            error: false,
            travelLocationName: '',
            travelLocationLng: '',
            travelLocationLat: '',
            // currentLocationLoaded: false
          });
          this.props.navigator.push({
            title: 'CardContainer',
            index: 0,
            collection: this.state.cards
          });
        }
      })
    }
  }
  updateCoordinates(lng,lat){
    this.setState({
      travelLocationLat: lat,
      travelLocationLng: lng,
    });
  }

  getCurrentLocation() {
    console.log("getting currentLocation")
    console.log(this.state)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          travelLocationLat: position.coords.latitude,
          travelLocationLng: position.coords.longitude,
          travelLocationName: 'San Francisco'
          // currentLocationLoaded: false
        }, () => {this.handleDiscoverSubmit()});
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
      <Image style={styles.background} source={require('./index.jpg')}/>
      <TouchableHighlight
      style={styles.button1}
      onPress={this.getCurrentLocation.bind(this)}
      underlayColor= '#1C4A5E' >
      <Text style={styles.buttonText}> Around me </Text>
      </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleDiscoverSubmit.bind(this)}
          underlayColor= '#1C4A5E'>
            <Text style={styles.buttonText}> Discover Now </Text>
        </TouchableHighlight>
      <GooglePlacesAutocomplete
        enableEmptySections = {true}
        placeholder='Where do you want to go?'
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
            color: 'white'
          },
          predefinedPlacesDescription: {
            color: 'white',
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

      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: Navigator.NavigationBar.Styles.General.NavBarHeight,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#1C4A5E',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
  },
  searchInput: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#1C4A5E',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 5,
  },
  button1: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#1C4A5E',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 60,
  },
  backgorund: {
    alignSelf: 'center',
  }
});

export default Main;
