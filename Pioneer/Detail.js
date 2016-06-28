import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import Card from './Card.js'

class Detail extends Component {
  starRating(){
    var stars = Math.ceil(parseFloat(this.props.card.rating))
    if (stars==5){
      return <Image source={require("./5Stars.png")} />
    } else if (stars==4){
      return <Image source={require("./4Stars.png")} />
    } else if (stars==3){
      return <Image source={require("./3Stars.png")} />
    } else if (stars==2){
      return <Image source={require("./2Stars.png")} />
    } else if (stars==1){
      return <Image source={require("./1Star.png")} />
    }
  }

  render(){
    var stars = this.starRating()
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>
          {this.props.card.title}
        </Text>

        <Image style={styles.image} source={{uri: this.props.card.photos[0]}} />

        <Text style={styles.welcome}>
          {this.props.card.description}
        </Text>

        {stars}

        <Text style={styles.welcome}>
          {this.props.card.duration}
        </Text>

        <Text style={styles.welcome}>
          {this.props.card.price}
        </Text>
      </View>
    );
  }
}

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
   title: {
     fontSize: 25,
     textAlign: 'center',
     marginTop: 70.
   },
   image:{
     height:380,
     width:360,
     borderRadius:50,
   },
});


export default Detail;
