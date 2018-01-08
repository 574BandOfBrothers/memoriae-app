import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Keyboard,
  Alert,
} from 'react-native';
import { Map, List } from 'immutable';

import ActivityIndicator from '../../components/ActivityIndicator';

import { fetchStory } from '../../actions/stories';

import { textStyles, colors } from '../../helpers/styles';
import StyledButton from '../../components/StyledButton';
const viewport = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

class AddStoryScreen extends Component {
  constructor(props) {
    super(props);
    /* Added for image annotation*/
    let gesturePosition = {};
    let ImgImgSelectorSize = 75;
    let locationX = 25;
    let locationY = 25;
    /**/
    const storyId = props.navigation.state.params.storyId;
    const story = props.stories.find(story => story.get('_id') === storyId);

    this.state = {
      /* Added for image annotation*/
      containerWidth:0,
      containerHeigth:0,
      gesturePosition: gesturePosition,
      ImgImgSelectorSize : ImgImgSelectorSize,
      locationX: locationX,
      locationY: locationY,
      currentImageIndex:-1,
      imageIndex:[],
      /**/

      story: story,
      storyBody: story.get('body'),
      selectedText: null,
      selection: null,
      storyIDParam:storyId
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      title: this.state.story.get('title'),
    });

    content.
  }

  /* Added for image annotation*/
  componentWillMount() {
      this.gestureResponder = createResponder({
        
        onStartShouldSetResponder: (evt, gesturePosition) => true,
        onResponderGrant: (evt, gesturePosition) => {},
        onResponderTerminationRequest: (evt, gesturePosition) => true,
        onStartShouldSetResponderCapture: (evt, gesturePosition) => true,
        onMoveShouldSetResponder: (evt, gesturePosition) => true,
        onMoveShouldSetResponderCapture: (evt, gesturePosition) => true,
        onResponderTerminate: (evt, gesturePosition) => {},
        onResponderSingleTapConfirmed: (evt, gesturePosition) => {},
        onResponderRelease: (evt, gesturePosition) => this.setState({ gesturePosition: { ...gesturePosition }}),
        onResponderMove: (evt, gesturePosition) => {

          let ImgSelectorSize = this.state.ImgSelectorSize;
         
          if (gesturePosition.pinch && gesturePosition.previousPinch)
            ImgSelectorSize *= (gesturePosition.pinch / gesturePosition.previousPinch)

          let {locationX, locationY, containerWidth, containerHeight} = this.state;

          let xDiff = (gesturePosition.moveX - gesturePosition.previousMoveX);
          let yDiff = (gesturePosition.moveY - gesturePosition.previousMoveY);
          let selectorHalfSize = ImgSelectorSize / 2;

          if(((locationX - selectorHalfSize) + xDiff) > 0 
            && ((locationX + selectorHalfSize) + xDiff) < containerWidth
            && ((locationY - selectorHalfSize) + yDiff) >= 0
            && ((locationY + selectorHalfSize) + yDiff) <= containerHeight) {

            locationX += (gesturePosition.moveX - gesturePosition.previousMoveX);
            locationY += (gesturePosition.moveY - gesturePosition.previousMoveY);          
          }


          this.setState({
            gesturePosition: { ...gesturePosition },
            locationX,
            locationY,
            ImgSelectorSize,
            targetId: storyId
          });
        }
      });
    }


  renderStoryMedia({ item, index }) {
    return (
        <Image source={{ uri: item.url }} style={styles.storyImage} />
    )
  }

  handleListAnnotations(storyId) {
     /*this.props.navigation.navigate('AnnotationList', {
      storyId,
     });
     */
  }

  handleCreateAnnotation() {
    const { selection } = this.state;
    const selectedText  = this.state.storyBody.slice(selection.start, selection.end);
    const storyBody = this.state.storyBody;
    const storyIDParam = this.state.storyIDParam;
    if(selectedText !== '' && selectedText ){
      this.props.navigation.navigate('AddAnnotation', {
        selectedText,
        storyIDParam,
        selection,
    /*else if (imageSelected)
    {
        Create image annotation here

    }*/

      });
    }
    else{
      Alert.alert(
        'Alert!','Please select image or text area to annotate!'
      )
    }
  }
  handleSelection({ nativeEvent }) {
    const { selection } = nativeEvent;
    this.setState({
      selection
    })
  }
  render() {
    const { story } = this.state;
    const { navigation } = this.props;
    const medias = story && story.get('media');

    return (
      <ScrollView style={styles.container}>
        { medias && medias.size > 0 &&
          <FlatList
            data={medias.toJS()}
            keyExtractor={(media, index) => index}
            renderItem={this.renderStoryMedia.bind(this)}
            style={styles.container} />
        }
        <View style={styles.storyInfoContainer}>
          <Text style={styles.storyTitle}>{ story.get('title') }</Text>
          <TextInput
            style={styles.annotationText}
            value = {this.state.storyBody }
            onSelectionChange={this.handleSelection.bind(this)}
            multiline={true}
            editable={false}>
          </TextInput>
          <StyledButton
             style={styles.CreateAnnotationButton}
             titleStyle={styles.CreateAnnotationButtonText}
             title="Create Annotation"
             onPress={this.handleCreateAnnotation.bind(this, story.get('_id'))}
          />
          <StyledButton
             style={styles.ListAnnotationsButton}
             titleStyle={styles.ListAnnotationsButtonText}
             title="List Annotations"
             onPress={this.handleListAnnotations.bind(this, story.get('_id'))}
          />
          <StyledButton
             style={styles.AddImageAnnotation}
             titleStyle={styles.AddImageAnnotationText}
             title="Add Image Annotation"
             onPress={this.handleListAnnotations.bind(this, story.get('_id'))}
          />

        </View>
      </ScrollView>
    );
  }
}

AddStoryScreen.navigationOptions = props => {
  const { navigation } = props;
  const params = navigation.state.params;
  return {
    title: params && params.title,
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storyImage: {
    width: viewport.width,
    height: 250,
  },
  storyInfoContainer: {
    padding: 20,
  },
  annotationText: {
    color:colors.red
  },
  storyTitle: {
    ...textStyles.bold,
    fontSize: 26,
    color: colors.ocean(),
    marginBottom: 20,
  },
  storyBody: {
    ...textStyles.semiBold,
    fontSize: 18,
    color: colors.charcoalGrey(),
    marginBottom: 3,
  },
  CreateAnnotationButton: {
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

    CreateAnnotationButtonText: {
    textAlign: 'center',
    color: colors.whiteThree(),

  },
  ListAnnotationsButton: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    height: 53,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.whiteThree()
  },

    ListAnnotationsButtonText: {
    textAlign: 'center',
    color: colors.ocean(),

  },

  AddImageAnnotation: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    height: 53,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.whiteThree()
  },

    AddImageAnnotationText: {
    textAlign: 'center',
    color: colors.ocean(),

  }
});

export default connect(
  state => ({
    stories: state.stories,
  }), {
    fetchStory,
  }
)(AddStoryScreen);
