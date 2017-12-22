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
import HTMLView from 'react-native-htmlview';

import { Map, List } from 'immutable';

import ActivityIndicator from '../../components/ActivityIndicator';

import { fetchAnnotationsWithTarget } from '../../actions/annotations';

import { textStyles, colors } from '../../helpers/styles';
import StyledButton from '../../components/StyledButton';
import LocationIcon from '../../assets/icons/loc.png';

import config from '../../configs/environment';

const viewport = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const AnnotatedView = ({ text, selectors, onSelectAnnotation }) => {
  let html = '<p>';

  text.split('').forEach((char, index) => {
    const hasEnd = selectors.find(selector => selector.end - 1 === index);
    const hasStart = selectors.find(selector => selector.start === index);

    if (hasStart) {
      html += `<a href="${index}">`;
    }

    html += char;

    if (hasEnd) {
      html += '</a>';
    }
  });

  html += '</p>';

  return <HTMLView value={html} stylesheet={htmlStyles} onLinkPress={onSelectAnnotation}/>
}

class AnnotateHeaderButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDoneVisible: false,
    };
  }

  handleOnPress = () => {
    this.setState({
      isDoneVisible: !this.state.isDoneVisible,
    });

    this.props.onPress && this.props.onPress();
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.headerRightButton}
        onPress={this.handleOnPress}>
        { !this.state.isDoneVisible &&
          <Text style={styles.headerRightButtonText}>Annotate</Text>
        }
        { this.state.isDoneVisible &&
          <Text style={styles.headerRightButtonText}>Done</Text>
        }
      </TouchableOpacity>
    )
  }
}

class StoryScreen extends Component {

  constructor(props) {
    super(props);

    const storyId = props.navigation.state.params.storyId;
    const story = props.stories.find(story => story.get('_id') === storyId);

    this.state = {
      story: story,
      storyBody: story.get('body'),
      selectedText: null,
      selection: null,
      storyId:storyId,
      isAnnotationVisible: true,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      title: this.state.story.get('title'),
      handleToggleAnnotation: this.handleToggleAnnotation,
    });

    const { storyId } = this.state;

    this.props.fetchAnnotationsWithTarget(storyId, `${config.api}/stories/${storyId}`);
  }

  renderStoryMedia({ item, index }) {
    return (
        <Image source={{ uri: item.url }} style={styles.storyImage} />
    )
  }

  handleCreateAnnotation() {
    const { selection, storyBody, storyId } = this.state;
    const selectedText = storyBody.slice(selection.start, selection.end);

    if(selectedText !== '' && selectedText ){
      return this.props.navigation.navigate('AddAnnotation', {
        selectedText,
        storyId,
        selection,
      });
    }

    Alert.alert(
      'Alert!','Please select text to annotate!'
    )
  }

  handleToggleAnnotation = () => {
    this.setState({
      isAnnotationVisible: !this.state.isAnnotationVisible,
    })
  }

  handleViewAnnotationDetail = (start) => {
    const { storyId, storyBody } = this.state;
    const { navigation, annotations } = this.props;
    const storyAnnotations = annotations && storyId && annotations.get(storyId);
    navigation.navigate('AnnotationDetail', {
      storyId,
      annotations: storyAnnotations,
      start,
      storyBody,
    });
  }

  handleSelection({ nativeEvent }) {
    const { selection } = nativeEvent;
    this.setState({
      selection,
    })
  }

  render() {
    const { story, storyId, storyBody, isAnnotationVisible } = this.state;
    const { navigation, annotations } = this.props;
    const medias = story && story.get('media');

    const storyAnnotations = annotations && storyId && annotations.get(storyId);
    let textSelectors = storyAnnotations && storyAnnotations
      .filter(annotation => annotation.getIn(['target', 'selector', 'type']) === 'TextPositionSelector')
      .map((annotation) => {
        return annotation.getIn(['target', 'selector']).toJS();
      });

    textSelectors = textSelectors && textSelectors.toJS();

    return (
      <ScrollView style={styles.container}>
        <View style={styles.storyLocationContainer}>
          <Image style={styles.storyLocationIcon} source={LocationIcon} />
          <Text style={styles.storyLocation} >{ story.get('location') }</Text>
        </View>
        { medias && medias.size > 0 &&
          <FlatList
            data={medias.toJS()}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(media, index) => index}
            renderItem={this.renderStoryMedia.bind(this)}
            style={styles.container} />
        }
        <View style={styles.storyInfoContainer}>
          <Text style={styles.storyTitle}>{ story.get('title') }</Text>
          { !isAnnotationVisible &&
            <TextInput
            style={styles.annotationText}
            value = {this.state.storyBody }
            onSelectionChange={this.handleSelection.bind(this)}
            multiline={true}
            editable={false} />
          }
          { isAnnotationVisible && textSelectors && storyBody &&
            <AnnotatedView
              selectors={textSelectors}
              text={storyBody}
              onSelectAnnotation={this.handleViewAnnotationDetail} />
          }
          { !isAnnotationVisible &&
            <StyledButton
             style={styles.createAnnotationButton}
             titleStyle={styles.createAnnotationButtonText}
             title="Create Annotation"
             onPress={this.handleCreateAnnotation.bind(this, story.get('_id'))} />
          }
        </View>
      </ScrollView>
    );
  }
}

StoryScreen.navigationOptions = props => {
  const { navigation } = props;
  const { title, handleToggleAnnotation } = navigation.state.params;
  return {
    title: title,
    headerRight: (
      <AnnotateHeaderButton onPress={handleToggleAnnotation}/>
    )
  }
}

const htmlStyles = StyleSheet.create({
  p: {
    ...textStyles.semiBold,
    fontSize: 18,
    color: colors.charcoalGrey(),
    marginBottom: 3,
  },
  a: {
    backgroundColor: colors.ocean(),
    color: colors.white(),

  }
});
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
    ...textStyles.regular,
    color:colors.red,
    fontSize: 18,
    color: colors.charcoalGrey(),
    backgroundColor: colors.white(),
    padding: 10,
    paddingTop: 11,
    borderRadius: 8,
  },
  storyTitle: {
    ...textStyles.bold,
    fontSize: 26,
    color: colors.ocean(),
    marginBottom: 20,
  },
  storyLocation: {
    marginTop: 10,
    ...textStyles.semiBold,
    color: colors.ocean(),
    marginBottom: 10,
  },
  storyLocationIcon: {
    width: 30,
    height: 30,
  },
  storyLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  storyBody: {
    ...textStyles.semiBold,
    fontSize: 18,
    color: colors.charcoalGrey(),
    marginBottom: 3,
  },
  headerRightButton: {
    marginRight: 8,
  },
  headerRightButtonText: {
    ...textStyles.semiBold,
    color: colors.ocean(),
    fontSize: 16,
  },
  createAnnotationButton: {
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
  createAnnotationButtonText: {
    ...textStyles.semiBold,
    fontSize: 16,
    textAlign: 'center',
    color: colors.whiteThree(),
  },
});

export default connect(
  state => ({
    stories: state.stories,
    annotations: state.annotations,
  }), {
    fetchAnnotationsWithTarget,
  }
)(StoryScreen);
