import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text, View, ViewPropTypes, TouchableOpacity, StyleSheet} from 'react-native';

class StyledButton extends Component {
  render() {
    const { onPress, title, style, titleStyle, radius, disabled, shadow, rightItem } = this.props;

    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={[styles.button, (shadow ? styles.shadowStyle : {}), {
          ...(radius ? { borderRadius: radius } : {}),
          ...(disabled === true ? { opacity: 0.5 } : { opacity: 1 }),
        }, style]}>
          <Text style={[styles.title, titleStyle]}>
            {title}
          </Text>
          { rightItem &&
            rightItem
          }
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shadowStyle: {
    elevation: 0.5,
    marginBottom: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  title: {
    flexGrow: 1,
  },
});

StyledButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  radius: PropTypes.number,
  shadow: PropTypes.bool,
  rightItem: PropTypes.node,
}

export default StyledButton;
