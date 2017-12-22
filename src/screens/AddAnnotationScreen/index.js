import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Alert,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { createAnnotationRequest } from '../../actions/annotations';
import { textStyles, colors } from '../../helpers/styles';
import StyledButton from '../../components/StyledButton';
import StyledTextInput from '../../components/StyledTextInput';

import config from '../../configs/environment';

class AddAnnotationScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const selectedText = navigation.state.params.selectedText;
    const storyId = navigation.state.params.storyId;
    const selection = navigation.state.params.selection;

    this.state = {
      targetText: selectedText,
      storyId:storyId,
      selectionStart:selection.start,
      selectionEnd:selection.end,
      annotationBody: '',
    };
  }

  handleAddAnnotation = () => {
    const { storyId, selectionStart, selectionEnd, annotationBody } = this.state;
    const { auth, createAnnotationRequest, navigation } = this.props;

    createAnnotationRequest(storyId, {
      target: {
        source: `${config.api}/stories/${storyId}`,
        selector: {
          type: 'TextPositionSelector',
          start: selectionStart,
          end: selectionEnd,
        },
      },
      body: annotationBody,
      creator: {
        id: `${config.api}/users/${auth.get('slug')}`,
        type: 'Person',
        name: auth.get('name'),
        email: auth.get('email'),
      },
    })
    .then(() => {
      navigation.goBack();
    });
  }

  handleTextChange = (value) => {
    this.setState({
      annotationBody: value,
    });
  }

  render() {

    const { targetText, annotationBody } = this.state;
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        style={styles.container}
        contentContainerStyle={StyleSheet.flatten(styles.scrollContainer)}>

        <Text style={styles.title}>You are annotating</Text>
        <Text style={styles.targetText}>{targetText}</Text>

        <Text style={styles.addBodyText}>Add Body</Text>
        <StyledTextInput
           wrapperStyle={styles.interactionWrapperMultiline}
           value={annotationBody}
           style={styles.textInputMultiline}
           placeholderTextColor={colors.charcoalGrey(0.3)}
           selectionColor={colors.charcoalGrey()}
           returnKeyType="done"
           placeholder="Type here"
           onChangeText={this.handleTextChange}
           multiline={true}
           maxHeight={250} />

        <StyledButton
           style={styles.saveButton}
           titleStyle={styles.saveButtonText}
           title="Create Annotation"
           onPress={this.handleAddAnnotation} />
      </KeyboardAwareScrollView>
    );
  }
}

AddAnnotationScreen.navigationOptions = {
  title: 'Create Annotation',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  scrollContainer: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    ...textStyles.semiBold,
    color: colors.charcoalGrey(),
    fontSize: 16,
    marginBottom: 8,
  },
  targetText: {
    ...textStyles.semiBold,
    color: colors.ocean(),
    fontSize: 18,
    marginBottom: 25,
  },
  addBodyText: {
    ...textStyles.semiBold,
    color: colors.charcoalGrey(),
    fontSize: 16,
  },
  textInputMultiline: {
    ...textStyles.regular,
    color: colors.charcoalGrey(),
    height: 150,
  },
  interactionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.charcoalGrey(0.3),
    justifyContent: 'center',
    height: 45,
  },
  interactionWrapperMultiline: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.charcoalGrey(0.3),
    justifyContent: 'center',
  },
  saveButton: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    height: 53,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.ocean(),
  },
  saveButtonText: {
    ...textStyles.semiBoldWhite,
  },
});

export default connect(
  state => ({
    auth: state.auth,
    addAnnotationScreen: state.addAnnotationScreen,
  }), {
    createAnnotationRequest,
    AddAnnotationScreen,
  }
)(AddAnnotationScreen);
