import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, Modal, Button } from 'react-native';
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

                </View>
            </View>
        </Modal >
    );
});

export default BeatPreview;
