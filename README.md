# React-Native-2-Side-Menus

Imagine having `react-native-side-menu` component with 2 side menus.


# Demo
<p align="center">
    <img src ="https://raw.githubusercontent.com/alinz/react-native-2-side-menus/master/demo.gif" />
</p>

# installation

```bash
npm install react-native-2-side-menus
```

# Usage Example

create a main component and pass your left and right components

```js
const SideMenu = require('react-native-2-side-menus');

const LeftMenu = require('./leftMenu');
const RightMenu = require('./rightMenu');

class Example1 extends Component {
  constructor(props, context) {
    super(props, context);
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
```

# Ref Methods

- `openMenu(side)` side can be either `left` or `right`
- `closeMenu()` closes either left or right menu if they either of them are open.
- `toggleMenu(side)` toggle the state of open or close on either side.

# Props

- toleranceX: (number) X axis tolerance
- toleranceY: (number) Y axis tolerance
- animationStyle: (func)
- animationFunction: (func)
- gestures: (bool or func)
- leftMenu: (element) left menu component
- rightMenu: (element) right menu component
- openLeftMenuOffset: (number)
- openRightMenuOffset: (number)
- leftMenuToggleOffset: (number)
- rightMenuToggleOffset: (number)
- touchToClose: (bool) Allows for touching the partially hidden view to close the menu

# Thanks

Thanks for amazing code and contributors for `react-native-side-menu` and special thanks to [@Kureev](https://github.com/Kureev) for his work on [react-native-side-menu](https://github.com/Kureev/react-native-side-menu)
