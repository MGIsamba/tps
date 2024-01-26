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
    image: {
        width: windowWidth,
        height: windowHeight / 2,
        resizeMode: "contain",
    },
});

export default styles;