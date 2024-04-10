import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert
} from "react-native";
import AppStyle from "../../theme";
import Icons from "../../assest";
import { colors } from "../../assest/color";
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { query, limit, getDocs, where, orderBy } from 'firebase/firestore';
import { UserInfoRef, auth } from "../../config/firebase";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';




export default function UserInformationScreen() {
    const { user } = useSelector(state => state.user);
    const [userInfo, setUserInfo] = useState(null);
    const [isConnected, setIsConnected] = useState(true);
    const NetInfoNew = NetInfo;
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const handleLogOut = async () => {
        // Hiển thị hộp thoại xác nhận trước khi đăng xuất
        Alert.alert(
            'Xác nhận đăng xuất',
            'Bạn có muốn đăng xuất không?',
            [
                {
                    text: 'Hủy',
                    onPress: () => console.log('Hủy đăng xuất'),
                    style: 'cancel',
                },
                {
                    text: 'Đăng xuất',
                    onPress: async () => {
                        // Thực hiện đăng xuất nếu người dùng chọn đăng xuất
                        await signOut(auth);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const fetchData = async () => {
        try {
            if (user && isConnected) {
                const q = query(UserInfoRef(), where('userId', '==', user.uid), limit(1));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();
                    setUserInfo(data);
                    console.log(data);
                } else {
                    console.log('No documents found for the current user!');
                }
            } else {
                console.log('No user information available!');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        const unsubscribe = NetInfoNew.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        fetchData();
        return () => unsubscribe();
    }, []);

    const getInitials = (name) => {
        const words = name.split(' ');
        const firstInitial = words[1]?.charAt(0).toUpperCase() || '';
        const secondInitial = words[2]?.charAt(0).toUpperCase() || '';
        return firstInitial + secondInitial;
    };

    return (
        <View style={AppStyle.UserInformationScreenStyle.container}>
            <View style={AppStyle.UserInformationScreenStyle.tabView}>
                <View style={AppStyle.UserInformationScreenStyle.tabButtomView}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("EditUser", { userInfo: userInfo })}
                        style={AppStyle.UserInformationScreenStyle.tabButtomStyle}
                    >
                        <Image
                            source={Icons.EditIcon}
                            style={AppStyle.UserInformationScreenStyle.tabButtomImageStyle}
                            tintColor={colors.tabTitleColor}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[AppStyle.UserInformationScreenStyle.tabButtomStyle, { marginEnd: 20 }]}
                        onPress={handleLogOut}
                    >
                        <Image
                            source={Icons.LogOutIcon}
                            style={AppStyle.UserInformationScreenStyle.tabButtomImageStyle}
                            tintColor={colors.tabTitleColor}

                        />
                    </TouchableOpacity>
                </View>
                {userInfo ? (
                    <View style={AppStyle.UserInformationScreenStyle.tabUserInfoView}>
                        <View style={AppStyle.UserInformationScreenStyle.tabUserInfoImageView}>
                            <View style={AppStyle.UserInformationScreenStyle.tabUserInfoImageStyle}>
                                <Text style={AppStyle.UserInformationScreenStyle.tabUserInfoImageText}>
                                    {userInfo.fullName && getInitials(userInfo.fullName)}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("EditUser", { userInfo: userInfo })}
                            style={AppStyle.UserInformationScreenStyle.tabUserInfoBodyView}>
                            <Text style={AppStyle.UserInformationScreenStyle.tabUserInfoName}>
                                {userInfo.fullName}
                            </Text>
                            <Text style={AppStyle.UserInformationScreenStyle.tabUserInfoAddress}>
                                {userInfo.address}
                            </Text>
                            <View style={AppStyle.UserInformationScreenStyle.tabUserInfoRoleView}>
                                <Text style={AppStyle.UserInformationScreenStyle.tabUserInfoUserRole}>
                                    {userInfo.userRole === 1 ? 'Khách hàng' : userInfo.userRole === 2 ? 'Người bán' : 'Không xác định'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={AppStyle.UserInformationScreenStyle.tabUserInfoView}>
                        <View style={AppStyle.UserInformationScreenStyle.tabUserInfoImageView}>
                            <View style={AppStyle.UserInformationScreenStyle.tabUserInfoImageStyle}>
                                <Text style={AppStyle.UserInformationScreenStyle.tabUserInfoImageText}>
                                    ?
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={AppStyle.UserInformationScreenStyle.tabUserInfoBodyView}>
                            <Text style={AppStyle.UserInformationScreenStyle.tabUserInfoName}>
                                NiShop xin chào !
                            </Text>
                            <Text style={AppStyle.UserInformationScreenStyle.tabUserInfoAddress}>
                                Chưa thiết lập thông tin cá nhân
                            </Text>
                            <View style={AppStyle.UserInformationScreenStyle.tabUserInfoRoleView}>
                                <Text style={AppStyle.UserInformationScreenStyle.tabUserInfoUserRole}>
                                    ...
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                )}
            </View>
        </View>
    )
}