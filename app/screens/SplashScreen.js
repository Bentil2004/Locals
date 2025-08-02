import React, { useEffect } from 'react';
import { StyleSheet, Image, View, Text, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            const role = docSnap.data().role;
            if (role === "jobSeeker") {
              navigation.reset({ index: 0, routes: [{ name: "BottomTabNavigator" }] });
            } else if (role === "provider") 
{
              navigation.reset({ index: 0, routes: [{ name: "ProviderBottomTabs" }] });
            }
          } else {
            navigation.reset({ index: 0, routes: [{ name: "LandingScreen" }] });
          }
        } catch (error) {
          console.error(error);
          navigation.reset({ index: 0, routes: [{ name: "LandingScreen" }] });
        }
      } else {
        navigation.reset({ index: 0, routes: [{ name: "LandingScreen" }] });
      }
    });
  
    return () => unsubscribe();
  }, [navigation]);
  

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Splash.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.subtext}>Locals</Text>
      <ActivityIndicator size="medium" color="#159D73" style={{ marginTop: 20 }} />
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
  subtext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
  },
});

export default SplashScreen;
