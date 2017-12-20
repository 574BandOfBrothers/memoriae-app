import React, { Component } from 'react';
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
import debounce from 'lodash.debounce';

import { fetchStories } from '../../actions/stories';
import api from '../../configs/api';

import { textStyles, colors } from '../../helpers/styles';

import AddIcon from '../../assets/icons/add.png';
import SearchIcon from '../../assets/icons/search.png';

const viewport = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

class StoriesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
    };

    this.handleSearchStories = debounce(this.handleSearchStories, 300);
  }

  componentDidMount() {
    this.searchInputRef.focus();
  }

  handleSearchStories = (query) => {
    if (query.length < 1) {
      this.setState({
        searchResults: [],
      });
      return;
    }

    api.searchStories(query)
    .then((stories) => {
      this.setState({
        searchResults: stories,
      });
    })
    .catch((error) => console.log(error));
  }

  handleClose = () => {
    this.props.navigation.goBack();
  }

  handleSelectStory(storyId) {
    this.props.navigation.navigate('Story', {
      storyId,
    });
  }

  renderStoryItem({ item, index }) {
    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        onPress={this.handleSelectStory.bind(this, item._id)}>
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
    const { searchResults } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Image source={SearchIcon} style={styles.searchInputIcon} />
            <TextInput
              ref={searchInput => this.searchInputRef = searchInput}
              style={styles.searchInput}
              placeholderTextColor={colors.charcoalGrey(0.5)}
              placeholder="Search in stories"
              onChangeText={this.handleSearchStories}
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={searchResults && searchResults[0] &&
                this.handleSelectStory.bind(this, searchResults[0].id)}/>
            <TouchableOpacity onPress={this.handleClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
        { searchResults &&
          <FlatList
            data={searchResults}
            keyExtractor={(story) => story._id}
            renderItem={this.renderStoryItem.bind(this)}
            contentContainerStyle={styles.scrollContainer} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingTop: 25,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    backgroundColor: colors.whiteThree(),
  },
  searchInputContainer: {
    height: 35,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    backgroundColor: colors.warmGrey(0.2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    color: colors.charcoalGrey(),
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
    ...textStyles.regular,
  },
  searchInputIcon: {
    width: 15,
    height: 15,
    tintColor: colors.ocean(),
  },
  closeButtonText: {
    ...textStyles.semiBold,
    color: colors.ocean(),
  },
  scrollContainer: {
    padding: 15,
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

export default StoriesScreen;
