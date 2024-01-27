import React, {useState} from 'react';
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
import {windowWidth} from '../../utils/Dimentions';
import { freeGames,paidGames, sliderData } from '../../data/dataArrays';
import ListItem from '../../components/ListItem/ListItem';


export default function NewsListScreen({navigation}) {


  const [gamesTab, setGamesTab] = useState(1);

  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setGamesTab(value);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}> 
      <ScrollView style={{padding: 20}}>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
                <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
                      ASP Pazzia
                </Text>
          <ImageBackground
              source={require('../../../assets/trainers/pazzia.jpeg')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
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
            style={{marginRight: 5}}
          />
          <TextInput placeholder="Search" />
        </View>

        <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Updated News
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{color: '#0aada8'}}>See all</Text>
          </TouchableOpacity>
        </View>


        <Carousel  
        
        ref={c => {
            this._carousel = c;
          }}
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={windowWidth - 40}
          itemWidth={300}
          loop={true}
        />

<View style={{marginVertical: 20}}>
          <CustomSwitch
            selectionMode={1}
            option1="Top Events"
            option2="Orders & Instructions"
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        {gamesTab == 1 &&
          freeGames.map(item => (
            <ListItem
              key={item.id}
              photo={item.poster}
              title={item.title}
              subTitle={item.subtitle}
              isFree={item.isFree}
              onPress={() =>
                navigation.navigate('Beat', {
                  title: item.title,
                  id: item.id,
                })
              }
            />
          ))}
        {gamesTab == 2 &&
          paidGames.map(item => (
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