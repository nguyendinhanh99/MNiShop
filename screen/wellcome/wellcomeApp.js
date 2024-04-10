import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppStyle from "../../theme";
//import LinearGradient from 'react-native-linear-gradient';
import Icons from "../../assest";
import { auth } from "../../config/firebase";

// import statusCodes along with GoogleSignin
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { signInWithCredential } from "firebase/auth";

GoogleSignin.configure({
    webClientId: '787097599981-lv0rr3us60c9495os3oaiimqnr35tio0.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

export default function WelcomeScreen() {
    
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnimImage = useRef(new Animated.Value(-300)).current; // Thay đổi giá trị ban đầu thành -100 để chạy từ trên xuống
    const slideAnimLogin = useRef(new Animated.Value(200)).current; // Giá trị ban đầu là 100 để chạy từ dưới lên

    // Somewhere in your code
  const  signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const {idToken} = await GoogleSignin.signIn();
            const googleCredentials = GoogleAuthProvider.credential(idToken);
            await signInWithCredential(auth, googleCredentials);
        } catch (error) {
            console.log('got error: ', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const fadeInAndSlide = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnimImage, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnimLogin, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        fadeInAndSlide();
    }, []);

    return (
        <View colors={['#ebdafb', '#ebdafb', '#FFFFFF']} style={AppStyle.WellcomeAppStyle.linearGradient}>
            <View style={AppStyle.WellcomeAppStyle.container}>
                <Animated.View style={{ ...AppStyle.WellcomeAppStyle.fadeView, opacity: fadeAnim }}>
                    <Animated.View style={{ ...AppStyle.WellcomeAppStyle.fadeBodyView, transform: [{ translateY: slideAnimImage }] }}>

                        <Image
                            source={Icons.Appicon}
                            style={AppStyle.WellcomeAppStyle.LogoStyle}
                            resizeMode="cover" // Đảm bảo hình ảnh điền hết vào vùng chứa mà không bị méo
                            tintColor={"#FFF"}
                        />

                        <Text style={AppStyle.WellcomeAppStyle.appNameText}>
                           MNiShop
                        </Text>

                    </Animated.View>

                </Animated.View>

                <Animated.View style={{ ...AppStyle.WellcomeAppStyle.loginButtomView, opacity: fadeAnim }}>
                    <Animated.View style={{ ...AppStyle.WellcomeAppStyle.loginButtomView, opacity: fadeAnim, transform: [{ translateY: slideAnimLogin }] }}>
                        <View style={AppStyle.WellcomeAppStyle.loginButtomFlex}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SignIn")}
                                style={AppStyle.WellcomeAppStyle.loginButtomSignIn}
                            >
                                <Text style={AppStyle.WellcomeAppStyle.buttomText}>Đăng nhập</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("SignUp")}
                                style={AppStyle.WellcomeAppStyle.loginButtomSignUp}
                            >
                                <Text style={AppStyle.WellcomeAppStyle.buttomText}>Đăng ký</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => signIn()}
                                style={AppStyle.WellcomeAppStyle.loginButtomGoogle}
                            >
                                <Image
                                    style={AppStyle.WellcomeAppStyle.logoGoogle}
                                    source={Icons.GoogleIcon}
                                />
                                <Text style={AppStyle.WellcomeAppStyle.loginButtomGoogleText}>Đăng nhập bằng Google</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </Animated.View>
            </View>
        </View>
    );
}

