// In App.js in a new project

import * as React from 'react';
import { View, Text ,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const SettingsStack = createStackNavigator();


class Home extends React.Component{
    _goSettings=()=>{
        let params = {screen:'Wifi',params:{uname:'john'}}//传参
        this.props.navigation.navigate('Settings',params)//跳转
    }
    render(){
        return(
            <View>
                <Text style={{fontSize:22,color:'red'}}>Home Screen</Text>
                <Button onPress={this._goSettings} title="go settings"></Button>
            </View>
        );
    }
}

class Settings extends React.Component{
    render(){
      
        return(
            // <Text>Settings hellow : {this.props.route.params.uname}</Text>//接收传递过来的值
            <SettingsStack.Navigator initialRouteName="BlueTooth">
                <SettingsStack.Screen name="Wifi" component={Wifi}/>
                <SettingsStack.Screen name="BlueTooth" component={BlueTooth}/>
            </SettingsStack.Navigator>
        )
    }
}

class Wifi extends React.Component{
    render(){
        return(
            <View>
                <Text>Wifi:{this.props.route.params.uname}</Text>
                <Button onPress={()=>this.props.navigation.navigate('BlueTooth')} title="go BlueTooth"></Button>
            </View>
        )
    }
}
class BlueTooth extends React.Component{
    render(){
        return(
            <Text>BlueTooth</Text>
        )
    }
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      {/* initialRouteName 设置主页 第一个页面 */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />   
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;