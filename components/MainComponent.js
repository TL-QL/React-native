import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { View, Platform, Image, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createDrawerNavigator, DrawerItems } from '@react-navigation/drawer';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { Icon } from 'react-native-elements';

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();

// const CustomDrawerContentComponent = (props) => (
//     <ScrollView>
//         <SafeAreaView style={StyleSheet.container} forceInset={{top: 'always', horizontal: 'never'}}>
//             <View style={StyleSheet.drawHeader}>
//                 <View style={{flex: 1}}>
//                     <Image source={require('./images/logo.png')} style={StyleSheet.drawerImage} />
//                 </View>
//                 <View style={{flex: 2}}>
//                     <Text style={StyleSheet.drawerHeaderText}>Ristorante Con Fusion</Text>
//                 </View>
//             </View>
//             {/* ...props = whatever in props */}
//             <DrawerItems {...props} />
//         </SafeAreaView>
//     </ScrollView>
// );

function CustomDrawerContentComponent(props) {
    return (
        <ScrollView {...props}>
            <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
                <View style={styles.drawHeader}>
                    <View style={{flex: 1}}>
                        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                    </View>
                </View>
                {/* ...props = whatever in props */}
                <DrawerItemList {...props} />
            </SafeAreaView>
        </ScrollView>
    );
}

const MainNavigator = createDrawerNavigator();

function MenuScreen({ navigation }) {
    return (
        <MenuNavigator.Navigator initialRouteName="Menu" screenOptions={{ headerStyle: {backgroundColor: '#512DA8'}, headerTintColor: '#fff', headerTitleStyle:{color: '#fff'}}}>
            <MenuNavigator.Screen 
                name="Menu" 
                component={Menu} 
                //options={{headerLeft: <Icon name="menu" size={24} color='white' onPress={navigation.toggleDrawer}/>}} 
                options={{
                    headerLeft: (props) => (
                        <Icon name="menu" size={24} color='white' onPress={() => {navigation.toggleDrawer()}} />
                    )
                }}
            />
                
            <MenuNavigator.Screen name="Dishdetail" component={Dishdetail} />
        </MenuNavigator.Navigator>
    );
}

function HomeScreen({ navigation }) {
    return (
        <HomeNavigator.Navigator screenOptions={{ headerStyle: {backgroundColor: '#512DA8'}, headerTintColor: '#fff', headerTitleStyle:{color: '#fff'}}}>
            <HomeNavigator.Screen 
                name="Home" 
                component={Home} 
                //options={{headerLeft: <Icon name="home" size={24} color='white' onPress={navigation.toggleDrawer} />}} 
                options={{
                    headerLeft: (props) => (
                        <Icon name="menu" size={24} color='white' onPress={() => {navigation.toggleDrawer()}} />
                    )
                }}
            />
        </HomeNavigator.Navigator>
    );
}

function AboutScreen({ navigation }) {
    return (
        <AboutNavigator.Navigator screenOptions={{ headerStyle: {backgroundColor: '#512DA8'}, headerTintColor: '#fff', headerTitleStyle:{color: '#fff'}}}>
            <AboutNavigator.Screen 
                name="About" 
                component={About} 
                //options={{headerLeft: <Icon name="about" size={24} color='white' onPress={navigation.toggleDrawer} />}} 
                options={{
                    headerLeft: (props) => (
                        <Icon name="menu" size={24} color='white' onPress={() => {navigation.toggleDrawer()}} />
                    )
                }}
            />
        </AboutNavigator.Navigator>
    );
}

function ContactScreen({ navigation }) {
    return (
        <ContactNavigator.Navigator screenOptions={{ headerStyle: {backgroundColor: '#512DA8'}, headerTintColor: '#fff', headerTitleStyle:{color: '#fff'}}}>
            <ContactNavigator.Screen 
                name="Contact" 
                component={Contact} 
                //options={{headerLeft: <Icon name="contact" size={24} color='white' onPress={navigation.toggleDrawer} />}} 
                options={{
                    headerLeft: (props) => (
                        <Icon name="menu" size={24} color='white' onPress={() => {navigation.toggleDrawer()}} />
                    )
                }}
            />
        </ContactNavigator.Navigator>
    );
}
  


class Main extends Component{

    render(){
        return(
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios'? 0:ExpoStatusBar.Constants.statusBarHeight}}>
                <MainNavigator.Navigator initialRouteName="HomeNavigator" drawerStyle={{backgroundColor: '#D1C4E9'}} drawerContent={props => <CustomDrawerContentComponent {...props} />}>
                    <MainNavigator.Screen name="HomeNavigator" component={HomeScreen} options={{title: 'Home', drawerLabel: 'Home', drawerIcon: ({tintColor}) => (<Icon name='home' type='font-awesome' size={24} color={tintColor} />)}} />
                    <MainNavigator.Screen name="AboutNavigator" component={AboutScreen} options={{title: 'About', drawerLabel: 'About Us', drawerIcon: ({tintColor}) => (<Icon name='info-circle' type='font-awesome' size={24} color={tintColor} />)}} />
                    <MainNavigator.Screen name="MenuNavigator" component={MenuScreen} options={{title: 'Menu', drawerLabel: 'Menu', drawerIcon: ({tintColor}) => (<Icon name='list' type='font-awesome' size={24} color={tintColor} />)}} />
                    <MainNavigator.Screen name="ContactNavigator" component={ContactScreen} options={{title: 'Contact', drawerLabel: 'Contact Us', drawerIcon: ({tintColor}) => (<Icon name='address-card' type='font-awesome' size={22} color={tintColor} />)}} />
                </MainNavigator.Navigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default Main;