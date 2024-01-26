import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-snap-carousel';
import CustomSwitch from '../../components/CustomSwitch/CustomSwitch';
import BannerSlider from '../../components/Banner/BannerSlider';
import { windowWidth } from '../../utils/Dimentions';
import { recruitsEvents, trainerEvents, sliderDataEvent } from '../../data/dataArrays';
import ListItem from '../../components/ListItem/ListItem';
import MenuImage from "../../components/MenuImage/MenuImage";
import Ionicons from "react-native-vector-icons/Ionicons";
import UploadMenu from '../../components/UploadMenu';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import pdfIcon from '../../../assets/pdf.png';
import BeatPreview from '../../components/BeatPreview';


const BeatListScreen = ({ navigation }) => {
  const uploadMenuRef = React.createRef();
  const beatPreviewRef = React.createRef();

  const [gamesTab, setGamesTab] = useState(1);
  const [beats, setBeats] = useState([]);

  //using firebase to get data from firestore beats collection and snapshot it

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "beats"), (snapshot) => {
      const beats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBeats(beats);
    });
    return unsubscribe;
  }, []);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setGamesTab(value);
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          marginRight: 10,
        }}
        onPress={() => uploadMenuRef?.current?.open()}
      >
        <Ionicons name="add" size={30} color="black" />
      </TouchableOpacity >
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <UploadMenu
        ref={uploadMenuRef}
      />
      <BeatPreview ref={beatPreviewRef} />
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}>
            ASP Pazzia
          </Text>
          <ImageBackground
            source={require('../../../assets/trainers/pazzia.jpeg')}
            style={{ width: 35, height: 35 }}
            imageStyle={{ borderRadius: 25 }}
          />
        </View>


        <View
          style={{
            flexDirection: 'row',
            borderColor: '#C6C6C6',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
          }}>
          <Feather
            name="search"
            size={20}
            color="#C6C6C6"
            style={{ marginRight: 5 }}
          />
          <TextInput placeholder="Search" />
        </View>

        <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium' }}>
            Events on Beats,Patrol & Trainers Duties.
          </Text>
          <TouchableOpacity onPress={() => { }}>
            <Text style={{ color: '#0aada8' }}>See all</Text>
          </TouchableOpacity>
        </View>


        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={sliderDataEvent}
          renderItem={renderBanner}
          sliderWidth={windowWidth - 40}
          itemWidth={300}
          loop={true}
        />

        <View style={{ marginVertical: 20 }}>
          <CustomSwitch
            selectionMode={1}
            option1="Recruits Beats & Patrols"
            option2="Trainers TimeTables"
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        {gamesTab == 1 &&
          beats.map(item => (
            <ListItem
              key={item.id}
              photo={item?.type === "pdf" ? pdfIcon : { uri: item?.url }}
              title={item.title}
              // subTitle={item.subtitle}
              // isFree={item.isFree}
              isFree={"Yes"}
              onPress={() => beatPreviewRef?.current?.open()}
            />
          ))}
        {gamesTab == 2 &&
          trainerEvents.map(item => (
            <ListItem
              key={item.id}
              photo={item.poster}
              title={item.title}
              subTitle={item.subtitle}
              isFree={item.isFree}
              price={item.price}
              onPress={() =>
                navigation.navigate('Beat', {
                  title: item.title,
                  id: item.id,
                })
              }
            />
          ))}
      </ScrollView>
    </SafeAreaView>

  )

}
export default BeatListScreen;