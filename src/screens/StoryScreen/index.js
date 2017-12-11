import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
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

    const storyId = props.navigation.state.params.storyId;
    const story = props.stories.find(story => story.get('_id') === storyId);

    this.state = {
      story: story,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      title: this.state.story.get('title'),
    });
  }

  renderStoryMedia({ item, index }) {
    return (
        <Image source={{ uri: item.url }} style={styles.storyImage} />
    )
  }

  handleListAnnotations() {
     this.props.navigation.navigate('ListAnnotations', {
      storyId,
     });
  }
  handleCreateAnnotation() {
     this.props.navigation.navigate('AddAnnotation', {
      storyId,
     });
  }

  render() {
    const { story } = this.state;

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
          <Text style={styles.storyBody}>{ story.get('body') }</Text>
          
          <StyledButton
             style={styles.CreateAnnotationButton}
             titleStyle={styles.CreateAnnotationButtonText}
             title="Create Annotation"
             onPress={this.handleCreateAnnotation.bind(story._id)}
          />        
          <StyledButton
             style={styles.ListAnnotationsButton}
             titleStyle={styles.ListAnnotationsButtonText}
             title="List Annotations"
             onPress={this.handleListAnnotations.bind(story._id)}
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

  }
});

export default connect(
  state => ({
    stories: state.stories,
  }), {
    fetchStory,
  }
)(AddStoryScreen);
