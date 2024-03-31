import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from '@react-navigation/stack';

import CreditScreen from "./CreditsScreen";
import MainScreen from "./MainScreen";
import ToDoScreen from "./ToDoScreen";
import SlidesScreen from "./SlidesScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import FullScreen from './FullScreen';

function QRCodeComponent() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Loader' component={MainScreen} options={{ title: "QR Code"}} />
      <Stack.Screen name='Screen' component={FullScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default function Page() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='QRCode' component={QRCodeComponent} options={{ headerShown: false }}/>
        <Tab.Screen name='Slides' component={SlidesScreen}/>
        <Tab.Screen name='Checklist' component={ToDoScreen}/>
        <Tab.Screen name='Credits' component={CreditScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}