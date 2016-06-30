import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
  Animated,
  PanResponder,
  Alert,
  Linking,
} from 'react-native';

import clamp from 'clamp';
import Card from './Card.js'

var SWIPE_THRESHOLD = 120;
var alertMessage = "Don't forget to go on the app store to tell us what you think !";
var url = `http://applestore.com`;
var alertMessage2 = "Looks like you love using our app, don't forget to rate it !";


class CardContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      index: this.props.index,
      collection: this.props.collection,
      otherLikeCollection: this.props.otherLikeCollection,
      // newCards: this.props.collection.filter(function(x){
      //   return this.props.otherLikeCollection.indexOf(x) < 0
      // }),
      likeCollection:[],
      dislikeCollection: []
    }
  }
  // uniqueCards(){
  //   if(this.props.otherLikeCollection > 0){
  //     // this.props.collection.filter(function(x){
  //     // return this.props.otherLikeCollection.indexOf(x) < 0
  //   }
  //   }),
  // }
// TO FIX
  _goToNextCard(){
    if(this.state.index < (this.state.collection.length - 1)){
      this.setState({
        index: this.state.index + 1,
      })
      if(this.state.index == 10){
        Alert.alert(
                'Thanks for using our app',
                alertMessage,
                [
                  {text:'Cancel'},
                  {text:'App Store', onPress:()=>Linking.openURL(url)},
                ]
        )
      }
    } else {
      Alert.alert(
              'Love using Pioneer?',
              alertMessage2,
              [
                {text:'Cancel'},
                {text:'App Store', onPress:()=>Linking.openURL(url)},
              ]
      )
      // NOTE: This could probably be eliminated now with the new refactor. - Jason
      this.props.navigator.push({
        title: 'Wishlist',
        likeCollection: this.state.likeCollection,
        dislikeCollection: this.state.dislikeCollection
      });
    }
  }

  componentDidMount() {
    this._animateEntrance();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }
            // let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState.bind(this))
            if (this.state.pan.x._value < 0){
              this.handleDislike();
              //this.handleDislike.bind(this)
            }else{
              this.handleLike();
              //this.handleLike.bind(this)
            }
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    // this._goToNextCard();
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  handleLike(){
    // Note: Could probably eliminate this. - Jason
    this.state.likeCollection.push(this.state.collection[this.state.index]);

    /*
      Note: All this is doing is executing the parent method from Pioneer, and passing the card which will then essentially be pushed.
    */
    this.props.updateLikeCollection(this.state.collection[this.state.index]);
    this._goToNextCard();
  }

  handleDislike(){
    this.state.dislikeCollection.push(this.state.collection[this.state.index])
    this._goToNextCard();
  }

  render(){
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}

    const { collection, index } = this.props;
    const currentCard = collection[index];

    return(
      <View style={styles.container}>
        <Animated.View style={[styles.card, animatedCardStyles]} {...this._panResponder.panHandlers}>
        {/*need to create new array to call on for unique cards*/}
          <Card navigator={this.props.navigator} cardInfo={this.state.collection[this.state.index]}/>
        </Animated.View>

        <Animated.View style={[styles.nope, animatedNopeStyles]}>
          <Image style={styles.yupText} source={require('./bored.png')}/>
        </Animated.View>

        <Animated.View style={[styles.yup, animatedYupStyles]}>
          <Image style={styles.yupText} source={require('./plane.png')}/>

        </Animated.View>
        <TouchableHighlight
          style={styles.buttonLike}
          onPress={this.handleLike.bind(this)}
          underlayColor='white'>
              <Image source={require('./tinder-like.png')}/>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonDislike}
          onPress={this.handleDislike.bind(this)}
          underlayColor='white'>
          <Image source={require('./tinder-nope.png')}/>
        </TouchableHighlight>
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
   buttonLike: {
     position: 'absolute',
     top: 564,
     left: 230,
   },
   buttonDislike: {
    position: 'absolute',
    top: 540,
    left: 75,
   },
   nope: {
     position: 'absolute',
     top: 290,
     left: 120,
   },
   yup: {
     position: 'absolute',
     top: 280,
     left: 120,
   }
});

export default CardContainer;
