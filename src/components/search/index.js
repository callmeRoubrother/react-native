import React from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';

export default class Com extends React.Component {
  static navigationOptions = {
    title: '搜索'
  };
  constructor (props) {
    super(props);
    this.state= {
      searchVal: '',
      searchList: [],
      searchPage: 1,
    }
  }
  changeVal () {
    console.log('111111')
  }
  endEdit () {
    this.fetchData(this.state.searchVal);
  }
  fetchData (val, page) {
    page = page || 1;
    const search_URL = 'https://api.beibei.com/mroute.html?method=beibei.item.search&keyword=' + val + '&page=' + page + '&page_size=20&source=pintuan&sort=undefined';
    fetch(search_URL).then(res => res.json()).then(data => {
      console.log(data.search_items)
      this.setState({
        searchList: [...this.state.searchList, ...data.search_items],
      })
    })
  }
  reFresh () {
    this.setState({
      searchPage: Math.round(Math.random()*100),
      searchList: []
    });
    console.log(this.state.searchVal, this.state.searchPage);
    this.fetchData(this.state.searchVal, this.state.searchPage);
  }
  endPushList () {
    this.state.searchPage += 1;
    this.fetchData(this.state.searchVal, this.state.searchPage);
  }
  renderList () {
    if (this.state.searchList.length > 0) {
      console.log(this.state.searchList)
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            ref='list'
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            data={this.state.searchList}
            onEndReachedThreshold={0.4}
            refreshing={false}
            horizontal={false}
            numColumns={2}
            onRefresh={() => {this.reFresh()}}
            onEndReached={(info: {distanceFromEnd: 100}) => this.endPushList()}
            renderItem={({item, index}) => {
              return (
                <View style={styles.list_item}>
                  <Image source={{ uri: item.img }} key={index} style={styles.itemImg}/>
                  <View style={{ paddingLeft: 5 }}>
                    <Text numberOfLines={1} style={{ lineHeight: 26 }}>{item.title}</Text>
                  </View>
                  <View style={styles.priceInfo}>
                    <Text style={styles.price}>{item.item_price}</Text>
                    <Text style={{ color: '#999', paddingLeft: 5, lineHeight: 26 }}>{item.buying_info}</Text>
                  </View>
                </View>
              )
            }}
          ></FlatList>
        </View>
      )
    } else {
      return (
        false
      )
    }
  }
  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.searchView}>
          <TextInput
            style={styles.search}
            maxLength={20}
            onChange={this.changeVal}
            onEndEditing={this.endEdit.bind(this)}
            onChangeText={(searchVal) => {this.setState({searchVal}); console.log(this.state.searchVal)}}
            placeholder='请输入搜索内容'
          ></TextInput>
          <Text style={{ width: 40, height: 30, textAlign: 'center', lineHeight: 30 }}>取消</Text>
        </View>
        <View style={{ width: '100%', height: 40, flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomStyle: 'solid'}}>
          <Text style={styles.selectItem}>综合</Text>
          <Text style={styles.selectItem}>销量</Text>
          <Text style={styles.selectItem}>价格</Text>
        </View>
        <View style={styles.list_cover}>
          {
            this.renderList()
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchView: {
    width: '100%',
    height: 30,
    paddingLeft: 20,
    flexDirection: 'row',
    marginTop: 44
  },
  search: {
    flex: 1,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
  },
  selectItem: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 40,
  },
  list_cover: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',
  },
  list_item: {
    overflow: 'hidden',
    backgroundColor: 'white',
    height: 240,
    width: '49%',
    marginRight: 5,
  },
  itemImg: {
    width: '100%',
    height: 180,
  },
  priceInfo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    lineHeight: 26,
    paddingLeft: 5,
  },
  price: {
    color: 'red',
    fontSize: 22,
    paddingLeft: 10,
  },
  separator: {
    borderBottomWidth: .5,
    borderBottomColor: '#999',
    marginBottom: 2,
  },
});
