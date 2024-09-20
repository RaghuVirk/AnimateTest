// LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you have installed react-native-vector-icons
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const LoginScreen = () => {

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ username: '', password: '' });

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const textOpacity = useSharedValue(0); // Initial opacity for the text
  const textPosition = useSharedValue(-20); // Initial position (above its final position)


  const handleLogin = () => {
   
    // Reset errors
    setError({ username: '', password: '' });

    // Validate username
    if (username.trim() === '') {
      setError((prev) => ({ ...prev, username: 'Username is required' }));
    }

    // Validate password
    if (password.trim() === '') {
      setError((prev) => ({ ...prev, password: 'Password is required' }));
    } else if (password.length < 6) {
      setError((prev) => ({ ...prev, password: 'Password must be at least 6 characters long' }));
    }

    // If no errors, proceed with login
    if (username && password.length >= 6) {
      // Perform login action here
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    
  };

  useEffect(() => {
    // Animation to move and scale the icon
    translateX.value = withTiming(-SCREEN_WIDTH / 2 -30, {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });2
    translateY.value = withTiming(-SCREEN_WIDTH / 3 , {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });
    scale.value = withTiming(0.5, {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });
    // Text animation
    textOpacity.value = withDelay(
      1600, // Wait for the icon animation to finish
      withTiming(1, { duration: 600 }) // Fade in
    );

    textPosition.value = withDelay(
      1600, // Start moving down after icon movement
      withTiming(0, { duration: 600 }) // Move down
    );
  }, []);

  // Animated style for the icon
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ translateY: textPosition.value }],
    };
  });
  return (
    <View style={styles.container}>
      {/* Logo at the top 
      <View style={styles.logoContainer}>
        <Icon name="chatbubble-ellipses-outline" size={50} color="#4CAF50" />
      </View>

      {/* Welcome Text 
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.subText}>Log in to continue</Text>
      */}
     <View style={styles.logoContainer}>
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
          <Image
            source={require('../assets/logo_wt.png')}
            //style={styles.placeholderIcon}
            resizeMode="contain"
          />
        </Animated.View>
        </View>
        {/* Text */}
        <Animated.Text style={[styles.animatedText, animatedTextStyle]}>
          Welcome Back!
        </Animated.Text>
        <Animated.Text style={[styles.animatedSubText, animatedTextStyle]}>
         Log in to continue
        </Animated.Text>
        
      
      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          onChangeText={setUsername}
        />
        {error.username ? <Text style={styles.errorText}>{error.username}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          onChangeText={setPassword}
        />
        {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
      {loading ? <ActivityIndicator /> :<Text style={styles.loginButtonText}>Log in</Text>}
      </TouchableOpacity>

      {/* Footer Text */}
      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>New user? </Text>
        <TouchableOpacity>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },      
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#A9A9A9',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#4CAF50',
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: '#A9A9A9',
  },
  signUpText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  }, 
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    width: '100%'
  },
  animatedSubText: {
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    width: '100%'
  },
});
