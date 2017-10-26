import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  Dimensions,
} from 'react-native';

class AnnotateImagePrototype extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: null,
    };
  }
  handleSelection() {

  }

  handleAnnotate() {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.annotateButton}>
          <Button
            title="Lets Annotate"
            onPress={this.handleAnnotate.bind(this)} />
        </View>
        <View style={styles.imageSelector}>

        </View>
      </View>
    );
  }
}

AnnotateImagePrototype.navigationOptions = {
  title: 'Select Image',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotateButton: {
    marginBottom: 50,
  },
  imageSelector: {
    position: 'relative',
  },
  selector: {
    position: 'absolute',
    zIndex: 2,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.8,
  }
});


export default AnnotateImagePrototype;
