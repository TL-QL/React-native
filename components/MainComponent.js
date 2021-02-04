import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

function MenuScreen({ navigation }) {
    return (
        <MenuNavigator.Navigator initialRouteName="Menu" screenOptions={{ headerStyle: {backgroundColor: '#512DA8'}, headerTintColor: '#fff', headerTitleStyle:{color: '#fff'}}}>
            <MenuNavigator.Screen name="Menu" component={Menu} />
            <MenuNavigator.Screen name="Dishdetail" component={Dishdetail} />
        </MenuNavigator.Navigator>
    );
}

function HomeScreen({ navigation }) {
    return (
        <HomeNavigator.Navigator screenOptions={{ headerStyle: {backgroundColor: '#512DA8'}, headerTintColor: '#fff', headerTitleStyle:{color: '#fff'}}}>
            <HomeNavigator.Screen name="Home" component={Home} />
        </HomeNavigator.Navigator>
    );
}
  


class Main extends Component{

    render(){
        return(
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios'? 0:ExpoStatusBar.Constants.statusBarHeight}}>
                <MainNavigator.Navigator initialRouteName="HomeNavigator" drawerStyle={{backgroundColor: '#D1C4E9'}}>
                    <MainNavigator.Screen name="HomeNavigator" component={HomeScreen} options={{title: 'Home', drawerLabel: 'Home'}} />
                    <MainNavigator.Screen name="MenuNavigator" component={MenuScreen} options={{title: 'Menu', drawerLabel: 'Menu'}} />
                </MainNavigator.Navigator>
            </View>
        );
    }
}

export default Main;