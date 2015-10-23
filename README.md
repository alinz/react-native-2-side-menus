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
class Example1 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.menu.moreLifeCycles(this.refs.leftMenu, this.refs.rightMenu);


    setTimeout(() => {
      this.refs.menu.openMenu('left');

      setTimeout(() => {
        this.refs.menu.closeMenu();
      }, 2000);

    }, 2000);
  }

  render() {
    return (
      <TwoSideMenus
        ref="menu"
        leftMenu={<Menu ref="leftMenu" color="yellow"/>}
        rightMenu={<Menu ref="rightMenu" color="red"/>}>
        <ScrollView style={{ flex: 1, backgroundColor: 'blue' }}><View style={{ height: 2000 }}></View></ScrollView>
      </TwoSideMenus>
    );
  }
}
```

# Ref Methods

- `openMenu(side)` side can be either `left` or `right`
- `closeMenu()` closes either left or right menu if they are open. There will be no operation if none of them are opened.
- `moreLifeCycles(leftMenuRef, rightMenuRef)` if you need this components calls `menuMightOpen`, `menuDidOpen` and `menuDidClose` in menu component, call this method in both `componentDidMount` and `componentWillReceiveProps` component.
- `enableMenu(side, enable)` enables or disables the menu that you selected. `enable` value indicates the action.

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
