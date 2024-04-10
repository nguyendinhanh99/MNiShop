import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AppStyle from '../../theme';
import CheckBox from '@react-native-community/checkbox';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useSelector, useDispatch } from "react-redux";
import { setUserLoading } from '../../redux/slices/user';
import Loading from '../../component/loading';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { userLoading } = useSelector(state => state.user);

    const dispatch = useDispatch();



    const handleAddLocation = async () => {
        if (email && password) {
            try {
                dispatch(setUserLoading(true));

                // Đăng ký tài khoản
                await createUserWithEmailAndPassword(auth, email, password);


                dispatch(setUserLoading(false));
            } catch (error) {
                console.error("Registration error:", error);
                dispatch(setUserLoading(false));
            }
        } else {
            Alert.alert('Vui lòng nhập cả email và mật khẩu.');
        }
    };

    const handleTerms = () => {
        Alert.alert('Cam kết cung cấp thông tin cá nhân chính xác và đảm bảo tính bảo mật cho tài khoản của bạn. Chúng tôi có quyền ngừng hoặc đình chỉ tài khoản nếu phát hiện bất kỳ vi phạm nào.');
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={AppStyle.SignInScreenStyle.container}>
            <Text style={AppStyle.SignInScreenStyle.title}>Tạo tài khoản</Text>
            <TextInput
                style={AppStyle.SignInScreenStyle.input}
                placeholder="Nhập email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={AppStyle.SignInScreenStyle.input}
                placeholder="Nhập mật khẩu"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isChecked}
                    onValueChange={() => setIsChecked(!isChecked)}
                    style={{ 
                        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                    }}
                />
                <Text style={styles.label}>Tôi đồng ý với điều khoản sử dụng </Text>
                <TouchableOpacity
                    onPress={handleTerms}
                >
                    <Text style = {{
                        color: "red"
                    }}>(Điều khoản)</Text>
                </TouchableOpacity>
            </View>
            {
                userLoading ? (
                    <Loading />
                ) : (
            <TouchableOpacity
                style={AppStyle.SignInScreenStyle.button} onPress={handleAddLocation}>
                <Text style={AppStyle.SignInScreenStyle.buttonText}>Đăng ký</Text>
            </TouchableOpacity>
               )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        justifyContent: "center"
    },
    label: {
        marginLeft: 5,
    },
});

export default SignUpScreen;
