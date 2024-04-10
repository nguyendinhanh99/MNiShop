import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const BuyDataDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.containerColor,
    },
    bodyView: {
        paddingHorizontal: 5,
        marginBottom: 200
    },
    titleView : {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
    }, 
    titleStyle : {
        fontSize:30,
        color: colors.tabTitleColor,
        letterSpacing: 2
    },
    infoView : {
        paddingHorizontal: 5,
        marginTop: 10
    },
    infoText: {
        fontSize: 16,
        color: "#696969"
    },
    productItem: {
        marginVertical: 5,
    },
    productItemInfoView : {
        flex: 7,
    },
    productItemImageView : {
        flex: 3,
    },
    totalPriceSaleText : {
        fontSize: 20,
        color: colors.priceSaleColor,
        marginTop: 5
    },
    totalPriceText : {
        fontSize: 20,
        color: colors.priceColor,
        textDecorationLine: "line-through",

    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:5,
    },
    attachContentText: {
        fontSize: 16,
        color: colors.priceSaleColor,
        marginTop: 5
    },
    selectedPaymentMethodText : {
        fontSize: 20,
        color: "#E80000",
        marginBottom: 5
    },
    estimatedDeliveryTimeText: {
        fontSize: 15,
        color: "#009933",
        marginBottom: 5
    },
    orderStatusText : {
        fontSize: 20,
        color: "#009933",
        marginBottom: 5
    },
    button: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        alignItems: 'center',
        borderColor: colors.tabTitleColor,
        borderWidth:1 
    },
    buttonText: {
        color: colors.tabTitleColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderIdText : {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});



export default BuyDataDetailStyle;
