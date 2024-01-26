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

    return (
        <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Image
                        source={{ uri: "https://firebasestorage.googleapis.com/v0/b/acoy-1fede.appspot.com/o/beats%2F6361688images.jpeg?alt=media&token=f73aafb4-b3e2-4bba-9958-089d7e1bed10" }}
                        style={styles.image}
                    />
                </View>
            </View>
        </Modal >
    );
});

export default BeatPreview;
