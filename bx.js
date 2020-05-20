import React, { Component } from 'react'
import { Text, View ,FlatList , Button , Image ,TouchableHighlight, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const SettingsStack = createStackNavigator();

class yq extends Component{
    render(){
        return(
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:10}}>
                <Image style={{width:220,height:220}} source={{uri:this.props.route.params.img}}/>
                <Text>歌曲名称:{this.props.route.params.name}</Text>
                <Text>歌手:{this.props.route.params.singer}</Text>
            </View>
        )
    }
}
class bx extends Component {
    constructor(){
        super()
        this.max=7
        this.state = {data:[],albums:[],color:'red',size:'10'}
    }
    componentDidMount(){
        fetch("http://www.cjlly.com:3041/record",{method:'GET'})
        .then(resp=>resp.json())
        .then(albums=>{
            // console.log(albums)
            let a = []
            for(let i = 0 ; i<this.max ; i++){
                a.push(albums[i])
            }
            this.setState({albums:a})
        })
    }
    _del=(id)=>{
        let data=this.state.albums.splice(0)
        // let index = data.findIndex(album=>{album.id === id})
        let index=data.findIndex(album=>album.id===id)
        data.splice(index,1)
        this.setState({albums:data})
        // console.log(id)
    }
    // _go=()=>{
    //     // console.log(111)
    //     // let params = {screen:'yq',params:{uname:'11111'}}//传参
    //     // this.props.navigation.navigate('yq',params)//跳转
    //     let params = {name:11}
    //     this.props.navigation.navigate('yq',params)
    //     // console.log(params)
    // }
    _go(item){
        let params = item
        this.props.navigation.navigate('yq',params)
    }
    _renderItem=({item,index})=>{
        return(
            <TouchableHighlight onPress={()=>this._go(item)} underlayColor='white'>
                <View style={{height:90,flexDirection:"row",marginTop:0}}>
                <Text style={[styles.tex,{color:item.id<=3?this.state.color:'#ccc'},{fontSize:item.id<=3?20:10}]}>{index+1}</Text>
                    <View style={{justifyContent:"flex-start", flexDirection: "row",alignItems:"center",flexGrow:1}}>
                        <Image style={{width:80,height:80,marginRight:30,marginTop:0}} source={{uri:item.img}}/>
                    </View>
                    <View style={{flexDirection: "row",alignItems:"center",justifyContent:'space-between',flexGrow:1}}>
                        <Text style={{width:90}}>{item.name}</Text>
                        <TouchableHighlight style={{width:50,borderRadius:5}} underlayColor='#5C9DE5' activeOpacity={0.5} 
                            onPress={()=>this._del(item.id)}>
                            <Text style={styles.button}>删除</Text>
                        </TouchableHighlight>
                    </View> 
                    {/* <Button onPress={()=>this._del(item.id)} title="删除"></Button> */}
                </View>
            </TouchableHighlight>   
        )
    }
    _ItemSeparatorComponent=()=>{
        return(
            <View style={{height:1}}></View>
        )
    }
    _refresh=()=>{
        //刷新的是数据
        let d=Math.floor(Math.random()*100+100)
        let data = this.state.data.splice(0)//赋值给data并清空this.state.data中的内容
        data.unshift(d)//arr0.unshift('new1','new2');//插入到数组前面，所有的元素自动后移
        this.setState({data:data})
    }
    _reachEnd=()=>{
        console.log(1111)
        fetch("http://www.cjlly.com:3041/record",{method:'GET'})
        .then(resp=>resp.json())
        .then(albums=>{
            // console.log(albums)
            this.max = this.max+5
            if(this.max >= albums.length){
                this.max = albums.length
            }
            let a = []
            for(let i = 0 ; i<this.max ; i++){
                a.push(albums[i])
            }
            this.setState({albums:a})
        })
    }

    render() {
        return (
                <FlatList 
                    ListEmptyComponent={<Text>数据是空</Text>}//若flatlist...data数据为空时,则显示
                    keyExtractor={(item,index)=>index}//给循环的数组下标key
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    //ItemSeparatorComponent 行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。
                    data={this.state.albums} 
                    //从data中挨个取出数据并渲染到列表中。
                    renderItem={this._renderItem}
                    onEndReached={this._reachEnd}//罚值
                    onEndReachedThreshold={0.2}
                />
        )
    }
}
function App(){
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="bx">
          {/* initialRouteName 设置主页 第一个页面 */}
            <Stack.Screen name="bx" component={bx} options={{title:'流行音乐排行榜'}}/>
            <Stack.Screen name="yq" component={yq} options={{title:'详情'}}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App 
const styles = StyleSheet.create({
    container:{color:'red'},content:{color:'green'},
    button:{backgroundColor:'#5C9DE5',width:50,height:30,borderRadius:5,textAlign:"center",textAlignVertical:'center'},
    con:{color:'yellow'},
    tex:{marginLeft:5,marginRight:5,marginTop:0}
})