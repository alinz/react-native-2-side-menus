/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  AppRegistry,
  Component,
  Text,
  View,
  ScrollView
} = React;

var TwoSideMenus = require('./libs');

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  menuMightOpen() {
    console.log('left menu might open');
  }

  menuDidOpen() {
    console.log('left menu did open');
  }

  menuDidClose() {
    console.log('left menu did close');
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: this.props.color, height: 2000 }}/>
    );
  }
}

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


AppRegistry.registerComponent('Example1', () => Example1);
