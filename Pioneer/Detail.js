import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import Card from './Card.js'
console.log(this.props)

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
        <Text>
          {this.props.card.title}
        </Text>

        <Image style={styles.image} source={{uri: this.props.card.photos[0]}} />

        <Text>
          {this.props.card.description}
        </Text>

        {stars}

        <Text>
          {this.props.card.duration}
        </Text>

        <Text>
          {this.props.card.price}
        </Text>

        <Text>
          {this.props.card.types}
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
   image:{
     height:190,
     width:180,
     borderRadius:50,
     marginTop: 10,
     alignSelf: 'center'
   },
});


export default Detail;
