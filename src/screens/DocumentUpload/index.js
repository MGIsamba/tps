import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { auth, db } from '../../../firebase';
import uploadFile from '../../services/uploadFile';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import CheckButton from '../../components/CheckButton';
import Ionicon from 'react-native-vector-icons/Ionicons';


const DocumentUpload = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [documentType, setDocumentType] = useState('pdf');
    const [description, setDescription] = useState('');
    const [documentPreview, setDocumentPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                return Alert.alert("Login to upload document");
            } else if (!title) {
                return Alert.alert("Please enter title");
            } else if (!documentPreview) {
                return Alert.alert("Please select a document");
            } else if (!description) {
                return Alert.alert("Please enter description");
            }

            setLoading(true);
            const response = await uploadFile(documentPreview, "beats");

            await addDoc(collection(db, "beats"), {
                type: documentType,
                description,
                url: response,
                title: title,
                uid: user.uid,
                createdAt: new Date().toISOString(),
            });

            setLoading(false);
            setDocumentPreview(null);
            setDocumentType('');
            setDescription('');
            setTitle('');

            Alert.alert("Document uploaded successfully");
            navigation.navigate("Beat");
        } catch (error) {
            setLoading(false);
            Alert.alert("Error uploading document", error?.message || "An unknown error occurred");
        }
    };

    const handleOnSelectFile = async () => {
        try {
            let allowedTypes;
            if (documentType === "pdf") {
                allowedTypes = "application/pdf";
            } else {
                allowedTypes = "image/*";
            }

            const response = await DocumentPicker.getDocumentAsync({
                type: allowedTypes,
            });

            if (response.type === "cancel") return;
            setDocumentPreview(response);
        } catch (error) {
            Alert.alert("Error selecting document", error?.message || "An unknown error occurred");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.sectionContainer}>
                <Text style={styles.titleText}>Title</Text>
                <TextInput
                    style={styles.titleInput}
                    value={title}
                    onChangeText={setTitle}
                />
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.titleText}>Document Type:</Text>
                <View style={styles.rowContainer}>
                <CheckButton
                        lable="PDF"
                        check={documentType === "pdf"}
                        onPress={() => setDocumentType("pdf")}
                    />
                    <CheckButton
                        lable="Image"
                        check={documentType === "img"}
                        onPress={() => setDocumentType("img")}
                    />
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.titleText}>Description:</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setDescription}
                />
            </View>

            {documentPreview && (
                <View style={styles.sectionContainer}>
                    <Text style={styles.titleText}>Selected Document:</Text>
                    <View style={styles.rowContainer}>
                        <Text style={{ marginTop: 10 }}>{documentPreview.name}</Text>
                        <TouchableOpacity
                            onPress={() => setDocumentPreview(null)}
                            style={{ marginLeft: 10 }}
                        >
                            <Ionicon
                                name="close-circle"
                                size={35}
                                color={"red"}
                                onPress={() => setDocumentPreview(null)}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={styles.buttonContainer}>
                <Button
                    title={loading ? "Uploading..." : (documentPreview ? "Upload" : "Select Document")}
                    onPress={documentPreview ? handleUpload : handleOnSelectFile}
                    disabled={loading}
                />
            </View>
        </View>
    );
};

export default DocumentUpload;
