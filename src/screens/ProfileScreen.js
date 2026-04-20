import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({onLogout}) {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  
      const pickImage = async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted'){
              Alert.alert('Izin Ditolak', 'Izinka akses galeri untuk memilih foto')
              return;
          }
          const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: [ 'images' ],
              allowsEditing: true,
              aspect: [1,1],
              quality: 0.7
          });
          if (!result.canceled){
              setProfileImage(result.assets[0].uri);
          }
      };
  
      const takePhoto = async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') return;
          const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1,1],
              quality: 0.7,
          });
          if (!result.canceled) setProfileImage(result.assets[0].uri);
      };
  
      const showOptions = () => Alert.alert('FOto Profile', 'Pilih sumber foto', [
          {text: 'Kamera', onPress: takePhoto},
          { text: 'Galeri', onPress: pickImage},
          { text: 'Batal', style: 'cancel'}
      ])

  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem('userProfile');
      if (data) {
        setUser(JSON.parse(data));
      }
    };
    loadUser();
  }, []);

const logout = async () => {
    Alert.alert('Logout', 'Yakin ingin keluar?', [
        { text: 'Batal', style: 'cancel' },
        { 
            text: 'Logout', 
            style: 'destructive',
            onPress: async () => {
                await AsyncStorage.removeItem('userProfile');
                onLogout(); // ← ini yang trigger pindah screen
            }
        }
    ]);
};

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

         <TouchableOpacity onPress={showOptions}>
            {profileImage 
                ? <Image source={{uri:profileImage}} style={styles.avatar} />
                : <View style={styles.placeholder}><Text>Pilih Foto</Text></View>
            }
        </TouchableOpacity>

      <Text style={styles.item}>Nama: {user.name}</Text>
      <Text style={styles.item}>Email: {user.email}</Text>
      <Text style={styles.item}>Phone: {user.phone}</Text>

      <TouchableOpacity style={styles.btn} onPress={logout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
  btn: {
    marginTop: 30,
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
      placeholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
});