import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const UserInformationScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.containerColor,
    },
    tabView : {
        height : 170,
        backgroundColor: colors.tabViewColor,
        borderBottomEndRadius: 25,
        borderBottomLeftRadius: 25,
        shadowColor: "#2C625A",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.84,
        elevation: 1,
    },
    tabButtomView : {
        flex : 4,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent : "flex-end"
    },
    tabButtomStyle : {
        marginEnd: 15
    },
    tabButtomImageStyle : {
        height : 25,
        width: 25
    },
    tabUserInfoView : {
        flex : 6,
        flexDirection: "row"
    },
    tabUserInfoImageView : {
        flex: 1.5,
        flexDirection: "row"
    },
    tabUserInfoBodyView : {
        flex: 8.5
    },
    tabUserInfoImageStyle : {
        height : 50,
        width: 50,
        backgroundColor: "#FFF",
        borderRadius: 50,
        margin: 5,
        justifyContent : "center",
        alignItems: "center"
    },
    tabUserInfoImageText : {
        fontSize: 20,
        color: colors.tabTitleColor
    },
    tabUserInfoRoleView : {
        height: 23,
        width: 150,
        backgroundColor : "#FFF",
        justifyContent : "center",
        alignItems: "center",
        borderRadius: 20
    },
    tabUserInfoName : {
        fontSize : 20,
        padding: 3,
        color: colors.userInfoScreenTabText,
        fontWeight : "500"
    },
    tabUserInfoAddress : {
        fontSize : 13,
        padding: 3,
        color: colors.userInfoScreenTabText
    },
    tabUserInfoUserRole : {
        fontSize : 15,
        padding: 3,
        color: colors.userInfoScreenTabText
    },
});



export default UserInformationScreenStyle;
