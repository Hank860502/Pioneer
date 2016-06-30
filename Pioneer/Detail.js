import React, { Component } from 'react';
import Card from './Card.js';
import DetailImages from './DetailImages';

import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  Linking,
} from 'react-native';

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
    var card = this.props.card;
    var url = `http://maps.apple.com/?daddr=${card.latitude},${card.longitude}`;
    console.log(url);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

        {/*<Image style={styles.image} source={{uri: this.props.card.photos[0]}} />*/}
        <DetailImages photos={card.photos}/>
      <ScrollView>
        <Text style={styles.title}>
        {card.title}
        </Text>
        {stars}

        <Text style={styles.welcome}>
          {card.description}
        </Text>
        <TouchableHighlight onPress={()=>Linking.openURL(url)}>
          <Text style={styles.welcome}>
            {card.address}
          </Text>
        </TouchableHighlight>
        <Text style={styles.welcome}>
          {this.props.card.price}
        </Text>
        </ScrollView>
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
     fontSize: 20,
     textAlign: 'center',
     marginTop: 20,
   },
   image:{
     height:350,
     width:375,
   },
});


export default Detail;
