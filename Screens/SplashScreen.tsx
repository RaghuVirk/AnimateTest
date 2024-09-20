import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing, withRepeat, withSequence, runOnJS, withDelay
} from 'react-native-reanimated';

export const SplashScreen = ({ navigation }) => {

  const [rippleVisible, setRippleVisible] = useState(false);
  const [iconVisible, setIconVisible] = useState(false);
  // Animation values for the icon
  const scale = useSharedValue(3); // Start big
  const rotation = useSharedValue(0); // Initial rotation value
  const opacity = useSharedValue(0); // Initial rotation value
  // Animation values for the icon
  // Shared value controlling the fill animation
  const fillHeight = useSharedValue(0);

  // Icon Component
  const Icon = () => {

    useEffect(() => {

      // Sequence the icon animations: scale down, rotate, then call onAnimationEnd
      // Zoom out and rotate
      scale.value = withDelay(1000,
        withTiming(1, {
          duration: 2000,
          easing: Easing.out(Easing.exp),
        }, (finished) => {
          //if(finished)
          //runOnJS(setRippleVisible)(true)
        }));

      rotation.value = withDelay(1000, withTiming(360, {
        duration: 2500,
        easing: Easing.out(Easing.exp),
      }));

      opacity.value = withDelay(
        1000, // 500ms delay
        withTiming(1, { duration: 1000 })
      );
    }, [iconVisible])

    // Icon animation styles
    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }, // Rotate value in degrees
      ],
      opacity: opacity.value
    }));


    return (
      <Animated.View style={[styles.icon, animatedIconStyle]}>
        {/* Replace with your own icon component or image */}
        <View style={styles.placeholderIcon} >
          <Image
            source={require('../assets/logo.png')}
            style={styles.placeholderIcon}
            resizeMode="contain"
          />
        </View>
      </Animated.View>
    );
  };

  // Icon Component
  const AnimatedBG = ({ isTop }) => {

    // Start animation when component mounts
    // Start animation when component mounts
    useEffect(() => {

      // Animate the fill to 50% over 2 seconds
      fillHeight.value = withTiming(0.5, { duration: 1500 }, (finished) => {
        if (finished)
          runOnJS(setRippleVisible)(true)
      });


    }, []);


    // Top fill animated style
    const topFillStyle = useAnimatedStyle(() => {
      return {
        height: `${fillHeight.value * 100}%`, // 0% to 50% height
      };
    });

    // Bottom fill animated style
    const bottomFillStyle = useAnimatedStyle(() => {
      return {
        height: `${fillHeight.value * 100}%`, // 0% to 50% height
      };
    });

    if (isTop) {
      return (
        <Animated.View style={[styles.fill, styles.topFill, topFillStyle]} />
      );
    } else {
      return (
        <Animated.View style={[styles.fill, styles.bottomFill, bottomFillStyle]} />
      );
    }

  };

  // Animation values for the icon

  const rippleOpacity = useSharedValue(1); // Initial opacity for ripple effect
  // Animation values for ripple effect
  const rippleScale = useSharedValue(0);


  // Ripple animation styles
  const animatedRippleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value,
  }));


  // Start animation when component mounts
  useEffect(() => {
    // Start ripple animation
    rippleScale.value = withDelay(2000,
      withTiming(3, { duration: 1500 }, (finished) => {
        runOnJS(navigation.navigate)('Login')
      }));
    rippleOpacity.value = withDelay(2000,
      withTiming(0, { duration: 1500 }));

  }, []);



  return (

    <View style={styles.container}>
      {/* Top fill view */}
      <AnimatedBG isTop={true} />

      {/* Bottom fill view */}
      <AnimatedBG isTop={false} />

      {/* Ripple effect */}
      {<Animated.View style={[styles.ripple, animatedRippleStyle]} />}
      {/* Icon */}
      {<Icon />}
      {  /*  <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </Animated.View>*/}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust to match the GIF
  },
  icon: {
    width: 100,
    height: 100,
   // backgroundColor: 'blue', // Adjust based on your icon style
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
  },
  ripple: {
    position: 'absolute',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderRadius: Dimensions.get('window').width / 4,
    backgroundColor: 'dodgerblue',
  },
  placeholderIcon: {
    width: 100,
    height: 100,
    //backgroundColor: 'white', // Change or replace with actual icon
    borderRadius: 50,
  },
  fill: {
    width: '100%',
    backgroundColor: '#3498db',
  },
  topFill: {
    position: 'absolute',
    top: 0,
  },
  bottomFill: {
    position: 'absolute',
    bottom: 0,
  },
});
