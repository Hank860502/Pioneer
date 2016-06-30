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
} from 'react-native';

import clamp from 'clamp';

var apiKey = 'AIzaSyDYWDEGapBa4gIQBtafipikpKs1kXYbOgg';

var SWIPE_THRESHOLD = 120;

class Swipe extends Component {

  constructor(props) {
  super(props);
  this.state = {
    pan: new Animated.ValueXY(),
    enter: new Animated.Value(0.5),
  }
}

  _goToNextCard()
    if(this.props.index < (this.props.collection.length - 1)){
      this.props.navigator.push({
        title: 'Card',
        collection: this.props.collection,
        index: this.props.index += 1
      });
    } else {
      this.props.navigator.push({
        title: 'Pioneer'
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
              console.log('Left-swipe');
              this.handleDislike();
              //this.handleDislike.bind(this)
            }else{
              console.log('right-swipe');
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
    console.log('like')
    this._goToNextCard();
  }

  handleDislike(){
    console.log('dislike')
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
    // console.log(this);
    // console.log(this.props);
    if(currentCard.photos){
      var referenceLink = currentCard.photos[0].photo_reference
      var imageLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${referenceLink}&key=${apiKey}`
    } else {
      this._goToNextCard()
    }
    // var referenceLink = currentCard.photos ? currentCard.photos[0].photo_reference : null


    return(

      <View style={styles.container}>
        <Animated.View style={[styles.card, animatedCardStyles]} {...this._panResponder.panHandlers}>
          <Image style={styles.image} source={{uri: imageLink}}/>
          <Text style={styles.welcome}>
            {currentCard.name}
          </Text>
        </Animated.View>

        <Animated.View style={[styles.nope, animatedNopeStyles]}>
          <Text style={styles.nopeText}>Nope!</Text>
        </Animated.View>

        <Animated.View style={[styles.yup, animatedYupStyles]}>
          <Text style={styles.yupText}>Yup!</Text>
        </Animated.View>
        <TouchableHighlight
          style={styles.buttonLike}
          onPress={this.handleLike.bind(this)}
          underlayColor='white'>
            <Text style={styles.buttonText}> Like </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonDislike}
          onPress={this.handleDislike.bind(this)}
          underlayColor='white'>
            <Text style={styles.buttonText}> Dislike </Text>
        </TouchableHighlight>
      </View>

    )
  }
};

const styles = StyleSheet.create({
   buttonText: {
     fontSize: 18,
     color: '#111',
     alignSelf: 'center',
   },
});

export default Swipe;
