import React from "react";
import { 
    View,
    Image,
    TouchableOpacity,
    Text
 } from "react-native";
 import AppStyle from "../theme";
 import Icons from "../assest";
 import { useNavigation } from "@react-navigation/native";

 export default function GobackButtomView () {
    const navigation = useNavigation();
    return(
        <View style ={AppStyle.GobackButtomViewStyle.tabView} >
            <View style = {AppStyle.GobackButtomViewStyle.tabViewStyle}>
                <TouchableOpacity
                onPress={() => navigation.goBack()}
                style = {AppStyle.GobackButtomViewStyle.goBackButtomView}
                >
                <Image
                source={Icons.GoBackIcon}
                style = {AppStyle.GobackButtomViewStyle.goBackIconStyle}
                tintColor={"#404040"}
                />
                </TouchableOpacity>
            </View>
        </View>
    )
 }