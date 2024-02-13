import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { db, auth } from "../../../firebase";
import { getDoc, doc } from "firebase/firestore";
import CustomButton from "../../components/CustomButton";

const ProfileScreen = ({ navigation, route }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const getUser = async () => {
    const userId = route.params ? route.params.userId : auth.currentUser.uid;

    const userDocRef = doc(db, "users", userId);

    try {
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userDetails = userDocSnapshot.data();
        setUserDetails(userDetails);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const getCurrentUser = async () => {
    const currentUserId = auth.currentUser.uid;

    const userDocRef = doc(db, "users", currentUserId);

    try {
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const currentUser = userDocSnapshot.data();
        setCurrentUser(currentUser);
      }
    } catch (error) {
      console.error("Error fetching current user data: ", error);
    }
  };

  useEffect(() => {
    getUser();
    getCurrentUser();
  }, [route.params]);

  const updateProfileImage = (imageUrl) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      userImg: imageUrl,
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.userImg}
          source={{
            uri: userDetails
              ? userDetails.userImg ||
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
              : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
          }}
        />
        <Text style={styles.userName}>{userDetails ? userDetails.fullName : "no user Id seen"}</Text>
        <Text style={styles.aboutUser}>{userDetails ? userDetails.about : "No user about available"}</Text>
        <View style={styles.userBtnWrapper}>
          {currentUser && userDetails && currentUser.userId === userDetails.userId ? ( // Check if the current user matches the user whose profile is being viewed
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}>
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
        {/* <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View> */}
        {/* {posts.map((item) => (
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
        ))} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});
