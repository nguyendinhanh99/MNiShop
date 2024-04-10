import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryManagementScreen from '../screen/InventoryManagement/InventoryManagementScreen';
import PurchaseInformationScreen from '../screen/purchaseInformation/purchaseInformationScreen';
import UserInformationScreen from '../screen/userInformation/userInformationScreen';
import WelcomeScreen from '../screen/wellcome/wellcomeApp';
import SignInScreen from '../screen/wellcome/SignInScreen';
import SignUpScreen from '../screen/wellcome/signUpScreen';
import AddNewProduction from '../screen/InventoryManagement/productions/addNewProduction';
import WareHouseHome from '../screen/InventoryManagement/wareHouse/wareHouseHome';
import ProductionDetail from '../screen/InventoryManagement/productions/productionDetail';
import UploadScreen from '../screen/InventoryManagement/productions/demo';
import BuyDataDetail from '../screen/purchaseInformation/buyDataDetail';
import OrderStatus1 from '../screen/purchaseInformation/orderStatus/orderStatus1';
import EditUserInfoScreen from '../screen/userInformation/editUserInfo';

import { auth } from '../config/firebase';
import { setUser } from '../redux/slices/user';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import Icons from '../assest';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const getTabIcon = (route, focused) => {
    let iconName;

    if (route.name === 'Thống kê') {
        iconName = focused ? Icons.HomeIcon : Icons.HomeIcon;
    } else if (route.name === 'Tôi') {
        iconName = focused ? Icons.MeIcon : Icons.MeIcon;
    } else if (route.name === 'Đơn hàng') {
        iconName = focused ? Icons.OrderIcon : Icons.OrderIcon;
    }
    return <Image source={iconName} 
    style={{ 
        width: 22, 
        height: 22, 
        tintColor: focused ? '#65aea6' : 'gray' 
    }} />;
};

function InventoryManagementStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="InventoryManagement" component={InventoryManagementScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddNewProduction" component={AddNewProduction} options={{ headerShown: false }} />
            <Stack.Screen name="WareHouseHome" component={WareHouseHome} options={{ headerShown: false }} />
            <Stack.Screen name="ProductionDetail" component={ProductionDetail} options={{ headerShown: false }} />
            <Stack.Screen name="Demo" component={UploadScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

function UserInfoStack() {
    return (
        <Stack.Navigator initialRouteName="tôi">
            <Stack.Screen name="tôi" component={UserInformationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditUser" component={EditUserInfoScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function PurchaseInformationStack() {
    return (
        <Stack.Navigator initialRouteName="Đơn hàng">
            <Stack.Screen name="Đơn hàng" component={PurchaseInformationScreen} options={{ headerShown: false }} />
            <Stack.Screen name= "BuyDataDetail"component={BuyDataDetail} options={{headerShown: false}}/>
            <Stack.Screen name= "OrderStatus1"component={OrderStatus1} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

const MainAppComponent = () => {
    const pendingOrdersCount = useSelector(state => state.purchase.pendingOrdersCount); // Lấy pendingOrdersCount từ Redux state

    return (
        <Tab.Navigator
            initialRouteName='Đơn hàng'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => getTabIcon(route, focused),
                tabBarActiveTintColor: '#65aea6',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    position: 'absolute',
                    borderRadius: 40,
                    borderTopWidth: 0,
                    backgroundColor: "rgba(240, 227, 245, 0.8)",
                },
                // Sử dụng pendingOrdersCount để hiển thị badge
                tabBarBadge: route.name === 'Đơn hàng' ? pendingOrdersCount : null,
            })}
        >
            <Tab.Screen options={{ headerShown: false }} name='Đơn hàng' component={PurchaseInformationStack} />
            <Tab.Screen options={{ headerShown: false }} name='Thống kê' component={InventoryManagementStack} />
            <Tab.Screen options={{ headerShown: false }} name='Tôi' component={UserInfoStack} />
        </Tab.Navigator>
    );
};


function AppNavigation() {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    onAuthStateChanged(auth, (u) => {
      console.log('got user: ', u);
      dispatch(setUser(u));
    });
    if (user) {
        return (
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="MainApp" component={MainAppComponent} />
            </Stack.Navigator>
        );
    } else {
        return (
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="HelloApp" component={WelcomeScreen} />
                <Stack.Screen options={{ headerShown: false, presentation: "modal" }} name="SignIn" component={SignInScreen} />
                <Stack.Screen options={{ headerShown: false, presentation: "modal" }} name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
        );
    }
}



export default AppNavigation
