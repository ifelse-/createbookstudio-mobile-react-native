import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from "expo-router";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./screens/tabScreens/home";
import { useColorScheme } from "nativewind";
import HomeIcon from "./icons/HomeIcon";
import NotesIcon from "./icons/NotesIcon";
import PlusIcon from "./icons/PlusIcon";
import PricingIcon from "./icons/PricingIcon";
import MenuIcon from "./icons/MenuIcon";
import Create from "./screens/tabScreens/create";
import Menu from "./screens/tabScreens/menu";
import Notes from "./screens/tabScreens/notes";
import Pricing from "./screens/tabScreens/pricing";
import { serverURL } from "./Constants";
import axios from "axios";

const Tab = createBottomTabNavigator();

export default function Index() {

  const { colorScheme } = useColorScheme();

  useFocusEffect(
    useCallback(() => {
      checkFirstRun();
    }, [])
  );

  useEffect(() => {
    checkIfPaid();
  }, []);

  const checkFirstRun = async () => {
    const isFirstRun = await AsyncStorage.getItem('first');
    if (isFirstRun === null) {
      await AsyncStorage.setItem('first', 'false');
      await AsyncStorage.setItem('dark', 'false');
      await AsyncStorage.setItem('auth', 'false');
      router.replace('/screens/welcome')
    } else {
      const auth = await AsyncStorage.getItem('auth');
      if (auth !== 'true') {
        router.replace('/screens/welcome')
      }
    }
  };

  const shouldRunCommandToday = async () => {

    const lastRunDate = await AsyncStorage.getItem('lastRunDate');
    if (!lastRunDate) {
      const today = new Date();
      await AsyncStorage.setItem('lastRunDate', today.toDateString());
      return true;
    }

    const lastRun = new Date(lastRunDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return lastRun < today;
  };

  const runCommand = async () => {
    let uid = await AsyncStorage.getItem('uid');
    const postURL = serverURL + `/api/status?uid=${uid}`;
    const response = await axios.get(postURL);
    if (response.data.success) {
      await AsyncStorage.setItem('type', 'free');
    }

    const today = new Date();
    await AsyncStorage.setItem('lastRunDate', today.toDateString());
  };

  const onAppOpen = async () => {
    const shouldRun = await shouldRunCommandToday();
    if (shouldRun) {
      await runCommand();
    }
  };

  async function checkIfPaid() {
    const isFirstRun = await AsyncStorage.getItem('first');
    if (isFirstRun !== null) {
      const auth = await AsyncStorage.getItem('auth');
      if (auth === 'true') {
        const typeUser = await AsyncStorage.getItem('type');
        if (typeUser !== 'free') {
          onAppOpen();
        }
      }
    }
  }

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { height: Platform.OS === 'ios' ? 80 : 56, paddingBottom: Platform.OS === 'ios' ? 12 : 0, paddingHorizontal: 5, backgroundColor: colorScheme === 'dark' ? "#01020A" : 'white', paddingTop: Platform.OS === 'ios' ? 0 : 8 } }}>
      <Tab.Screen name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon selected={focused} />
          ),
        }}
        component={Home} />
      <Tab.Screen name="Notes"
        options={{
          tabBarIcon: ({ focused }) => (
            <NotesIcon selected={focused} />
          ),
        }}
        component={Notes} />
      <Tab.Screen name="Create"
        options={{
          tabBarIcon: ({ focused }) => (
            <PlusIcon selected={focused} />
          ),
        }}
        component={Create} />
      <Tab.Screen name="Pricing"
        options={{
          tabBarIcon: ({ focused }) => (
            <PricingIcon selected={focused} />
          ),
        }}
        component={Pricing} />
      <Tab.Screen name="Menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuIcon selected={focused} />
          ),
        }}
        component={Menu} />
    </Tab.Navigator>
  );
}
