import {ScrollView, FlatList, StyleSheet, SafeAreaView, Text, Image, Platform, View, Pressable, InteractionManager  } from "react-native";
import { millisToMinutesAndSeconds, useSpotifyAuth } from "./utils";
import { Themes } from "./assets/Themes";
import { getAlbumTracks } from "./utils/apiOptions";
import { getMyTopTracks } from "./utils/apiOptions";
import { useFonts } from 'expo-font';


const images = {
  logoPng: require('./assets/spotify-logo.png'),
};



const Item = ({albumImage, songTitle, albumName, songArtist, duration, index}) => (
  
  <View style={styles.songContainer}>
    <View style = {styles.subSongContainer}> 
      <Text style = {styles.indexStyle}> {index+1} </Text>
      <Image style = {styles.albumImageStyle} source = {{ uri : albumImage,}}></Image>

      <View style = {styles.songDescriptContainer}>
        <Text style={styles.songTitleStyle}>{songTitle}</Text>
        <Text style = {styles.artistStyle}> {songArtist}</Text>
      </View>
    </View>

    <View style = {styles.rightSongContainer}> 
      <Text style = {styles.txtTest}> {albumName}</Text> 
      <Text style = {styles.txtTest}> {duration}</Text>
    </View>

  </View>
 
);


export default function App() {
  let [fontsLoaded] = useFonts({
    GothamBold: require('./assets/fonts/Gotham-Bold.otf'),
  });

  // Pass in true to useSpotifyAuth to use the album ID (in env.js) instead of top tracks
  const { token, tracks, getSpotifyAuth } = useSpotifyAuth();
  

  let contentDisplayed;

  const renderItem = ({ item, index }) => (
    // <View style = {styles.songContainer}>
      <Item 
        songTitle={item.name}
        albumImage = {item.album.images[2].url}
        albumName = {item.album.name}
        songArtist = {item.album.artists[0].name}
        duration = {millisToMinutesAndSeconds(item.duration_ms)}
        index = {index}
        />
    // </View>
  );
  
  //if else to display connect or list of songs 
  if (token) {
  // // render Flatlist
  contentDisplayed = 
  <>
  {/* Top Tracks header  */}
  <View style={styles.trackContainerStyled}>
      <Image style = {styles.topTracksLogoStyle} source = {images.logoPng}/>
      <Text style={styles.toptracksStyle}> My Top Tracks </Text>
  </View>

{/* Scrollable Flatlist of top songs */}
    <ScrollView
      bounces={true}
      nestedScrollEnabled={true}
    >
        <FlatList
          data={tracks}
          renderItem={renderItem}
          keyExtractor={item => item.id} />
      </ScrollView></>

  } else {
  // render AuthButton
  contentDisplayed = 
    //connect button
    <View style = {styles.home}> 
      <Pressable
        onPress={getSpotifyAuth} 
        style = {styles.spotConnectButton}>
          <Image style={styles.logoImageStyle}
            source={images.logoPng} />
          <Text style={styles.buttonTxt}> CONNECT WITH SPOTIFY </Text>
      </Pressable>
    </View>
  };


  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
);
}


//style sheet 
const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    flex: 1,
    display: 'flex',
  },


  home: {
    display: 'flex',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  trackContainerStyled: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',

  },

  toptracksStyle: {
    fontSize: 18,
    color: Themes.colors.white,
    fontFamily: 'GothamBold',
  },


  topTracksLogoStyle: {
    height: 30,
    width: 30,
    marginRight: 5,
    
  },


  //text for alnumn name + duration  
  txtTest : {
    fontSize: 10,
    color: Themes.colors.white,
  },

  //holds each song 
  songContainer: {
    display: 'flex',
    height: 50,
    width:'100%', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    marginTop: 10,
    
  },

  //holds name + artists 
  subSongContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '50%',
  },

  //holds albumn title + duration

  rightSongContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '40%',
  },

  indexStyle: {
    fontSize: 12, 
    color: Themes.colors.white,
    paddingRight: 15,
  },

  songDescriptContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    width: '65%'
  },

  songTitleStyle: {
    color: Themes.colors.white,
    fontSize: 14,
  },

  artistStyle: {
    fontSize: 10, 
    color: Themes.colors.gray,
  },


  albumImageStyle: {
    height: 50,
    width: 50,
    paddingLeft: 5,
    paddingRight: 5,
  },

  

  




  

  //STYLES FOR BUTTON PAGE 
  spotConnectButton: {
    backgroundColor: Themes.colors.spotify,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 99999,

  },

  scbPressed: {
    backgroundColor: Themes.colors.gray,
  },


  buttonTxt: {
    fontSize: 14, 
    color: Themes.colors.white,
    fontFamily: 'GothamBold',

  },

  logoImageStyle: {
    width: 25,
    height: 25,
  },


});
