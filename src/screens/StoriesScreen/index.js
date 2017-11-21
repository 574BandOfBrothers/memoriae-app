import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { fetchStories } from '../../actions/stories';

import { textStyles, colors } from '../../helpers/styles';

import AddIcon from '../../assets/icons/add.png';

const viewport = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

class StoriesScreen extends Component {
  componentDidMount() {
    this.props.stories.size === 0 && this.props.fetchStories();
  }

  renderStoryItem({ item, index }) {
    return (
      <TouchableOpacity style={styles.listItemContainer}>
        { item.media && item.media.length > 0 &&
          <Image source={{ uri: item.media[0].url }} style={styles.listItemImage} />
        }
        <View style={styles.listItemInfoContainer}>
          <Text style={styles.listItemTitle}>{ item.title }</Text>
          <Text style={styles.listItemTime}>{ item.time }</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { auth, navigation, stories } = this.props;
    const storyList = stories && stories.toJS();
    return (
      <FlatList
        data={storyList}
        keyExtractor={(story) => story._id}
        renderItem={this.renderStoryItem.bind(this)}
        contentContainerStyle={styles.scrollContainer}
        style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 15,
  },
  addButton: {
    marginRight: 15,
  },
  addButtonImage: {
    width: 20,
    height: 20,
  },
  listItemContainer: {
    backgroundColor: colors.whiteThree(),
    elevation: 0.5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    borderRadius: 2,
    padding: 8,
    marginBottom: 10,
  },
  listItemImage: {
    width: viewport.width - 46,
    height: 200,
  },
  listItemInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    marginTop: 10,
    ...textStyles.semiBoldBlack,
    marginBottom: 3,
  },
  listItemTime: {
    marginTop: 10,
    ...textStyles.semiBold,
    color: colors.ocean(),
    marginBottom: 3,
  }
});

StoriesScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Memories',
    headerRight: (
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddStory')}>
        <Image source={AddIcon} style={styles.addButtonImage} />
      </TouchableOpacity>
    )
  }
}

export default connect(
  state => ({
    stories: state.stories,
  }), {
    fetchStories,
  }
)(StoriesScreen);
