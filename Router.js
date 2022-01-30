// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons"
import CustomDrawer from './src/components/Drawer';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Login from "./src/screens/Login";
import {LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
import { connect } from 'react-redux';
import AddDoctor from './src/screens/AddDoctor';
import ManageDoctor from './src/screens/ManageDoctor';
import ReportDrawer from './src/screens/ReportDrawer';
import Template from './src/screens/Template';
import Report from './src/screens/Report';
import ChooseDoctor from './src/screens/ChooseDoctor';
import FinalPoster from './src/screens/FinalPoster';
import UpdateDoctor from './src/screens/UpdateDoctor';
import Doctor from './src/screens/Doctor';
import ChooseTemplate from './src/screens/ChooseTemplate';

const theme1="#5DBCB0";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator screenOptions={{drawerStyle:{backgroundColor:'transparent'}}} drawerContent={(props) => <CustomDrawer {...props}  /> }>
      <Drawer.Screen name="HomeDrawer" component={Home} options={{headerShown:false, unmountOnBlur:true}} />
      <Drawer.Screen name="AddDoctor" component={AddDoctor} options={{headerShown:false, unmountOnBlur:true}} />
      <Drawer.Screen name="ManageDoctor" component={ManageDoctor} options={{headerShown:false, unmountOnBlur:true}} />
      <Drawer.Screen name="UpdateDoctor" component={UpdateDoctor} options={{headerShown:false, unmountOnBlur:true}} />
      <Drawer.Screen name="Template" component={Template} options={{headerShown:false, unmountOnBlur:true}} />
      <Drawer.Screen name="Report" component={Report} options={{headerShown:false, unmountOnBlur:true}} />
      <Drawer.Screen name="ChooseDoctor" component={ChooseDoctor} options={{headerShown:false, unmountOnBlur:true}} />
      <Drawer.Screen name="ChooseTemplate" component={ChooseTemplate} options={{headerShown:false, unmountOnBlur:true}} />
      <Drawer.Screen name="ReportDrawer" component={ReportDrawer} options={{headerShown:false, unmountOnBlur:true}} />
      <Drawer.Screen name="Doctor" component={Doctor} options={{headerShown:false, unmountOnBlur:true}} />
      <Drawer.Screen name="Profile" component={Profile} options={{headerShown:false, unmountOnBlur:true}} />
      <Drawer.Screen name="Final" component={FinalPoster} options={{headerShown:false, unmountOnBlur:true}} />
    </Drawer.Navigator>
  );
}
function HomeScreen(){
  return (
    <Tab.Navigator   screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Report') {
          iconName = focused ? 'ios-analytics-sharp':'ios-analytics-outline' ;
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: theme1,
      tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeDrawer} options={{headerShown:false, unmountOnBlur:true}}  />
      <Tab.Screen name="Report" component={Report} options={{headerShown:false, unmountOnBlur:true}} />
    </Tab.Navigator>
  )
}
const Router = ({currentUser}) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    currentUser ?
                    <>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
                    </>
                    :
                    <>
                    <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const mapStateToProps = (state) => ({
  currentUser : state.user.currentUser
})
export default connect(mapStateToProps)(Router);
