import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Alert,
  Image,
   FlatList,
} from 'react-native';

/*import { createAnnotation } from '../../actions/annotations';*/
import { textStyles, colors } from '../../helpers/styles';



import { Map, List } from 'immutable';
import StyledButton from '../../components/StyledButton';
import StyledTextInput from '../../components/StyledTextInput';
import { ImagePicker } from 'expo';
import ListArrow from '../../assets/icons/listArrow.png';

const renderListImage = ({ item, index}) => (
  <Image
    source={{ uri: item.uri }}
    style={styles.listImage}
    />
)


class AddAnnotationScreen extends Component {
  constructor(props) {
    super(props);
    const selectedText = props.navigation.state.params.selectedText;
    const storyIDParam = props.navigation.state.params.storyIDParam;
    const selection = props.navigation.state.params.selection;
    this.state = {
      text: selectedText,
      storyIDParam:storyIDParam,
      selectionStart:selection.start,
      selectionEnd:selection.end,
      images: List([])
    };

  }

  createContent(){

  }

  handleSelection({ nativeEvent }) {
    const { selection } = nativeEvent;
    this.setState({
      selection,
    })
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
  handleAddAnnotation() {
   /* const { selection } = this.state;
    const selectedText = this.state.text.slice(selection.start, selection.end);*/
    Alert.alert(
      'Status',
      'Annotation is Recorded!'
    )
     this.props.navigation.goBack()
  }
  componentDidMount(){
 /*   Alert.alert(
      'Selected Annotation',
      this.props.navigation.state.params.selectedText
    )
   this.setState({
      text : this.props.nav.selectedText

    })
*/

  }
  render() {
    const { images } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.storyTitle}>{ "AnnotationTarget:"+this.state.storyIDParam}</Text>
        <Text style={styles.storyTitle}>{ "AnnotationTextSelection:"+this.state.text+"["+this.state.selectionStart+","+this.state.selectionEnd+"]"}</Text>

       <StyledTextInput
              wrapperStyle={styles.interactionWrapperMultiline}
              style={styles.textInputMultiline}
              placeholderTextColor={colors.charcoalGrey(0.3)}
              selectionColor={colors.charcoalGrey()}
              returnKeyType="next"
              placeholder="Description"
              multiline={true}
              maxHeight={150}
              />
      <StyledButton
              style={styles.interactionWrapper}
              titleStyle={styles.addImageTitle}
              title="Add Image"
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
             style={styles.CreateAnnotationButton}
             titleStyle={styles.CreateAnnotationButtonText}
             title="Record Annotation"
             onPress={this.handleAddAnnotation.bind(this, null)}
          />
      </View>
    );
  }
}

AddAnnotationScreen.navigationOptions = {
  title: 'Create Annotation',
}

const styles = StyleSheet.create({
  storyTitle: {
    ...textStyles.bold,
    fontSize: 13,
    color: colors.ocean(),
    marginBottom: 10,
    marginLeft:10,
    marginRight:10,
  },
   CreateAnnotationButton: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft:10,
    marginRight:10,
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
    height: 150,
  },
  interactionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.charcoalGrey(0.3),
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft:10,
    marginRight:10,
    justifyContent: 'center',
    height: 45,
  },
  interactionWrapperMultiline: {
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
    borderTopWidth: 1,
    borderLeftWidth:1,
    borderLeftColor:colors.charcoalGrey(1),
    borderRightWidth:1,
    borderRightColor:colors.charcoalGrey(1),
    borderBottomWidth: 1,
    borderBottomColor: colors.charcoalGrey(1),
    borderTopColor: colors.charcoalGrey(1),
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  addImageTitle: {
    ...textStyles.regularBlack,
    color: colors.charcoalGrey(1),
  },
  list: {
    marginTop: 20,
    marginLeft:10,
    marginRight:10,
  },
  listImage: {
    width: 120,
    height: 120,
    marginRight: 10,
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

export default AddAnnotationScreen;
