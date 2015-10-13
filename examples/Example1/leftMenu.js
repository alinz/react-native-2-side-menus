const React = require('react-native');

const {
  Component,
  StyleSheet,
  View
} = React;

class LeftMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'yellow' }}></View>
    );
  }
}

module.exports = LeftMenu;
