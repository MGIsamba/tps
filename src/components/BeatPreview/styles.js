import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/Dimentions';

const styles = StyleSheet.create({
    container: {

    },
    contentContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonContainer: {
        backgroundColor: "#fff",
        width: windowWidth,
        height: windowHeight * 0.9,
        padding: 10,
        borderRadius: 8,
    },
    chooseText: {},
    textButton: {
        marginVertical: 10,
    },
});

export default styles;