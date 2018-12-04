import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator, FlatList, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');
export default class Com extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showSwiper: false,
      bannerList: [],
      listPage: 1,
      girlsList: [],
    }
  }
  renderSwiper (arr) {
    if(this.state.showSwiper) {
      return (
        <Swiper
          style={styles.wrapper}
          height={width * 40 / 75}
          showsButtons={false}
          removeClippedSubviews={false} //这个很主要啊，解决白屏问题
          autoplay={true}
          horizontal ={true}
          paginationStyle={styles.paginationStyle}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
        >
          {
            arr.map((item, index) => {
              return <Image key={index} source={{ uri: item.pic }} style={styles.bannerImg}></Image>
            })
          }
        </Swiper>
      )
    } else {
      return (
        <View style={styles.wrapper}>
          <Image source={{ uri: arr[0].pic }} style={styles.bannerImg} />
        </View>
      )
    }
  }
  fetchBannerData () {
    const Banner_URl = 'https://webservice.juanpi.com/api/getIndexFirstPaintInfo?cid=&zy_ids=p8_c4_l4_0&app_name=zhe&app_version=&platform=&catname=newest_zhe';
    fetch(Banner_URl).then(res => res.json()).then(data => {
      console.log(data.adsInfo.slide_ads.config.slide)
      this.setState({
        showSwiper: true,
        bannerList: data.adsInfo.slide_ads.config.slide
      })
    })
  }
  fetchListData () {
    const List_URl = 'http://route.showapi.com/126-2?showapi_appid=79073&showapi_sign=1fbe0cb4957a45b5a40ce20d5be0a18e&page=' + this.state.listPage;
    fetch(List_URl).then(res => res.json()).then(data => {
      console.log(data.showapi_res_body.pagebean.contentlist)
      this.setState({
        girlsList: data.showapi_res_body.pagebean.contentlist,
      })
    })
  }
  componentDidMount () {
    this.fetchBannerData();
    this.fetchListData()
  }
  render () {
    if (this.state.bannerList.length > 0) {
      return (
        <View style={styles.container}>
          {
            this.renderSwiper(this.state.bannerList)
          }
          <Text>nihao</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height:width * 40 / 75,
  },
  wrpaper: {
    width: width,
    height:width * 40 / 50,
  },
  bannerImg: {
    marginTop: 44,
    width: width,
    height:width * 40 / 100,
  },
  paginationStyle: {
    bottom: 6,
  },
  dotStyle: {
    width: 22,
    height: 3,
    backgroundColor: '#fff',
    opacity: 0.4,
    borderRadius: 0,
  },
  activeDotStyle: {
    width: 22,
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 0,
  },
});