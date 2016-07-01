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
  TouchableOpacity,
  Linking,
} from 'react-native';

class Detail extends Component {
  starRating(){
    var stars = Math.ceil(parseFloat(this.props.card.rating))
    if (stars==5){
      return <Image source={require("./assets/star_icons/5Stars.png")} />
    } else if (stars==4){
      return <Image source={require("./assets/star_icons/4Stars.png")} />
    } else if (stars==3){
      return <Image source={require("./assets/star_icons/3Stars.png")} />
    } else if (stars==2){
      return <Image source={require("./assets/star_icons/2Stars.png")} />
    } else if (stars==1){
      return <Image source={require("./assets/star_icons/1Star.png")} />
    }
  }

  priceIndication(){
    var price = "";
    if(this.props.card.price_level){
      for(i = 0 ; i < this.props.card.price_level ; i++){
        price += "$";
      }
    }
    return price;
  }

  typeIcon(type,index){
    switch(type) {
      case "aquarium":
        return (
          <View key={index}>
            <Image style={styles.type} source={require("./assets/type_icons/iconAquarium.png")} />
          </View>
        )
        break;
      case "bar":
        return (
          <View key={index}>
          <Image style={styles.type} source={require("./assets/type_icons/iconBar.png")} />
          </View>
        )
        break;
      case "casino":
        return (
          <View key={index}>
          <Image style={styles.type} source={require("./assets/type_icons/iconCasino.png")} />
          </View>
        )
        break;
      case "museum":
        return (
          <View key={index}>
          <Image style={styles.type} source={require("./assets/type_icons/iconMuseum.png")} />
          </View>
        )
        break;
      case "night_club":
        return (
          <View key={index}>
          <Image style={styles.type} source={require("./assets/type_icons/iconNightClub.png")} />
          </View>
        )
        break;
      case "park":
        return (
          <View key={index}>
          <Image style={styles.type} source={require("./assets/type_icons/iconPark.png")} />
          </View>
        )
        break;
      case "restaurant":
        return (
          <View key={index}>
          <Image style={styles.type} source={require("./assets/type_icons/iconRestaurant.png")} />
          </View>
        )
        break;
      case "zoo":
        return (
          <View key={index}>
          <Image style={styles.type} source={require("./assets/type_icons/iconZoo.png")} />
          </View>
        )
        break;
      case "place_of_interest":
        return (
          <View key={index}>
          <Image style={styles.type} source={require("./assets/type_icons/iconPlaceOfInterest.png")} />
          </View>
        )
        break;
      case "tourist_destination":
        return (
          <View key={index}>
            <Image style={styles.type} source={require("./assets/type_icons/iconTourism.png")} />
          </View>
        )
        break;
      default:
        return (
          <View key={index}>
            <Image style={styles.type} source={require("./assets/type_icons/iconDefault.png")} />
          </View>
        )
    }
  }

  renderTypes(){
    var types = this.props.card.types
    var typeIcons = types.map((category,index) => {
      return this.typeIcon(category,index)
    });
    return typeIcons
  }

  render(){
    var placeTypes = this.renderTypes();
    var stars = this.starRating()
    var card = this.props.card;
    var priceIndication = this.priceIndication()
    var destinationUrl = `http://maps.apple.com/?daddr=${card.latitude},${card.longitude}`;
    return (
      <ScrollView style={styles.container}>
        <DetailImages photos={card.photos}/>

        <View style={styles.overview}>
          <Text style={styles.title}>
            {card.title}
          </Text>

          <Text style={styles.description}>
          {card.description}
          </Text>

          {stars}
        </View>

        <Separator />

        <View style={styles.flexed}>
          {placeTypes}
        </View>

        <View style={styles.overview}>
          <Text style={styles.description}>
            {priceIndication}
          </Text>
        </View>

        <Separator />

        <View style={styles.overview}>
          <Text style={styles.description}>
          {card.address}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={()=>Linking.openURL(destinationUrl)}
            underlayColor= 'white'>
            <Text style={{color:'white'}}>
              Take Me There
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
     backgroundColor: 'white',
   },
   overview: {
      padding: 10,
      alignItems: 'center',
    },
   title: {
     fontSize: 20,
     textAlign: 'center',
     marginTop: 10,
   },
   description: {
     fontSize: 16,
     textAlign: 'center',
    //  margin: 10,
   },
   image:{
     height:350,
     width:375,
   },
   type: {
      height: 25,
      width: 25,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,

    },
    flexed: {
      flexDirection: 'row',
      alignSelf: 'center',
     },
   button: {
     padding: 10,
     flexDirection: 'row',
     backgroundColor: '#30ABBD',
     borderRadius: 6,
     opacity: 0.85,
     marginTop: 5,
   },
});


export default Detail;
