import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const ProductionDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.containerColor,

    },
    bodyView: {
        paddingHorizontal: 5
    },
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
    imageView: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    imageStyle: {
        width: "100%",
        height: 250,
        backgroundColor: "#d2dbda",
        borderRadius: 20,
    },
    productionInfoView: {
        marginBottom: 200,
        minHeight: 300
    },
    nameTextStyle: {
        fontSize: 20,
        fontWeight: "500",
        paddingTop: 5
    },
    priceTextStyle: {
        fontSize: 20,
        fontWeight: "400",
        color: "#FF8C00",
        paddingTop: 5
    },
    descriptionTextStyle: {
        fontSize: 18,
        fontWeight: "300",
        letterSpacing: 1,
        paddingTop: 5
    },
    featureView : {
        height : 40,
        borderRadius: 20,
        justifyContent : "center",
        alignItems: "center",
        borderColor: colors.tabTitleColor,
        borderWidth: 0.5,
        marginBottom: 10
    },
    featureTextStyle : {
        fontSize : 20,
        color : colors.tabTitleColor,
        fontWeight: "500",
        letterSpacing:1
    },
    
});



export default ProductionDetailStyle;
