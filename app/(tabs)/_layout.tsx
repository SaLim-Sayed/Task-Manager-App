import React from 'react';

import { Text, View } from 'react-native';
import { ImageBackground } from 'expo-image';


export default function TabLayout() {

  return (
    <ImageBackground source={require('@/assets/images/bg.png')} style={{ flex: 1 }}>
    <View className='flex-1 items-center justify-center mt-40'>
      <Text className='text-2xl font-bold text-white'>Tab Layout</Text>
    </View>
    </ImageBackground>
  );
}
