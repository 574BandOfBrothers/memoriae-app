import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Map, List } from 'immutable';
import DatePicker from 'react-native-datepicker'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImagePicker } from 'expo';

import StyledButton from '../../components/StyledButton';
import StyledTextInput from '../../components/StyledTextInput';
import ActivityIndicator from '../../components/ActivityIndicator';

import { createStory } from '../../actions/stories';
import { clearAddStoryScreen } from '../../actions/addStoryScreen';

import { textStyles, colors } from '../../helpers/styles';

import ListArrow from '../../assets/icons/listArrow.png';

const renderListImage = ({ item, index}) => (
  <Image
    source={{ uri: item.uri }}
    style={styles.listImage}
    />
)

class AddStoryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      story: Map({
        title: '',
        time: '',
        tags: '',
        body: '',
      }),
      images: List([]),
    };
  }

  componentWillUnmount() {
    this.props.clearAddStoryScreen();
  }

  componentWillReceiveProps(nextProps) {
    const { addStoryScreen } = this.props;
    const nextAddStoryScreen = nextProps.addStoryScreen;
    if (addStoryScreen.get('isSaveInProgress')
        && !nextAddStoryScreen.get('isSaveInProgress')
        && nextAddStoryScreen.get('isSaveComplete')) {
      this.props.navigation.goBack();
    }
  }

  handleTextChange(field, value) {
    this.setState({
      story: this.state.story.set(field, value),
    });
  }

  handleSave() {
    this.props.createStory(this.state.story.toJS(), this.state.images.toJS());
  }

  handleImageButtonPress() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    }).then((image) => {
      this.setState({
        images: this.state.images.push(Map(image)),
      });
    });
  }

  render() {
    const { addStoryScreen } = this.props;
    const { images, story } = this.state;
    const isSaveInProgress = addStoryScreen.get('isSaveInProgress');
    return (
      <View style={styles.container} onPress={Keyboard.dismiss}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            contentContainerStyle={StyleSheet.flatten(styles.scrollContainer)}>
            <StyledTextInput
              wrapperStyle={styles.interactionWrapper}
              style={styles.textInput}
              placeholderTextColor={colors.charcoalGrey(0.3)}
              selectionColor={colors.charcoalGrey()}
              returnKeyType="next"
              placeholder="Title for your memory"
              value={story.get('title')}
              onChangeText={this.handleTextChange.bind(this, 'title')}/>

            <StyledTextInput
              wrapperStyle={styles.interactionWrapper}
              style={styles.textInput}
              placeholderTextColor={colors.charcoalGrey(0.3)}
              selectionColor={colors.charcoalGrey()}
              returnKeyType="next"
              placeholder="Date for your memory"
              value={story.get('time')}
              onChangeText={this.handleTextChange.bind(this, 'time')}/>

            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1800-05-01"
              maxDate="2030-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={StyleSheet.flatten(styles.timeInput)}
              //onDateChange={(date) => {this.setState({date: date})}}
              onDateChange={this.handleTextChange.bind(this, 'time')}/>

            <StyledTextInput
              wrapperStyle={styles.interactionWrapperMultiline}
              style={styles.textInputMultiline}
              placeholderTextColor={colors.charcoalGrey(0.3)}
              selectionColor={colors.charcoalGrey()}
              returnKeyType="next"
              placeholder="Write about your memory"
              multiline={true}
              maxHeight={250}
              value={story.get('body')}
              onChangeText={this.handleTextChange.bind(this, 'body')}/>

            <StyledTextInput
              wrapperStyle={styles.interactionWrapper}
              style={styles.textInput}
              placeholderTextColor={colors.charcoalGrey(0.3)}
              selectionColor={colors.charcoalGrey()}
              returnKeyType="next"
              placeholder="Tag your memory"
              value={story.get('tags')}
              onChangeText={this.handleTextChange.bind(this, 'tags')}/>

            <StyledButton
              style={styles.interactionWrapper}
              titleStyle={styles.addImageTitle}
              title="Add image to your memory"
              onPress={this.handleImageButtonPress.bind(this)}
              rightItem={<Image source={ListArrow} />} />

            { images && images.count() > 0 &&
              <FlatList
                style={styles.list}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={images.toJS().reverse()}
                keyExtractor={(item, index) => index}
                renderItem={renderListImage} />
            }

            <StyledButton
              style={styles.saveButton}
              titleStyle={styles.saveButtonText}
              shadow={true}
              disabled={isSaveInProgress}
              title={isSaveInProgress ? 'Loading...' : 'Create Memory' }
              rightItem={isSaveInProgress ? <ActivityIndicator /> : null }
              onPress={this.handleSave.bind(this)}/>

          </KeyboardAwareScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  scrollContainer: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  textInput: {
    color: colors.charcoalGrey(),
  },
  textInputMultiline: {
    color: colors.charcoalGrey(),
    height: 250,
  },
  interactionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.charcoalGrey(0.3),
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    height: 45,
  },
  interactionWrapperMultiline: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.charcoalGrey(0.3),
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  addImageTitle: {
    ...textStyles.regularBlack,
    color: colors.charcoalGrey(0.3),
  },
  list: {
    marginTop: 20,
  },
  listImage: {
    width: 120,
    height: 120,
    marginRight: 10,
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

  timeInput:{
    //dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.charcoalGrey(0.3),
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    height: 45,
  },

});


AddStoryScreen.navigationOptions = {
  title: 'Create A Memory',
}

export default connect(
  state => ({
    addStoryScreen: state.addStoryScreen,
    stories: state.stories,
  }), {
    createStory,
    clearAddStoryScreen,
  }
)(AddStoryScreen);
