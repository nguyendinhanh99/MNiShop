import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const PurchaseInformationScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.containerColor,
    },
    bodyView: {
        paddingHorizontal: 5
    },
    tabView: {
        height: 70,
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
    selectButtom : {
        height: 60,
        borderRadius: 20,
        borderColor: "#8cd2c6",
        borderWidth: 0.5,
        shadowColor: "#2C625A",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.84,
        elevation: 1,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent : "center",
        alignItems: "center"
    },
    selectButtomStyle : {
        flex :1,
        justifyContent : "center",
        alignItems: "center"
    },
    selectIconStyle : {
        height :25,
        width: 25
    },
    selectText : {
        fontSize:8,
        marginTop: 5,
        color: colors.PurchaseInformationTincolor
    },
    ///
    renderAllBuyDatasView : {
        marginBottom: 10,
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderColor: "#696969",
        borderWidth: 0.3,
        borderRadius: 10
    },
    renderAllBuyDatasImageView : {
        flex: 1.3,
        alignItems: "center",
        paddingVertical:5
    },
    renderAllBuyDatasInfoView : {
        flex:8.7,
        paddingVertical: 5
    },
    renderAllBuyDatasTitle : {
        fontSize: 16,
        fontWeight: "500"
    },
    renderAllBuyDatasProductNameView : {
        flexDirection: "row",
    },
    renderAllBuyDatasProductNameText : {
        fontSize: 10,
        fontWeight: "500"
    },
    renderAllBuyDatasProductContentText : {
        fontSize: 15,
        fontWeight: "400",
        color: colors.tabTitleColor
    },
    renderAllBuyDatasProductPriceText : {
        fontSize: 15,
        fontWeight: "600",
        color: colors.priceColor,
        textDecorationLine: "line-through",
        letterSpacing: 1
    },
    renderAllBuyDatasProductPriceSaleText : {
        fontSize: 15,
        fontWeight: "600",
        color: colors.priceSaleColor,
        letterSpacing: 1
    },
    renderAllBuyDatasProductPayText : {
        fontSize: 15,
        fontWeight: "600",
        color: "#FF3333",
        letterSpacing: 1,
        fontStyle: 'italic'
    },
    renderAllBuyDatasUserText : {
        fontStyle: 'italic', 
        marginTop: 3,
        fontSize: 13
    },
    renderAllBuyDatasOderText : {
        fontSize: 15,
        fontWeight: "500",
        letterSpacing: 1,
        color: colors.tabTitleColor
    },
    listEmptyComponentView : {
        height: 800,
        justifyContent : "center",
        alignItems: "center"
    }
});



export default PurchaseInformationScreenStyle;
