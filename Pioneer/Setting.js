import React, { Component } from 'react';


import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
  TextInput,
  Picker,
} from 'react-native';

class Setting extends Component {
  constructor(props){
    super(props);
    this.state = {
      category: "",
      radius: "", // destination lat lng
      newPlace: "",
      showCancel: false,
    }
  }

  toggleCancel(){
       this.setState({
           showCancel: !this.state.showCancel,

       });
       console.log(this.state.showCancel)
   }

  appendCategoryPicker(){
    console.log("click")
    if (this.state.showCancel){
    return(
      <View>
        <Picker
          selectedValue={this.state.category}
          onValueChange={(category) => this.setState({category: category})}>
          <Picker.Item label="Popular" value="tourist_destination" />
          <Picker.Item label="Restaurant" value="restaurant" />
          <Picker.Item label="Aquarium" value="aquarium" />
          <Picker.Item label="Casino" value="casino" />
          <Picker.Item label="Museum" value="museum" />
          <Picker.Item label="Night Life" value="night_club" />
          <Picker.Item label="Park" value="park" />
          <Picker.Item label="Zoo" value="zoo" />
          <Picker.Item label="Attractions" value="place_of_interset" />
        </Picker>
      </View>)
    } else {
        return null
      }
  }
  render(){
    return(
      <View>
        <Text style={styles.text}>Category: {this.state.category}</Text>
        <TouchableOpacity
            onPress={() => this.toggleCancel()}
            style={styles.button}>
              <Text style={styles.buttonText}>Choose Category</Text>
        </TouchableOpacity>
        {this.appendCategoryPicker()}
        <TouchableOpacity
            onPress={() => this.toggleCancel()}
            style={styles.button}>
              <Text style={styles.buttonText}>Choose Radius</Text>
        </TouchableOpacity>
        {this.appendRadiusPicker()}
      </View>
    )
  }
};


const styles = StyleSheet.create({
  text: {
    marginTop: 100,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    fontSize: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    left: 30,
    top: 290,
    height: 45,
    width: 320,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#30ABBD',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 60,
  },
})

export default Setting;
