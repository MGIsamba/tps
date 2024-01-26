import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, Modal, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const BeatPreview = forwardRef((props, ref) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        open() {
            setModalVisible(true);
        },
        close() {
            setModalVisible(false);
        }
    }));

    const handleOnNavigateToUploadDoc = () => {
        setModalVisible(false);
        navigation.navigate("DocumentUpload")
    }

    return (
        <Modal visible={modalVisible}
            style={styles.container}
            animationType="fade"
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Image
                        source={{ uri: "https://firebasestorage.googleapis.com/v0/b/acoy-1fede.appspot.com/o/beats%2F1783299PYTHON%20PROGRAMMING%20NOTES.pdf?alt=media&token=0cdfa434-1d13-467e-9d19-568a541a7734" }}
                        style={styles.image}
                    />
                </View>
            </View>
        </Modal >
    );
});

export default BeatPreview;
