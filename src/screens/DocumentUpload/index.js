import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, Alert, } from 'react-native';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';

const DocumentUpload = () => {
    const [documentType, setDocumentType] = useState('');
    const [description, setDescription] = useState('');
    const [documentPreview, setDocumentPreview] = useState(null);


    const handleUpload = () => {
        // Logic to handle document upload
    };

    const handleOnSelectFile = async () => {
        try {
            const file = await DocumentPicker.getDocumentAsync();
        } catch (error) {
            Alert.alert(error?.message)
        }
    }

    return (
        <View style={styles.container}>
            {documentPreview && (
                <Image source={documentPreview} style={styles.previewImage} />
            )}
            <Text>Document Type:</Text>
            <Picker
                selectedValue={documentType}
                onValueChange={(itemValue) => setDocumentType(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Image" value="image" />
                <Picker.Item label="PDF" value="pdf" />
            </Picker>

            <Text>Description:</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />

            <Button title={documentPreview ? "Upload" : "Select Document"} onPress={documentPreview ? handleUpload : handleOnSelectFile} />
        </View>
    );
};

export default DocumentUpload