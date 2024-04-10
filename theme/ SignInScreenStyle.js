import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import { colors } from '../assest/color';


const SignInScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF"
      },
      title: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 50,
        color: colors.tabViewColor,
      },
      input: {
        width: '85%',
        height: 50,
        borderColor: colors.tabViewColor,
        borderWidth: 1,
        marginBottom: 30,
        paddingLeft: 10,
        borderRadius: 20,
        fontSize: 18,
        backgroundColor: "#FFF",
      },
      button: {
        backgroundColor: colors.tabViewColor,
        padding: 10,
        borderRadius: 5,
        width: "80%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginTop: 50
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "700",
      },
});



export default SignInScreenStyle;
