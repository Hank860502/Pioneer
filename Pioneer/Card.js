import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
} from 'react-native';

var apiKey = 'AIzaSyDO4ikGkFBkBem1VzMZuFYJil43jPcVz_8';

class Card extends Component {

  render(){
    var referenceLink = this.props.locationsSet[0].photos[0].photo_reference
    var imageLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${referenceLink}&key=${apiKey}`

    return(
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: imageLink}}/>
        <Text style={styles.welcome}>
          {this.props.locationsSet[0].name}
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
     backgroundColor: '#F5FCFF',
   },
   welcome: {
     fontSize: 20,
     textAlign: 'center',
     margin: 10,
   },
   instructions: {
     textAlign: 'center',
     color: '#333333',
     marginBottom: 5,
   },
   image:{
     height:300,
     width:300,
     borderRadius:50,
     marginTop:5,
     alignSelf: 'center'
   },
});

export default Card;
