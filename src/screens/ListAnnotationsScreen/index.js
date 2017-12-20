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
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { fetchAnnotations} from '../../actions/annotations';

import { textStyles, colors } from '../../helpers/styles';


const viewport = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

class ListAnnotationsScreen extends Component {
  componentDidMount() {
    this.props.annotations.size === 0 && this.props.fetchAnnotations();
  }

  renderAnnotationItem({ item, index }) {
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
    const { auth, navigation, annotations } = this.props;
    const annotationList = annotations && annotations.toJS();
    return (
      <FlatList
        data={annotationList}
        keyExtractor={(annotation) => annotation._id}
        renderItem={this.renderAnnotationItem.bind(this)}
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

ListAnnotationsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Annotation List',
  }
}

export default connect(
  state => ({
    annotations: state.annotations,
  }), {
    fetchAnnotations,
  }
)(ListAnnotationsScreen);
