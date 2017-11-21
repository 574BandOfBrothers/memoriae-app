import React, { Component } from 'react';

import { View, TextInput, StyleSheet } from 'react-native';

import { colors, textStyles } from '../../helpers/styles';

class StyledTextInput extends Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    this.textInput.focus();
  }

  render() {
    const { title, style, wrapperStyle} = this.props;
    return (
      <View style={[styles.textInputWrapper, wrapperStyle]}>
        <TextInput
          ref={(input) => { this.textInput = input; }}
          underlineColorAndroid="transparent"
          selectionColor={colors.white()}
          placeholderTextColor={colors.white(0.5)}
          {...this.props}
          style={[styles.textInput, style]} />
      </View>
    );
  }
}

export default StyledTextInput;

const styles = StyleSheet.create({
  textInputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white(0.5),
  },
  textInput: {
    ...textStyles.regularWhite,
    height: 45,
  },
})
