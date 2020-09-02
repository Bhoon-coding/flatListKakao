import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import PngSearch from "./assets/images/search.png";
import PngSetting from "./assets/images/setting.png";
import PngShare from "./assets/images/share.png";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import DATA from "./data";

// const renderItem = ({ item }) => {
//   return (
//     <View style={styles.itemContainer}>
//       <View>
//         <Text>user id : {item.userId}</Text>
//       </View>
//       <View>
//         <Text>id : {item.id}</Text>
//       </View>
//       <View>
//         <Text>title : {item.title}</Text>
//       </View>
//       <View>
//         <Text>body : {item.body}</Text>
//       </View>
//     </View>
//   );
// };

const LIMIT = 5;

export default function kakaoPage() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = () => {
  //   setLoading(true);
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => res.json())
  //     .then((res) => setData(data.concat(res.slice(offset, offset + LIMIT))))
  //     .then(() => {
  //       setOffset(offset + LIMIT);
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       // 여기서 'e'는 error , 성공했으면 .then , error가 나면 .catch
  //       setLoading(false);
  //     });
  // };

  // const onEndReached = () => {
  //   if (loading) {
  //     return;
  //   } else {
  //     getData();
  //   }
  // };

  const renderGame = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        margin: 15,
      }}
    >
      <TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={{ uri: item.src }} style={styles.tinyImage} />
          <View style={{ width: 60 }}>
            <Text style={{ textAlign: "center" }}>{item.game} </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderRCGame = ({ item }) => (
    <TouchableOpacity>
      <View>
        <ImageBackground
          resizeMode="stretch"
          source={{ uri: item.src }}
          style={styles.ImageBackgroundStyle}
        >
          <View style={styles.textBoldUnderlineWrapper}>
            <View>
              <Text style={styles.textBoldUnderline}>2시간 남음</Text>
            </View>
            <View style={styles.spaceBetween}>
              <TouchableOpacity>
                <Image source={PngShare} style={styles.headerImage} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 20 }}>
                <Text style={styles.textBoldUnderline}>▷게임하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );

  const renderData = ({ item }) => {
    return (
      <TouchableOpacity style={styles.rowCenter}>
        <Image style={styles.image} source={{ uri: item.src }} />
        <View style={styles.gameTextWrapper}>
          <Text style={styles.gameTitle}>{item.game}</Text>
          <Text style={styles.gameTextOpacity}>{item.text}</Text>
          <View>
            <Text style={styles.gameTextOpacity}>
              👥 {item.people}만 플레이
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.body}>
      <StatusBar />
      <SafeAreaView style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>게임별</Text>
        </View>
        <View style={styles.headerImagesWrapper}>
          <Image style={styles.headerImage} source={PngSearch} />
          <Image style={styles.headerImage} source={PngSetting} />
        </View>
      </SafeAreaView>
      <ScrollView>
        <Image
          style={styles.mainImage}
          source={{
            uri:
              "https://playgame-img.kakaogame.com/production/images/101w-2020-06-23/14-41-13-367/screenShot.jpeg",
          }}
        />

        <FlatList
          ListHeaderComponent={
            <View style={styles.spaceBetween}>
              <Text>게임별 핫 게임</Text>
              <TouchableOpacity>
                <Text>전체보기</Text>
              </TouchableOpacity>
            </View>
          }
          data={hotGame}
          renderItem={renderGame}
          keyExtractor={(game) => game.id}
          style={{ margin: 20 }}
          numColumns={4}
        />

        <FlatList
          ListHeaderComponent={
            <View style={[styles.flexStart, { margin: 10 }]}>
              <Text>병훈님을 위한 맞춤 추천</Text>
            </View>
          }
          data={recommendGame}
          renderItem={renderRCGame}
          keyExtractor={(game) => game.id}
        />

        <FlatList
          ListHeaderComponent={
            <View style={{ margin: 10 }}>
              <Text>게임 목록</Text>
            </View>
          }
          data={hotGame}
          renderItem={renderData}
        />
        {/* <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.8}
          ListFooterComponent={loading && <ActivityIndicator />}
        /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#e5e5e5",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 100,
    backgroundColor: "#e5e5e5",
  },
  headerLeft: {
    marginLeft: 10,
  },
  headerText: {
    fontSize: 17,
  },
  headerImagesWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "15%",
    marginRight: 10,
  },
  headerImage: {
    width: 20,
    height: 20,
  },

  mainImage: {
    width: "100%",
    height: 350,
    resizeMode: "stretch",
    marginBottom: 20,
  },
  itemContainer: {
    padding: 8,
  },
  rowCenter: {
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tinyImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  flexStart: {
    alignItems: "flex-start",
  },
  ImageBackgroundStyle: {
    marginBottom: 30,
    height: 150,
  },
  textBoldUnderlineWrapper: {
    height: 130,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    margin: 10,
  },
  textBoldUnderline: {
    textDecorationLine: "underline",
    textDecorationColor: "black",
    color: "black",
    fontWeight: "bold",
    fontSize: 17,
  },
  gameTextWrapper: {
    justifyContent: "space-around",
    height: 100,
    margin: 10,
  },
  gameTitle: { fontSize: 16, fontWeight: "600" },
  gameTextOpacity: { fontWeight: "100" },
});

const hotGame = [
  {
    id: "1",
    game: "애니팡4",
    text: "다시 한 팡 붙자! 애니팡4!",
    people: 180,
    src:
      "https://playgame-img.kakaogame.com/production/images/j7eg-2020-06-23/13-58-08-879/appIcon.png",
  },
  {
    id: "2",
    game: "달빛조각사",
    text: "모험가들의 꿈! 달빛조각사",
    people: 260,
    src:
      "https://playgame-img.kakaogame.com/production/images/jjkt-2020-04-21/11-47-10-291/appIcon.jpeg",
  },
  {
    id: "3",
    game: "쿵야 캐치마인드",
    text: "빵터지는 모바일 그림퀴즈 게임!",
    people: 320,
    src:
      "https://playgame-img.kakaogame.com/production/images/t9e4-2019-10-15/23-20-48-778/appIcon.png",
  },
  {
    id: "4",
    game: "테라 클래식",
    text: "같지만 또 다른 세계, 테라 클래식!",
    people: 70,
    src:
      "https://playgame-img.kakaogame.com/production/images/1j22-2019-08-09/14-13-27-593/appIcon.jpeg",
  },
  {
    id: "5",
    game: "프렌즈레이싱",
    text: "프렌즈와 함께 밟아버려씽!",
    people: 670,
    src:
      "https://playgame-img.kakaogame.com/production/images/0ujp-2020-02-20/15-06-34-246/appIcon.png",
  },
  {
    id: "6",
    game: "엘더스크롤:블레이드",
    text: "오리지널 엘더스크롤 시리즈의 신작",
    people: 300,
    src:
      "https://playgame-img.kakaogame.com/production/images/g1vq-2020-07-15/16-54-20-485/appIcon.jpeg",
  },
  {
    id: "7",
    game: "가디언 테일즈",
    text: "띵작 어드벤쳐 가디언테일즈",
    people: 160,
    src:
      "https://playgame-img.kakaogame.com/production/images/npr3-2020-06-30/11-09-04-344/appIcon.png",
  },
  {
    id: "8",
    game: "프렌즈타워",
    text: "손 끝으로 그리는 퍼즐, 프렌즈타워",
    people: 190,
    src:
      "https://playgame-img.kakaogame.com/production/images/l8yf-2020-03-12/10-40-15-851/appIcon.png",
  },
];

const recommendGame = [
  {
    id: "1",
    name: "윈드러너",
    shareImg: PngShare,
    src:
      "https://playgame-img.kakaogame.com/production/images/zmxb-2019-01-15/19-59-22-945/screenShot.jpeg",
  },
  {
    id: "2",
    name: "쿠키런",
    shareImg: PngShare,
    src:
      "https://playgame-img.kakaogame.com/production/images/v3t8-2019-01-15/18-19-54-026/screenShot.jpeg",
  },
  {
    id: "3",
    name: "프렌즈레이싱",
    shareImg: PngShare,
    src:
      "https://playgame-img.kakaogame.com/production/images/hoh6-2019-05-07/19-19-46-205/screenShot.png",
  },
];
