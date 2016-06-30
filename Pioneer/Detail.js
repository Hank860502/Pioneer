import React, { Component } from 'react';
import Card from './Card.js';
import DetailImages from './DetailImages';
import Separator from './Separator';


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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>

        {/*<Image style={styles.image} source={{uri: this.props.card.photos[0]}} />*/}
        <DetailImages photos={card.photos}/>
        <Text style={styles.title}>
        {card.title}
        </Text>
        {/*{stars}*/}
        <Separator />


        <Text style={styles.welcome}>
          {card.description}
        </Text>
        <Separator />

        <Text style={styles.welcome}>
        {card.address}
        </Text>
        <Text style={{color:'blue'}}
        onPress={()=>Linking.openURL(url)}>
        Take Me There
        </Text>
        <Separator />
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
     fontSize: 20,
     textAlign: 'center',
     marginTop: 10,
   },
   image:{
     height:350,
     width:375,
   },
});


export default Detail;
