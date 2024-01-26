import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, Modal, Button } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const UploadMenu = forwardRef((props, ref) => {
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
                <View style={styles.buttonContainer}>
                    <Text style={styles.chooseText}>Choose an option:</Text>
                    <View style={styles.textButton}>
                        <Button
                            title="News"
                            onPress={() => console.log('News button pressed')}
                        />
                    </View>
                    <View style={styles.textButton}>
                        <Button
                            title="Document"
                            onPress={handleOnNavigateToUploadDoc}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
});

export default UploadMenu;
