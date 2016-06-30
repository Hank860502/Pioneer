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
      radius: "",
      newPlace: "",
      showCancel: false,
      showCancel2: false,
    }
  }
  submit(){
    this.props.navigator.push({
      title: 'Pioneer',
      radius: this.state.radius,
      category: this.state.category,
    });
  }
  // toggleCancel(){
  //   this.setState({
  //     showCancel: !this.state.showCancel,
  //   });
  //  }
  //
  // toggleCancel2(){
  //       this.setState({
  //         showCancel2: !this.state.showCancel2,
  //       });
  //   }
  //
  // appendCategoryPicker(){
  //   console.log("click")
  //   if (this.state.showCancel){
  //   return(
  //     <View>
  //       <Picker
  //         selectedValue={this.state.category}
  //         onValueChange={(category) => this.setState({category: category})}>
  //         <Picker.Item label="Popular" value="tourist_destination" />
  //         <Picker.Item label="Restaurant" value="restaurant" />
  //         <Picker.Item label="Aquarium" value="aquarium" />
  //         <Picker.Item label="Casino" value="casino" />
  //         <Picker.Item label="Museum" value="museum" />
  //         <Picker.Item label="Night Life" value="night_club" />
  //         <Picker.Item label="Park" value="park" />
  //         <Picker.Item label="Zoo" value="zoo" />
  //         <Picker.Item label="Attractions" value="place_of_interset" />
  //       </Picker>
  //     </View>)
  //   } else {
  //       return null
  //     }
  // }
  //
  // appendRadiusPicker(){
  //   console.log("click")
  //   if (this.state.showCancel2){
  //   return(
  //     <View><Picker
  //         selectedValue={this.state.radius}
  //         onValueChange={(radius) => this.setState({radius: radius})}>
  //         <Picker.Item label="1 miles" value="10" />
  //         <Picker.Item label="5 miles" value="30" />
  //         <Picker.Item label="10 miles" value="50" />
  //         <Picker.Item label="20 miles" value="20" />
  //         <Picker.Item label="30 miles" value="80" />
  //       </Picker>
  //     </View>
  //       )
  //   } else {
  //       return null
  //     }
  // }
  render(){
    return(
      <View style={styles.container}>
        {/*<Text style={styles.text}>Category: {this.state.category}</Text>
          <TouchableOpacity
              onPress={() => this.toggleCancel()}
              style={styles.button}>
                <Text style={styles.buttonText}>Choose Category</Text>
          </TouchableOpacity>
          {this.appendCategoryPicker()}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.toggleCancel2()}
            style={styles.button2}>
              <Text style={styles.buttonText}>Choose Radius</Text>
          </TouchableOpacity>
          {this.appendRadiusPicker()}
        </View>*/}
        <View>
        <Picker
          selectedValue={this.state.radius}
          onValueChange={(radius) => this.setState({radius: radius})}>
          <Picker.Item label="30 miles" value="30" />
          <Picker.Item label="20 miles" value="20" />
          <Picker.Item label="10 miles" value="10" />
          <Picker.Item label="5 miles" value="5" />
          <Picker.Item label="1 miles" value="1" />
        </Picker>
        </View>
        <Text style={styles.text1}>Radius</Text>
        <Text style={styles.text2}>Categories</Text>
      <View>
        <Picker
          selectedValue={this.state.category}
          onValueChange={(category) => this.setState({category: category})} mode="dialog">
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
      </View>
      <TouchableOpacity
      onPress={()=>this.submit()}
      style={styles.button}
      underlayColor= 'white'>
      <Text style={styles.text}>
        Submit
      </Text>
      </TouchableOpacity>

      </View>
    )
  }
};


const styles = StyleSheet.create({
  container: {
     flex: 1,
     height: 300,
     backgroundColor: 'white',
   },
  text: {
    fontSize: 23,
    color: 'white'
  },
  text1: {
    position: 'absolute',
    top: 98,
    left: 18,
    height: 38,
    fontSize: 23,
  },
  text2: {
    position: 'absolute',
    top: 312,
    left: 10,
    height: 38,
    fontSize: 23,
  },
  button: {
    position: 'absolute',
    left: 150,
    top: 540,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#30ABBD',
    borderRadius: 6,
    opacity: 0.85,
    marginTop: 5,
  },
})

export default Setting;
