import React, { useEffect } from 'react';
import { StyleSheet, Image, View,Text } from 'react-native';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LandingScreen'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Splash.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.subtext}>Locals</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: '20%',
    height: '10%',
  },
  subtext:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
  }
});

export default SplashScreen;