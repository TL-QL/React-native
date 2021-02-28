import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { View, Platform, Image, StyleSheet, SafeAreaView, ScrollView, Text, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
});

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();
const FavoritesNavigator = createStackNavigator();
const LoginNavigator = createStackNavigator();

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
                options={{
                    headerLeft: (props) => (
                        <Icon name="menu" size={24} color='white' onPress={() => {navigation.toggleDrawer()}} />
                    )
                }}
            />
        </ContactNavigator.Navigator>
    );
}

function ReservationScreen({ navigation }) {
    return (
        <ReservationNavigator.Navigator screenOptions={{ headerStyle: {backgroundColor: '#512DA8'}, headerTintColor: '#fff', headerTitleStyle:{color: '#fff'}}}>
            <ReservationNavigator.Screen 
                name="Reservation" 
                component={Reservation} 
                options={{
                    headerLeft: (props) => (
                        <Icon name="menu" size={24} color='white' onPress={() => {navigation.toggleDrawer()}} />
                    )
                }}
            />
        </ReservationNavigator.Navigator>
    );
}

function FavoritesScreen({ navigation }) {
    return (
        <FavoritesNavigator.Navigator screenOptions={{ headerStyle: {backgroundColor: '#512DA8'}, headerTintColor: '#fff', headerTitleStyle:{color: '#fff'}}}>
            <FavoritesNavigator.Screen 
                name="Favorites" 
                component={Favorites} 
                options={{
                    headerLeft: (props) => (
                        <Icon name="menu" size={24} color='white' onPress={() => {navigation.toggleDrawer()}} />
                    )
                }}
            />
        </FavoritesNavigator.Navigator>
    );
}

function LoginScreen({ navigation }) {
    return (
        <LoginNavigator.Navigator screenOptions={{ headerStyle: {backgroundColor: '#512DA8'}, headerTintColor: '#fff', headerTitleStyle:{color: '#fff'}}}>
            <LoginNavigator.Screen 
                name="Login" 
                component={Login} 
                options={{
                    headerLeft: (props) => (
                        <Icon name="menu" size={24} color='white' onPress={() => {navigation.toggleDrawer()}} />
                    )
                }}
            />
        </LoginNavigator.Navigator>
    );
}
  


class Main extends Component{

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

        //NetInfo.getConnectionInfo()
        NetInfo.fetch()
        .then((connectionInfo) => {
            Alert.alert('NetInfo', 'Initial Network Connectivity Type: '
            + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            // ToastAndroid.show('Initial Network Connectivity Type: '
            //     + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
            //     ToastAndroid.LONG)
        });

        NetInfo.addEventListener(connectionInfo => {
            this.handleConnectivityChange(connectionInfo)
        });
    }

    componentWillUnmount() {
        NetInfo.removeEventListener(connectionInfo => {this.handleConnectivityChange(connectionInfo)});
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
          case 'none':
            Alert.alert('Connection Info', 'You are now offline!');
            //ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
            break;
          case 'wifi':
            Alert.alert('Connection Info', 'You are now connected to WiFi!');
            //ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
            break;
          case 'cellular':
            Alert.alert('Connection Info', 'You are now connected to Cellular!');
            //ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
            break;
          case 'unknown':
            Alert.alert('Connection Info', 'You now have unknown connection!');
            //ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
            break;
          default:
            break;
        }
      }

    render(){
        return(
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios'? 0:ExpoStatusBar.Constants.statusBarHeight}}>
                <MainNavigator.Navigator initialRouteName="HomeNavigator" drawerStyle={{backgroundColor: '#D1C4E9'}} drawerContent={props => <CustomDrawerContentComponent {...props} />}>
                    <MainNavigator.Screen name="LoginNavigator" component={LoginScreen} options={{title: 'Login', drawerLabel: 'Login', drawerIcon: ({tintColor}) => (<Icon name='sign-in' type='font-awesome' size={24} color={tintColor} />)}} />
                    <MainNavigator.Screen name="HomeNavigator" component={HomeScreen} options={{title: 'Home', drawerLabel: 'Home', drawerIcon: ({tintColor}) => (<Icon name='home' type='font-awesome' size={24} color={tintColor} />)}} />
                    <MainNavigator.Screen name="AboutNavigator" component={AboutScreen} options={{title: 'About', drawerLabel: 'About Us', drawerIcon: ({tintColor}) => (<Icon name='info-circle' type='font-awesome' size={24} color={tintColor} />)}} />
                    <MainNavigator.Screen name="MenuNavigator" component={MenuScreen} options={{title: 'Menu', drawerLabel: 'Menu', drawerIcon: ({tintColor}) => (<Icon name='list' type='font-awesome' size={24} color={tintColor} />)}} />
                    <MainNavigator.Screen name="ContactNavigator" component={ContactScreen} options={{title: 'Contact', drawerLabel: 'Contact Us', drawerIcon: ({tintColor}) => (<Icon name='address-card' type='font-awesome' size={22} color={tintColor} />)}} />
                    <MainNavigator.Screen name="FavoritesNavigator" component={FavoritesScreen} options={{title: 'My Favorites', drawerLabel: 'My Favorites', drawerIcon: ({tintColor}) => (<Icon name='heart' type='font-awesome' size={24} color={tintColor} />)}} />
                    <MainNavigator.Screen name="ReservationNavigator" component={ReservationScreen} options={{title: 'Reserve Table', drawerLabel: 'Reserve Table', drawerIcon: ({tintColor}) => (<Icon name='cutlery' type='font-awesome' size={24} color={tintColor} />)}} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);