import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import AppStyle from '../../theme';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase';
import { useSelector, useDispatch } from "react-redux";
import { setUserLoading } from '../../redux/slices/user';
import Loading from '../../component/loading';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { userLoading } = useSelector(state => state.user);

    const dispatch = useDispatch();


    const handleSignIn = async () => {
        if (email && password) {
            try {
                // Thử đăng nhập với email và password
                dispatch(setUserLoading(true));
                await signInWithEmailAndPassword(auth, email, password);
                dispatch(setUserLoading(false));
                navigation.navigate('MainApp');
            } catch (error) {
                dispatch(setUserLoading(false));
                // Nếu có lỗi, kiểm tra xem lỗi là gì và hiển thị thông báo tương ứng
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    Alert.alert('Tên tài khoản hoặc mật khẩu không đúng vui lòng kiểm tra lại');
                } else {
                    console.error("Error signing in:", error.message);
                    Alert.alert('Tên tài khoản hoặc mật khẩu không đúng vui lòng kiểm tra lại');
                }
            }
        } else {
            Alert.alert('Vui lòng nhập thông tin tài khoản');
        }
    };


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={AppStyle.SignInScreenStyle.container}>
            <Text style={AppStyle.SignInScreenStyle.title}>Đăng nhập</Text>
            <TextInput
                style={AppStyle.SignInScreenStyle.input}
                placeholder="Nhập email"
                value={email}
                onChangeText={value => setEmail(value)}
            />
            <TextInput
                style={AppStyle.SignInScreenStyle.input}
                placeholder="Nhập mật khẩu"
                secureTextEntry={true}
                value={password}
                onChangeText={value => setPassword(value)}
            />

            {
                userLoading ? (
                    <Loading />
                ) : (
                    <TouchableOpacity
                        style={AppStyle.SignInScreenStyle.button}
                        onPress={handleSignIn}
                    >
                        <Text style={AppStyle.SignInScreenStyle.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    );
};


export default SignInScreen;
