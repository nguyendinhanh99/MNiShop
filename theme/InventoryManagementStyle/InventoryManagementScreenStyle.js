import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const InventoryManagementScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.containerColor,
    },
    bodyView : {
        marginBottom: 150
    },
    statisticsView : {
        height: 250,
        borderRadius: 20,
        overflow: "hidden",
        shadowColor: "#1f5f5f",
        shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderColor: "#cde8e3",
        borderWidth: 1,
        margin: 5,
        marginTop: 60,
        backgroundColor: "transparent"
    },
    titleView : {
        marginTop: 10,
        paddingHorizontal: 5
    },
    titleTextStyle : {
        fontSize: 23,
        color : colors.titleOrderColor,
        letterSpacing: 2,
        fontWeight: "500",

    },
    buttomProductionView : {
        height: 150,
        flexDirection: "row",
        marginTop: 10
    },
    buttomProductionStyle : {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        shadowColor: "blue",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent : "center",
        alignItems: "center"
    },
    buttomStatisticalView : {
        height: 150,
        flexDirection: "row",
        marginTop: 10,
    },
    buttomStatisticalStyle : {
        flex: 1,
        backgroundColor: "#FFF",
        margin: 5,
        borderRadius: 10,
        borderColor: "#7cd3c2",
        borderWidth: 0.5,
        shadowColor: "blue",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttomProductionIcon : {
        height: 50,
        width: 50
    },
    buttomProductionTitle : {
        fontSize: 15,
        color: "#FFF",
        marginTop: 10,
        fontWeight: "500",
        letterSpacing: 2
    },
    buttomStatisticaTitleView : {
        flex: 2,
        alignItems: "center",
        justifyContent : "center",
        backgroundColor: "#7cd3c2",
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10
    },
    buttomStatisticaInfoView : {
        flex : 8,
        paddingHorizontal: 3,
        justifyContent: "center"
    },
    buttomStatisticaTitleText: {
        fontSize: 20,
        color: "#FFF",
        fontWeight: "600",
        letterSpacing: 4
    },
    buttomStatisticaInfoText : {
        fontSize: 18,
        color: colors.titleOrderColor,
        paddingBottom: 10
    }
});



export default InventoryManagementScreenStyle;
