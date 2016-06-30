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

  showImages() {
    console.log(this.props.photos)
    var components = this.props.photos.map((photo,index)=>{
    var photo = photo.replace(/^http:\/\//i, 'https://');
      console.log(photo)
      return (
        <View key={index} style={styles.slide2}>
         <Image style={styles.image} source={{uri: photo}} />
        </View>
      )
    })
    return components
  }


  render(){
    var images = this.showImages()
    if(images.length == 1){
      return(
      <Image style={styles.image} source={{uri: this.props.photos[0]}} />
      )
    } else {
    return (
      <Swiper style={styles.wrapper} height={360} showsButtons={true}>
        {images}
         {/*<View style={styles.slide1}>
           <Image style={styles.image} source={{uri: this.props.photos[0]}} />
         </View>
         <View style={styles.slide2}>
          <Image style={styles.image} source={{uri: this.props.photos[1]}} />
         </View>
         <View style={styles.slide3}>
          <Image style={styles.image} source={{uri: this.props.photos[2]}} />
         </View>*/}
      </Swiper>
    )
    }
  }
}
  const styles = StyleSheet.create({
    wrapper: {
     },
     slide: {
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
      height:400,
      width:375,
    },
});

export default DetailImages;
