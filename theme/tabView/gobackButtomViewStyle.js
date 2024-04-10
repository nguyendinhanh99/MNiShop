import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const GobackButtomViewStyle = StyleSheet.create({
    tabView: {
        height: 80,
        backgroundColor: colors.tabViewColor,
        marginBottom: 10,
        shadowColor: "#2C625A",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.84,
        elevation: 1,
    },
    tabViewStyle : {
        flex : 1,
        justifyContent : "flex-end"
    },
    goBackIconStyle : {
        height : 30,
        width : 30,
    },
    goBackButtomView : {
        height : 40,
        width: 40,
        backgroundColor: "#FFF",
        margin: 10,
        justifyContent : "center",
        alignItems: "center",
        borderRadius: 30
    }
});



export default GobackButtomViewStyle;
