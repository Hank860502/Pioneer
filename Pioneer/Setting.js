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
    }
  }
  render(){
    return(
      <View>
        <Text style={styles.text}>This is the category: {this.state.category}</Text>
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
        <Text>This is the second: {this.state.category}</Text>
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
  }
})

export default Setting;
