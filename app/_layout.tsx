import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import './global.css';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
 
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
 
  return (
     <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen 
          name="addTask" 
          options={{ 
            title: 'Add Task',
            headerStyle: {
              backgroundColor: '#3b82f6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
      </Stack>
      <StatusBar hidden style="auto" />
      <Toast position='bottom' />
    </ThemeProvider>
   );
}