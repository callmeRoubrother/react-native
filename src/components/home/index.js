import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator, FlatList, TouchableHighlight, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { createStackNavigator } from 'react-navigation';
import Detail from '../detail';

const { width, height } = Dimensions.get('window');
class Com extends React.Component {
  static navigationOptions = {
    title: '首页'
  }
  constructor (props) {
    super(props);
    this.state = {
      showSwiper: false,
      bannerList: [],
      listPage: 1,
      girlsList: [],
      showBackTop: false,
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
  fetchListData (page) {
    page = page || 1;
    const List_URl = 'http://route.showapi.com/126-2?showapi_appid=79073&showapi_sign=1fbe0cb4957a45b5a40ce20d5be0a18e&page=' + page;
    fetch(List_URl).then(res => res.json()).then(data => {
      this.setState({
        girlsList: [...this.state.girlsList, ...data.showapi_res_body.pagebean.contentlist],
      })
      console.log(this.state.girlsList)
    })
  }
  componentDidMount () {
    this.fetchBannerData();
    this.reFresh();
  }
  _press () {
    this.props.navigation.navigate('Details')
  }
  hideUnder () {
    console.log('底层的颜色被隐藏');
  }
  showUnder () {
    console.log('底层的颜色被显示');
  }
  endPushList () {
    this.state.listPage += 1;
    this.fetchListData(this.state.listPage);
    this.setState({
      showBackTop: true,
    })
  }
  reFresh () {
    this.fetchListData();
  }
  backTop () {
    this.refs.list.scrollToIndex({
      index: 0,
    });
    this.setState({
      showBackTop: false,
    })
  }
  render () {
    if (this.state.bannerList.length > 0 && this.state.girlsList.length > 0) {
      return (
        <View style={styles.container}>
          <View style={styles.banner_Container}>
            {
              this.renderSwiper(this.state.bannerList)
            }
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              ref='list'
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              data={this.state.girlsList}
              onEndReachedThreshold={0.4}
              refreshing={false}
              onRefresh={() => {this.reFresh()}}
              onEndReached={(info: {distanceFromEnd: 100}) => this.endPushList()}
              renderItem={({item}) => {
                return (
                  <TouchableHighlight
                    onPress={() => this._press()}
                    activeOpacity={ 0.5 }
                    underlayColor='gray'
                    onHideUnderlay={this.hideUnder}
                    onShowUnderlay={this.showUnder}
                    style={{ width: width, height: 120 }}
                  >
                    <View style={styles.list_cover}>
                      <Image source={{ uri: item.avatarUrl }} style={{ height: 100, width: 200 }}></Image>
                      <View style={styles.list_desc}>
                        <Text>姓名： { item.realName }</Text>
                        <Text>城市： { item.city }</Text>
                        <Text>粉丝数：{ item.totalFanNum }</Text>
                        <Text>身高：{ item.height }</Text>
                        <Text>体重：{ item.weight }</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                )
              }}
            ></FlatList>
            {
              this.state.showBackTop === true? (<Ionicons
                name={'ios-arrow-dropup-circle'}
                size={ 50 }
                style={styles.upTop}
                onPress={this.backTop.bind(this)}
                ref='backTop'
              />) : (false)
            }
          </View>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" style={{ alignSelf: "center" }}/>
        </View>
      )
    }
  }
}

const RootStack = createStackNavigator(
  {
    Home: Com,
    Details: Detail,
  },
  {
    initialRouteName: 'Home',
  }
);
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner_Container: {
    height:width * 40 / 100,
  },
  wrpaper: {
    width: width,
    height:width * 40 / 100,
  },
  bannerImg: {
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
  list_cover: {
    flexDirection: 'row',
    width: width,
    height: 120,
    padding: 10,
  },
  list_desc: {
    paddingLeft: 10,
    textAlign: 'left',
    lineHeight: 10,
  },
  separator: {
    width: width,
    height: 1,
    backgroundColor: 'gray',
  },
  upTop: {
    position:'absolute',
    bottom: 10,
    right: 10,
  },
});