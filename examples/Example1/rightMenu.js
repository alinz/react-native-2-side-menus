const React = require('react-native');

const {
  Component,
  StyleSheet,
  View
} = React;

class RigthMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'green' }}></View>
    );
  }
}

module.exports = RigthMenu;
