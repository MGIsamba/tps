import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../../styles/AddPost';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
//import ImagePicker from 'react-native-image-crop-picker';
//import ImagePicker from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker'

const AddPostScreen = () => {


  const [image, setImage] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.launchCameraAsync({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((result) => {
      console.log(result);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
  
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.launchImageLibraryAsync({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    
    });
  };

  return (
    <View style={styles.container}>
    <InputWrapper>

   
       {image != null ? <AddImage source={{uri: image}} /> : null}


              <InputField
                  placeholder="What's on your mind?"
                  multiline
                  numberOfLines={4}

              />

    </InputWrapper>

          <ActionButton buttonColor="#2e64e5">
              <ActionButton.Item
                buttonColor="#9b59b6"
                title="Take Photo"
                onPress={takePhotoFromCamera}>
                <Icon name="camera-outline" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor="#3498db"
                title="Choose Photo"
                onPress={choosePhotoFromLibrary}>
                <Icon name="md-images-outline" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>


      </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

