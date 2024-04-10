import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const WellcomeAppStyle = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#ddf2ee"
    },
    fadeView: {
        flex: 6.5
    },
    fadeBodyView: {
        flex: 1,
        backgroundColor: "#7ebdb2",
        borderBottomEndRadius: 200,
        justifyContent: "center",
        alignItems: "center"
    },
    loginButtomView: {
        flex: 3.5,
    },
    LogoStyle: {
        height: 150,
        width: 150,
        borderRadius: 75, 
    },
    loginButtomFlex: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    },
    loginButtomSignIn: {
        height: 50,
        backgroundColor: "#7ebdb2",
        margin: 5,
        borderRadius: 30,
        width: Width - 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    loginButtomSignUp: {
        height: 50,
        backgroundColor: "#7ebdb2",
        margin: 5,
        borderRadius: 30,
        width: Width - 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    buttomText: {
        fontSize: 25,
        color: "#FFF",
        fontWeight: "500",
        letterSpacing: 1
    },
    loginButtomGoogle: {
        height: 50,
        backgroundColor: "#FFFF",
        margin: 15,
        borderRadius: 30,
        width: Width - 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        flexDirection: "row"
    },
    logoGoogle: {
        height: 30,
        width: 30,
        marginEnd: 10
    },
    loginButtomGoogleText: {
        fontSize: 19,
        fontWeight: "600",
        color: "#585858"
    },
    appNameText: {
        fontSize:30,
        fontWeight: "600",
        marginTop: 5,
        color: 'white',
        letterSpacing: 10
    }
});



export default WellcomeAppStyle;
