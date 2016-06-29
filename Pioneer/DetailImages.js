'use strict';

import React, { Component } from 'react';
import Swiper from 'react-native-swiper';

import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';




class DetailImages extends Component {


  render(){
    return (
      <Swiper style={styles.wrapper} height={360} showsButtons={true}>
           <View style={styles.slide1}>
             <Image style={styles.image} source={{uri: this.props.photos}} />
           </View>
           <View style={styles.slide2}>
             <Text style={styles.text}>Addtional photos here</Text>
           </View>
           <View style={styles.slide3}>
             <Text style={styles.text}>Addtional photos here</Text>
           </View>
         </Swiper>
    )
  }
}
  const styles = StyleSheet.create({
    wrapper: {
     },
     slide1: {
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#9DD6EB',
     },
     slide2: {
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#97CAE5',
     },
     slide3: {
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#92BBD9',
     },
     text: {
       color: '#fff',
       fontSize: 30,
       fontWeight: 'bold',
    },
    image:{
      height:350,
      width:375,
    },
});

export default DetailImages;
