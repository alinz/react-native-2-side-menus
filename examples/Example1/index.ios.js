const React = require('react-native');

const {
  AppRegistry,
  Component,
  View,
  Text
} = React;

const SideMenu = require('react-native-2-side-menus');

const LeftMenu = require('./leftMenu');
const RightMenu = require('./rightMenu');

class Example1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SideMenu
        leftMenu={<LeftMenu/>}
        rightMenu={<RightMenu/>}
        touchToClose={true}>
        <View style={{backgroundColor: 'blue', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Content</Text>
        </View>
      </SideMenu>
    );
  }
}

AppRegistry.registerComponent('Example1', () => Example1);
