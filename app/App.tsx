import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SpellList from './components/SpellList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './utils/types';

function SpellDetails() {
  return (
    <View>
      <Text>Spell Details</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator id={undefined} initialRouteName="SpellList">
          <Stack.Screen
            name="SpellList"
            component={SpellList}
            options={{ title: 'All spells' }}
          />
          <Stack.Screen
            name="SpellDetails"
            component={SpellDetails}
            options={{ title: 'Spell Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
