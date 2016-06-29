import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from  'react-native-google-places-autocomplete';
import api from './api.js'　　　
import index from './index.ios.js'

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
      error: false,
      travelLocationName: '',
      travelLocationLng: '',
      travelLocationLat: '',
      cards: []
    }
  }

  handleDiscoverSubmit(likeCollection){
    api.getPioneerPlaces(this.state.travelLocationLat,this.state.travelLocationLng).then((response) => {
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
        return rLocation;
      }); // Closes Pioneer response mapping

      this.setState({
        cards: formattedCollection,
        error: false,
      }); // Closes setState

      if(this.state.cards.length <= 20){
        api.getGooglePlaces(this.state.travelLocationLat,this.state.travelLocationLng).then((response) => {
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

            this.state.cards = this.state.cards.concat(formattedCollection);

            this.setState({
              error: false,
              travelLocationName: '',
              travelLocationLng: '',
              travelLocationLat: '',
            }); // Closes setState

            this.props.navigator.push({
              title: 'CardContainer',
              index: 0,
              // collection: this.state.cards
              collection: this.filterOutLikedCards(this.state.cards,likeCollection),
              otherLikeCollection: likeCollection
            });
          } // Closes Successful response
        }) // closes Google Places response
      } else{
      api.getGooglePlaces(this.state.travelLocationLat,this.state.travelLocationLng)
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
            collection: this.filterOutLikedCards(this.state.cards,likeCollection),
            otherLikeCollection: likeCollection
          });
        }
      })
    } //Close else if there is not enough places
  }); // Closes getPioneerPlaces
} // Closes handleDiscoverSubmit

  updateCoordinates(lat,lng){
    this.setState({
      travelLocationLat: lat,
      travelLocationLng: lng,
    });
  }

  getCurrentLocation(likeCollection) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          travelLocationLat: position.coords.latitude,
          travelLocationLng: position.coords.longitude,
          travelLocationName: 'San Francisco'
          // currentLocationLoaded: false
        }, () => {this.handleDiscoverSubmit(likeCollection)});
      },
      (error) => {

        // this._disableRowLoaders();
        alert(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  filterOutLikedCards(collection, likedCollection) {
    return collection.filter((card) => {
      return !likedCollection.map((likedCard) => {return likedCard.title}).includes(card.title)
    })
  }


  render() {
    var likeCollection = this.props.likeCollection
    return (

      <View style={styles.mainContainer}>
        <View>
          <Image style={styles.background} source={require('./index1.jpg')}/>
        </View>
      <TouchableHighlight
      style={styles.button1}
      onPress={this.getCurrentLocation.bind(this, likeCollection)}
      underlayColor= '#40B7DB' >
      <Text style={styles.buttonText}> USE CURRENT LOCATION </Text>
      </TouchableHighlight>
      <View style={styles.search}>
        <GooglePlacesAutocomplete
          enableEmptySections = {true}
          placeholder='Enter City, State or Zip Code'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          fetchDetails={true}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            lat = details.geometry.location.lat;
            lng = details.geometry.location.lng;
            desc = data.description;
            // description
            this.updateCoordinates(lat,lng);
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
              color: 'black'
            },
            predefinedPlacesDescription: {
              color: 'red',
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
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleDiscoverSubmit.bind(this, likeCollection)}
          underlayColor= 'white'>
            <Image style={styles.searchIcon} source={require('./search.png')}/>
        </TouchableHighlight>
      </View>
    )
  }
} // Closes the Class

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: Navigator.NavigationBar.Styles.General.NavBarHeight,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
  },
  // searchInput: {
  //   fontSize: 20,
  //   color: 'white',
  //   alignSelf: 'center',
  // },
  search:{
    position: 'absolute',
    left: 20,
    top: 100
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    left: 320,
    top: 419,
    padding: 3,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6,
    opacity: 0.85,
    marginTop: 5,
  },
  button1: {
    position: 'absolute',
    left: 30,
    top: 415,
    height: 45,
    width: 320,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#30ABBD',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 60,
  },
  backgorund: {
    flex: 1,
  }
});

export default Main;
