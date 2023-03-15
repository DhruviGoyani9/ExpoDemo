import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Image, Modal, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import * as Calendar from 'expo-calendar';
import CalendarPicker from 'react-native-calendar-picker';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import AppNavigator from './src/Navigation/AppNavigator';



export default function App() {


  return (
    <AppNavigator />

  );
}

const styles = StyleSheet.create({

});
