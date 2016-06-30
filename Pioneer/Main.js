import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from  'react-native-google-places-autocomplete';
import api from './api.js'　　　
import index from './index.ios.js'
import Setting from  './Setting'

import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Geolocation,
  Image,
  Alert,
} from 'react-native';

var apiKey = 'AIzaSyDYWDEGapBa4gIQBtafipikpKs1kXYbOgg';

// import api from './api.js'
// import Card from './Card.js'
// const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: false,
      isloading: false,
      travelLocationName: '',
      travelLocationLng: '',
      travelLocationLat: '',
      cards: [],
      radius: this.props.radius || 50,
      category: this.props.category || "tourist_destination"
    }
  }

  handleDiscoverSubmit(likeCollection){
    if (this.state.travelLocationLng === "" || this.state.travelLocationLat === "") {
      this.setState({
        error: 'Coordinates not specified',
        isLoading: false,
      }, () => {
        Alert.alert(
          'Error',
          this.state.error + ". Please enter an address."
        )
      })
      return
    }

    this.setState({
      isLoading: true
    });

    api.getPioneerPlaces(this.state.travelLocationLat,this.state.travelLocationLng,this.state.radius, this.state.category).then((response) => {
      var formattedCollection = response.map(function(location){
        var rLocation = {};
        rLocation['title'] = location.name;
        location.description ? rLocation['description'] = location.description : rLocation['description'] = null;
        location.address ? rLocation['address'] = location.address : rLocation['address'] = null;
        if (location.photos){
          rLocation['photos'] = location.photos;
        } else {
           rLocation['photos'] = ["https://www.technodoze.com/wp-content/uploads/2016/03/default-placeholder.png"];
        };
        location.price ? rLocation['price_level'] = location.price : rLocation['price_level'] = null;
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
        api.getGooglePlaces(this.state.travelLocationLat, this.state.travelLocationLng,
        this.state.radius, this.state.category).then((response) => {
          if(response.status === 'ZERO_RESULTS'){
            // this.setState({
            //   error: 'No places found',
            // })
            if (this.state.cards.length >= 1) {
              this.setState({
                error: false,
                travelLocationName: '',
                travelLocationLng: '',
                travelLocationLat: '',
                isLoading: false,
              }); // Closes setState

              this.clearText()

              this.props.navigator.push({
                title: 'CardContainer',
                index: 0,
                // collection: this.state.cards
                collection: this.filterOutLikedCards(this.state.cards,likeCollection),
                otherLikeCollection: likeCollection,
                locationLat: this.state.travelLocationLat,
                locationLng: this.state.travelLocationLng,
              });
            } else {
              this.setState({
                error: 'No places found',
                isLoading: false,
              }, () => {
                Alert.alert(
                  'Error',
                  this.state.error
                )
                this.clearText()
              })
            }
          } else {
            var formattedCollection = response.results.map(function(location){
              var rLocation = {};
              rLocation['title'] = location.name;
              location.vicinity ? rLocation['address'] = location.vicinity : rLocation['address'] = null;
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
              isLoading: false,
            }); // Closes setState

            this.clearText()

            this.props.navigator.push({
              title: 'CardContainer',
              index: 0,
              // collection: this.state.cards
              collection: this.filterOutLikedCards(this.state.cards,likeCollection),
              otherLikeCollection: likeCollection,
              locationLat: this.state.travelLocationLat,
              locationLng: this.state.travelLocationLng,
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
            isloading: false,
            travelLocationName: '',
            travelLocationLng: '',
            travelLocationLat: '',
            // currentLocationLoaded: false
          });
          this.props.navigator.push({
            title: 'CardContainer',
            index: 0,
            collection: this.filterOutLikedCards(this.state.cards,likeCollection),
            otherLikeCollection: likeCollection,
            locationLat: this.state.travelLocationLat,
            locationLng: this.state.travelLocationLng,
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

  clearText() {
    this.refs.searchBar.state.text = ''
  }


  render() {
    var likeCollection = this.props.likeCollection

    var spinnerAnimation = <ActivityIndicator
                              animating={this.state.isLoading}
                              color='white'
                              size='large' style={styles.spinner}>
                            </ActivityIndicator>

    var showSpinner = (this.state.isLoading ? spinnerAnimation : console.log('Fail'))

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
            ref="searchBar"
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
                color: 'black',
                paddingLeft: 40,
              },
              predefinedPlacesDescription: {
                color: 'white',
              },
            }}

            currentLocation={false}
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch'

            GooglePlacesSearchQuery={{
              rankby: 'distance',
              types: 'food',
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}

            predefinedPlaces={[]}
          />
      <View>
      {showSpinner}
      </View>
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
} 

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
  spinner: {
    position: 'absolute',
    left: 183,
    top: 270,
    justifyContent: 'center',

  },
  search:{
    position: 'absolute',
    left: 5,
    top: 100
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'Arial',
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    left: 300,
    top: 106,
    flexDirection: 'row',
    backgroundColor: '#B6DEEC',
    borderRadius: 6,
    opacity: 0.85,
    marginTop: 5,
  },
  button1: {
    position: 'absolute',
    left: 30,
    top: 455,
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
