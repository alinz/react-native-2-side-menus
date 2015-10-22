const React = require('react-native');

const {
  Component,
  Animated,
  PanResponder,
  View,
  StyleSheet,
  PropTypes,
  Dimensions,
  TouchableWithoutFeedback
} = React;

const deviceScreen = Dimensions.get('window');

const openLeftMenuOffset = deviceScreen.width * 2 / 3;
const openRightMenuOffset = -openLeftMenuOffset;

class TwoSideMenus extends Component {
  constructor(props) {
    super(props);

    this._isOpen = false;
    this._prevValue = 0;
    this._value = new Animated.Value(0);

    this._enabledLeftGesture = true;
    this._enabledRightGesture = true;

    this.state = {
      activatedMenu: ''
    };
  }

  enableLeftGesture(enable) {
    this._enabledLeftGesture = !!enable;
  }

  enableRightGesture(enable) {
    this._enabledRightGesture = !!enable;
  }

  _gesturesAreEnabled() {
    const gestures = this.props.gestures;
    //check if gestures is a fuction.
    if (gestures.call) {
      return gestures();
    }

    return gestures;
  }

  _getSwipeDirection(gestureState) {
    return gestureState.dx >= 0 ? 'fromLeft' : 'fromRight';
  }

  _handleMoveShouldSetPanResponder(e: Object, gestureState: Object) {
    if (this._gesturesAreEnabled()) {
      const direction = this._getSwipeDirection(gestureState);

      if (direction == 'fromLeft' && !this._enabledLeftGesture) {
        return false
      } else if (direction === 'fromRight' && !this._enabledRightGesture) {
        return false;
      }

      const x = Math.round(Math.abs(gestureState.dx));
      const y = Math.round(Math.abs(gestureState.dy));

      return x > this.props.toleranceX && y < this.props.toleranceY;
    }

    return false;
  }

  _handlePanResponderMove(e: Object, gestureState: Object) {
    let value = this._prevValue + gestureState.dx;
    let activatedMenu;

    if (value > 0) {
      activatedMenu = 'left';
      if (value > openLeftMenuOffset) {
        value = openLeftMenuOffset;
      }
    } else {
      activatedMenu = 'right';
      if (value < openRightMenuOffset) {
        value = openRightMenuOffset;
      }
    }

    this._value.setValue(value);
    this.setState({ activatedMenu });
  }

  _handlePanResponderEnd(e: Object, gestureState: Object) {
    const { activatedMenu } = this.state;
    const { leftMenuToggleOffset, rightMenuToggleOffset } = this.props;

    const currentValue = this._value.__getValue();
    const dt = currentValue - this._prevValue;
    const offset = Math.abs(dt);

    if (activatedMenu === 'left') {
      if (dt > 0) {
        if (offset > leftMenuToggleOffset) {
          this.openMenu('left');
        } else {
          this.closeMenu();
        }
      } else {
        if (offset > leftMenuToggleOffset) {
          this.closeMenu();
        } else {
          this.openMenu('left');
        }
      }
    } else if (activatedMenu === 'right') {
      if (dt > 0) {
        if (offset > rightMenuToggleOffset) {
          this.closeMenu();
        } else {
          this.openMenu('right');
        }
      } else {
        if (offset > rightMenuToggleOffset) {
          this.openMenu('right');
        } else {
          this.closeMenu();
        }
      }
    }

    this._prevValue = currentValue;
  }

  _renderContent() {
    let overlay = null;

    if (this._isOpen && this.props.touchToClose) {
      overlay = (
        <TouchableWithoutFeedback onPress={this.closeMenu.bind(this)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      );
    }

    return (
      <Animated.View
        style={[styles.frontView, this.props.animationStyle(this._value)]}
        {...this.responder.panHandlers}>
        {this.props.children}
        {overlay}
      </Animated.View>
    );
  }

  componentWillMount() {
    this.responder = PanResponder.create({
      onStartShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
    });
  }

  openMenu(menu) {
    let openOffset = 0;

    if (menu == 'left') {
      openOffset = this.props.openLeftMenuOffset;
      this.setState({ activatedMenu: menu });
    } else if (menu == 'right') {
      openOffset = this.props.openRightMenuOffset;
      this.setState({ activatedMenu: menu });
    }

    this.props
      .animationFunction(this._value, openOffset)
      .start(() => {
        this._prevValue = this._value.__getValue();
        this._isOpen = true;
        this.forceUpdate();
      });
  }

  closeMenu() {
    let closeOffset = 0;

    this.props
      .animationFunction(this._value, closeOffset)
      .start(() => {
        this._prevValue = this._value.__getValue();
        this._isOpen = false;
        this.forceUpdate();
      });
  }

  toggleMenu(menu) {
    const { activatedMenu } = this.state;

    if (activatedMenu == '') {
      this.openMenu(menu);
    } else if (activatedMenu == menu) {
      this.closeMenu();
    } else {
      this.closeMenu();
      this.openMenu(menu);
    }
  }

  shouldComponentUpdate(newProps, newState) {
    return this.state.activatedMenu !== newState.activatedMenu;
  }

  componentDidUpdate() {
    if (this._isOpen) {
      this.state.activatedMenu = '';
    }
  }

  render() {
    const { activatedMenu } = this.state;

    let menu = null;
    if (activatedMenu === 'left') {
      menu = this.props.leftMenu;
    } else if (activatedMenu === 'right') {
      menu = this.props.rightMenu;
    }

    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          { menu }
        </View>
        { this._renderContent() }
      </View>
    );
  }
}

TwoSideMenus.propTypes = {
  toleranceX: PropTypes.number,
  toleranceY: PropTypes.number,
  animationStyle: PropTypes.func,
  animationFunction: PropTypes.func,
  gestures: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  leftMenu: PropTypes.element,
  rightMenu: PropTypes.element,
  openLeftMenuOffset: PropTypes.number,
  openRightMenuOffset: PropTypes.number,
  leftMenuToggleOffset: PropTypes.number,
  rightMenuToggleOffset: PropTypes.number,
  touchToClose: PropTypes.bool
};

TwoSideMenus.defaultProps = {
  toleranceX: 10,
  toleranceY: 10,
  animationStyle: (value) => {
    return {
      transform: [
        {
          translateX: value,
        }
      ],
    };
  },
  animationFunction: (prop, value) => {
    return Animated.timing(
      prop,
      {
        toValue: value,
        duration: 300,
      }
    );
  },
  gestures: true,
  openLeftMenuOffset: openLeftMenuOffset,
  openRightMenuOffset: openRightMenuOffset,
  leftMenuToggleOffset: 20,
  rightMenuToggleOffset: 20,
  touchToClose: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menu: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    width: deviceScreen.width,
    height: deviceScreen.height,
  },
  frontView: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
    width: deviceScreen.width,
    height: deviceScreen.height,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent'
  }
});

module.exports = TwoSideMenus;
