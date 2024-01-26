import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/Dimentions';

const styles = StyleSheet.create({
    container: {

    },
    contentContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        width: windowWidth * 0.8,
        marginVertical: windowHeight / 3,
        padding: 20,
        borderRadius: 8,
    },
    chooseText: {},
    textButton: {
        marginVertical: 10,
    },
});

export default styles;