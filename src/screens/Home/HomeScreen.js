import React, { useLayoutEffect, useEffect, useState} from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage"; 
//import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostCard from '../../components/Post/PostCard';
import {Container,} from '../../styles/FeedStyles';

const HomeScreen = ({navigation}) => {

  const Posts = [
    {
      id: '1',
      userName: 'INSP Simtoe',
      userImg: require('../../../assets/users/user-3.jpg'),
      postTime: '4 mins ago',
      post:
        'Mafunzo Maalumu ya kuwaongezea Walimu uwezo na maarifa zaidi',
      postImg: require('../../../assets/posts/post-img-3.jpg'),
      liked: true,
      likes: '14',
      comments: '5',
    },
    {
      id: '2',
      userName: 'ASP Pazzia',
      userImg: require('../../../assets/users/user-1.jpg'),
      postTime: '2 hours ago',
      post:
        'Mafunzo Maalumu ya kuwaongezea Walimu uwezo na maarifa zaidi',
      postImg: 'none',
      liked: false,
      likes: '8',
      comments: '0',
    },
    {
      id: '3',
      userName: 'A/INSP John',
      userImg: require('../../../assets/users/user-4.jpg'),
      postTime: '1 hours ago',
      post:
        'Mafunzo Maalumu ya kuwaongezea Walimu uwezo na maarifa zaidi',
      postImg: require('../../../assets/posts/post-img-2.jpg'),
      liked: true,
      likes: '1',
      comments: '0',
    },
    {
      id: '4',
      userName: 'INSP Simtoe',
      userImg: require('../../../assets/users/user-3.jpg'),
      postTime: '1 day ago',
      post:
        'Mafunzo Maalumu ya kuwaongezea Walimu uwezo na maarifa zaidi',
      postImg: require('../../../assets/posts/post-img-4.jpg'),
      liked: true,
      likes: '22',
      comments: '4',
    },
    {
      id: '5',
      userName: 'ACP Msemwa',
      userImg: require('../../../assets/users/user-2.jpg'),
      postTime: '2 days ago',
      post:
        'Mafunzo Maalumu ya kuwaongezea Walimu uwezo na maarifa zaidi',
      postImg: 'none',
      liked: false,
      likes: '0',
      comments: '0',
    },
  ];


  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

 
  return (
    
      <Container>
      
      <FlatList
            data={Posts}
            renderItem={({item}) => <PostCard item={item} />}
                keyExtractor={item=>item.id}
                showsVerticalScrollIndicator={false} 
              />
           
           
      </Container>

      


      );
    };
    
  export default HomeScreen;
    








  

