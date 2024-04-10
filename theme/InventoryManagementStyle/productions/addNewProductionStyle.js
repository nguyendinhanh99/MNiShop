import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const AddNewProductionStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.containerColor,
    },
    bodyView: {
        marginBottom: 300,
        paddingHorizontal: 5
    },
    tabView: {
        height: 90,
        backgroundColor: colors.tabViewColor,
        flexDirection: "row"
    },
    goBackButtomView: {
        flex: 2,
        justifyContent: "flex-end"
    },
    goBackIcon: {
        height: 35,
        width: 35,
        margin: 5
    },
    tabTitleView: {
        flex: 8,
        justifyContent: "flex-end"
    },
    tabTitleStyle: {
        fontSize: 23,
        color: colors.tabTitleColor,
        marginBottom: 10,
        letterSpacing: 2
    },
    tabTitleSaveStyle: {
        fontSize: 23,
        color: "#FF6600",
        marginBottom: 10,
        letterSpacing: 1,
        fontWeight: "700"
    },
    textInputStyle: {
        height: 35,
        paddingLeft: 10,
        margin: 5,
        borderRadius: 10,
        borderColor: colors.tabViewColor,
        borderWidth: 0.5,
        fontSize: 18,
        color: colors.tabTitleColor
    },
    bodyTitleStyle : {
        fontSize: 17,
        marginTop: 10,
        letterSpacing:1
    },
    descriptionView : {
        height: 80,
        paddingLeft: 10,
        margin: 5,
        borderRadius: 10,
        borderColor: colors.tabViewColor,
        borderWidth: 0.5,
        fontSize: 18,
        color: colors.tabTitleColor
    },
    selectImageButtomView : {
        height: 40,
        backgroundColor:colors.buttomColor,
        margin: 20,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    selectImageButtomText: {
        fontSize: 23,
        fontWeight: "500",
        color: colors.textButtomColor
    },
    removeImageButtom: {
        position: 'absolute', 
        top: 5, 
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 20,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    removeImageButtomText: {
        fontSize:15,
        color: "#383838"
    }
});



export default AddNewProductionStyle;
