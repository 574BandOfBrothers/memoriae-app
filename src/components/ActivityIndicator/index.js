import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Animated,
  Easing,
} from 'react-native';

import ActivityIndicatorImage from '../../assets/images/activityIndicator.png';

class ActivityIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinValue: new Animated.Value(0),
    };
  }

  spinLoop() {
    this.state.spinValue.setValue(0);

    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    }).start((animation) => {
      if (animation.finished) {
        this.spinLoop();
      }
    });
  };

  componentDidMount() {
    this.spinLoop();
  }

  render() {
    const { style, tintColor } = this.props;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <View style={style}>
        <Animated.Image
          style={{
            tintColor: tintColor,
            transform: [{rotate: spin}],
          }}
          source={ActivityIndicatorImage} />
      </View>
    );
  }
}

ActivityIndicator.propTypes = {
  tintColor: PropTypes.string,
}

ActivityIndicator.defaultProps = {
  tintColor: 'white',
}

export default ActivityIndicator;
