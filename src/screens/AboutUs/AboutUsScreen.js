import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { recipes, trainers } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import {
  getIngredientName,
  getTrainersName,
  getTrainersById,
} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";

const { width: viewportWidth } = Dimensions.get("window");

export default function AboutUsScreen(props) {
  const { navigation, route } = props;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        {/* <Text style={styles.infoRecipeName}> Mambooo </Text> */}
        <Text style={styles.infoDescriptionRecipe}>
          Ramadhani A. Mungi - SACP Commandant TANZANIA POLICE SCHOOL- MOSHI is
          viewed as a better policing and security training institution based on
          preparing competent police officers in physical, mental and
          technological outlook. The school is in conducive and attractive
          environment, located at the foot of Mount Kilimanjaro which is the
          highest mountain in Africa with well conserved areas.” Vision To be as
          a good school which produces police officers of reputation. Mission By
          providing quality trainings which focus on professionalism. core
          values • Professionalism • Patriotism • Integrity • Accountability •
          Commitment • Transparency A - COMPANY Message from OC - A Coy Pazzia
          Mgaa Stephen - ASP OC - A Coy “ A COY - is viewed as a better policing
          and security training Company based on preparing competent police
          officers in physical, mental and technological outlook. The Company is
          in conducive and attractive environment, located at Tanzania Police
          School – Moshi. TEAM A COY APP
        </Text>
        <Text style={styles.infoDescriptionRecipe}>
          This Application was created under supervision of ASP Pazzia - OC A
          Coy and E.3143 Sgt Mdoe Former - A Coy Sir Major , who provided the
          Idea to the following recruits who manage to create the application :-
          *WP.14014 RC Mary J.6172 RC Nassir J.5974 RC Cyprian*
        </Text>
      </View>
    </ScrollView>
  );
}
