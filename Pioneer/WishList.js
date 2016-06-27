import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
} from 'react-native';

// var apiKey = 'AIzaSyDO4ikGkFBkBem1VzMZuFYJil43jPcVz_8';

class WishList extends Component {
  render(){

    // var referenceLink = this.props.cardInfo.photos ? this.props.cardInfo.photos[0].photo_reference : null
    // var imageLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${referenceLink}&key=${apiKey}`
    //
    return(

      <View style={styles.container}>
        <Text style={styles.welcome}>
          Here goes the wishlist
        </Text>
      </View>

    )
  }
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'white',
   },
   welcome: {
     fontSize: 20,
     textAlign: 'center',
     margin: 10,
   },
   image:{
     height:380,
     width:360,
     borderRadius:50,
     marginTop:100,
     alignSelf: 'center'
   },
});

export default WishList;
