import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
// import FormButton from '../../components/FormButton';

import Animated from "react-native-reanimated";
// import BottomSheet from 'reanimated-bottom-sheet';
// import ImagePicker from 'react-native-image-crop-picker';

import * as ImagePicker from "expo-image-picker";

import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
// import {AuthContext} from '../navigation/AuthProvider';
// import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
import CustomButton from "../../components/CustomButton";
import { getDownloadURL, ref, put } from "firebase/storage";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { storage, db, firebase } from "../../../firebase";
import { uid } from "uid";
import { useAuth } from "../../utils/AuthContext";

const EditProfileScreen = ({ navigation }) => {
  // const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();
  
  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref().child(`users/${uid()}`);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("Download URL: ", url);
          setImage(url);
          blob.close();
          return url;
        });
      }
    );
  };
  const takePhotoFromCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };
  
  const currentUserDoc = doc(db, "users", user.uid);
  const getUser = async () => {

    try {
      const documentSnapshot = await getDoc(currentUserDoc);
      if (documentSnapshot.exists()) {
        console.log("User Data", documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const validateInputs = () => {
    if (!userData.fullName || !userData.about || !userData.phone || !userData.country || !userData.city) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return false;
    }
    // You can add more specific validation checks here
    return true;
  };

  const handleUpdate = async () => {
    try {
      if (!validateInputs()) return;

      let imgUrl = null;
      if (image) {
        imgUrl = await uploadImage();
      }

      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        fullName: userData.fullName,
        about: userData.about,
        phone: userData.phone,
        country: userData.country,
        city: userData.city,
        userImg: image,
      });

      console.log("User updated successfully!");
      Alert.alert(
        "Profile Updated!",
        "Your profile has been updated successfully.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Profile");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error updating user:", error);
      Alert.alert(
        "Error",
        "Failed to update profile. Please try again later."
      );
    }
  };


  useEffect(() => {
    getUser();
  }, []);

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7,
  //   }).then((image) => {
  //     console.log(image);
  //     const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
  //     setImage(imageUri);
  //     this.bs.current.snapTo(1);
  //   });
  // };


  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}
      >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={pickImage}
      >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      {/* <BottomSheet
        ref={this.bs}
        snapPoints={[330, -5]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      /> */}
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center" }}>
          {/* <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActionButton buttonColor="#2e64e5">
                <ActionButton.Item
                  buttonColor="#9b59b6"
                  title="Take Photo"
                  onPress={takePhotoFromCamera}
                >
                  <Icon name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                  buttonColor="#3498db"
                  title="Choose Photo"
                  onPress={pickImage}
                >
                  <Icon
                    name="md-images-outline"
                    style={styles.actionButtonIcon}
                  />
                </ActionButton.Item>
              </ActionButton>
            </View>
          </TouchableOpacity> */}
          {userData ? (
            <TouchableOpacity onPress={pickImage}>
              <Image source={{ uri: userData.userImg}} style={styles.image} />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity onPress={pickImage}>
                <Text>Add Picture from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={takePhotoFromCamera}>
                <Text>Add Picture from Camera</Text>
              </TouchableOpacity>
            </>
          )}

          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {userData ? userData.fullName : ""}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.fullName : ""}
            onChangeText={(txt) => setUserData({ ...userData, fullName: txt })}
            style={styles.textInput}
          />
        </View>
        {/* About Me */}
        <View style={styles.action}>
          <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="About Me"
            placeholderTextColor="#666666"
            value={userData ? userData.about : ""}
            onChangeText={(txt) => setUserData({ ...userData, about: txt })}
            autoCorrect={true}
            style={[styles.textInput, { height: 60 }]}
          />
        </View>

        {/* Phone Number */}
        <View style={styles.action}>
          <Feather name="phone" color="#333333" size={20} />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            value={userData ? userData.phone : ""}
            onChangeText={(txt) => setUserData({ ...userData, phone: txt })}
            style={styles.textInput}
          />
        </View>

        {/* Country */}
        <View style={styles.action}>
          <FontAwesome name="globe" color="#333333" size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.country : ""}
            onChangeText={(txt) => setUserData({ ...userData, country: txt })}
            style={styles.textInput}
          />
        </View>

        {/* City */}
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            color="#333333"
            size={20}
          />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.city : ""}
            onChangeText={(txt) => setUserData({ ...userData, city: txt })}
            style={styles.textInput}
          />
        </View>

        <CustomButton label="Update" onPress={handleUpdate} />
      </Animated.View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    width: "100%",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#2e64e5",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#333333",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});
