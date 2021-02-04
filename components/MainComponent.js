import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Dishdetail from './DishDetailComponent';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

// const MenuNavigator = createStackNavigator({
//     Menu: {screen: Menu},
//     Dishdetail: {screen: Dishdetail}
// }, {
//     initialRouteName: 'Menu',
//     navigationOptions: {
//         headerStyle: {
//             backgroundColor: '#512DA8'
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle:{
//             color: '#fff'
//         }
//     }
// });

const MenuNavigator = createStackNavigator();

class Main extends Component{

    render(){
        return(
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios'? 0:ExpoStatusBar.Constants.statusBarHeight}}>
                <MenuNavigator.Navigator initialRouteName="Menu" screenOptions={{ headerStyle: {backgroundColor: '#512DA8'}, headerTintColor: '#fff', headerTitleStyle:{color: '#fff'}}}>
                    <MenuNavigator.Screen name="Menu" component={Menu} />
                    <MenuNavigator.Screen name="Dishdetail" component={Dishdetail} />
                </MenuNavigator.Navigator>
            </View>
        );
    }
}

export default Main;