import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';

class AddAnnotationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Lorem ipsum doloasdsadasing elit. Mauris imperdiet eros venenatis diam mattis efficitur. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut et vestibulum diam. Mauris convallis nibh dolor, eget varius ipsum accumsan at. Sed vel gravida massa, ut aliquam sem. Suspendisse ornare sit amet elit id suscipit. Maecenas sodales, metus eu dapibus faucibus, eros urna ullamcorper nulla, nec tristique odio metus vel lorem. Maecenas at nunc non mi posuere pharetra. Phasellus mollis, ipsum in pharetra tincidunt, ligula enim lacinia ipsum, ut vulputate leo nisl nec ante. Praesent vel tempor libero. Etiam cursus ligula vel sem feugiat cursus. Donec ornare nulla in dui pharetra vulputate. Aliquam non pretium velit, vel rhoncus nunc. Etiam blandit non ex in feugiat. Vivamus eleifend sit amet nisi eget tristique.',
      selection: null,
    };
  }
  handleSelection({ nativeEvent }) {
    const { selection } = nativeEvent;
    this.setState({
      selection,
    })
  }

  handleAnnotate() {
    const { selection } = this.state;
    const selectedText = this.state.text.slice(selection.start, selection.end);
    Alert.alert(
      'Selected Annotation',
      selectedText
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.annotateButton}>
          <Button
            title="Lets Annotate"
            onPress={this.handleAnnotate.bind(this)} />
        </View>
        <TextInput
          style={{
            height: 300,
          }}
          multiline={true}
          selectionColor="blue"
          onSelectionChange={this.handleSelection.bind(this)}
          value={this.state.text} />
      </View>
    );
  }
}

AddAnnotationScreen.navigationOptions = {
  title: 'Create Annotation',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotateButton: {
    marginBottom: 50,
  }
});


export default AddAnnotationScreen;
