import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { textStyles, colors } from '../../helpers/styles';


class AnnotationDetailScreen extends Component {
  constructor(props) {
    super(props);

    const { navigation } = props;
    const annotations = navigation.state.params.annotations;
    const storyId = navigation.state.params.storyId;
    const storyBody = navigation.state.params.storyBody;
    const start = navigation.state.params.start;

    this.state = {
      storyId,
      start,
      annotations,
      storyBody,
    };
  }

  renderAnnotationItem({ item, index }) {
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.listItemTitleContainer}>
          <Text style={styles.listItemTitle}>
            { this.state.storyBody.slice(item.target.selector.start, item.target.selector.end) }
          </Text>
        </View>
        <Text style={styles.body}>{ item.body }</Text>
        <View style={styles.creatorContainer}>
          <Text style={styles.creatorName}>{ item.creator.name }</Text>
          <Text style={styles.creatorEmail}>{ item.creator.email }</Text>
        </View>
      </View>
    )
  }

  render() {
    const { annotations } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={annotations.toJS()}
          keyExtractor={(item) => item.id}
          renderItem={this.renderAnnotationItem.bind(this)}
          contentContainerStyle={styles.scrollContainer}
          style={styles.container} />
      </View>
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
    padding: 10,
    marginBottom: 10,
  },
  listItemTitleContainer: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.charcoalGrey(0.15),
    marginBottom: 8,
  },
  listItemTitle: {
    ...textStyles.semiBoldBlack,
    color: colors.ocean(),
    fontSize: 18,
  },
  body: {
    ...textStyles.regular,
    color: colors.charcoalGrey(),
    fontSize: 16,
    minHeight: 50,
  },
  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.charcoalGrey(0.15),
  },
  creatorName: {
    ...textStyles.regular,
    color: colors.charcoalGrey(),
    fontSize: 14,
  },
  creatorEmail: {
    ...textStyles.regular,
    color: colors.ocean(),
    fontSize: 14,
  },
});

AnnotationDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Annotation List',
  }
}

export default AnnotationDetailScreen;
