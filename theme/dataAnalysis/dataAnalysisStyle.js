import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const DataAnalysisStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.containerColor,
        marginTop: 10,
        alignItems: "center"
    },
    bodyView: {
        flex: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    totalPriceSaleText : {
        marginTop: 5,
        fontSize: 16,
        color: "#FF4500",
        fontWeight: "500"
    },
    chartTitle : {
        fontSize: 10,
        marginTop: 5,
        color: "#696969"
    }

});



export default DataAnalysisStyle;
