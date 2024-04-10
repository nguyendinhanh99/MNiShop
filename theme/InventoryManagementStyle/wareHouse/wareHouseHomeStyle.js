import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const WareHouseHomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.containerColor,
        justifyContent: "center",
        alignItems: "center"
    },
    bodyView: {
        marginBottom: 300,
        paddingHorizontal: 5
    },
    tabView: {
        height: 145,
        backgroundColor: colors.tabViewColor,
        shadowColor: "#2C625A",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.84,
        elevation: 1,
    },
    tabFunction:{
        height : 80,
        width:Width,
        justifyContent : "flex-end"
    },
    tabFunctionView:{
        flex : 1,
        flexDirection: "row"
    },
    goBackButtom: {
        flex : 1.3,
        justifyContent : "flex-end"
    },
    goBackButtomStyle: {
        height : 35,
        width: 35,
        marginBottom: 5,
        marginLeft: 10
    },
    searchInputView : {
        flex : 7.1,
        justifyContent: "flex-end"
    },
    searchButtomView : {
        flex : 1.3,
        justifyContent : "flex-end"
    },
    textInputStyle: {
        height: 40,
        paddingLeft: 10,
        borderRadius: 20,
        borderColor: colors.tabTitleColor,
        borderWidth: 0.5,
        fontSize: 18,
        color: colors.tabTitleColor,
        backgroundColor: "#FFF"
    },
    generalInformation:{
        height : 50,
        justifyContent : "flex-end",
        marginTop: 5
    },
    generalInformationView:{
        flex : 1,
        margin: 5,
        borderRadius:10
    },
    generalInformationText: {
        fontSize: 17,
        fontWeight: "600",
        color: "#1e4c45",
        letterSpacing: 2,
        paddingLeft: 10,
        
    },
    productionInfoView : {
        minHeight: 110,
        flexDirection: "row",
        margin: 5,
        backgroundColor: "#FFF",
        borderColor:colors.tabTitleColor,
        borderWidth: 0.3,
        borderRadius: 10
    },
    productionImage: {
        flex: 2.5,
        justifyContent: "center",
        alignItems: "center"
    },
    productionImageStyle : {
        height : 100,
        width: 90,
        borderRadius: 5
    },
    productionInfoTextView : {
        flex: 7.5,
        paddingLeft: 5
    },
    productionInfoTextName : {
        fontSize: 15,
        paddingTop: 5
    },
    productionInfoTextDescription : {
        fontSize: 12,
        letterSpacing: 1,
        paddingBottom: 5
    },
    productionInfoTextPrice : {
        fontSize: 15,
        fontWeight: "300",
        color : "#FF6600"
    },
    productionInfoTextPriceSale : {
        fontSize: 15,
        fontWeight: "500",
        color : "#FF6600"
    },
});



export default WareHouseHomeStyle;
