import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import CadastroScreen from "./CadastroScreen";
import ViewScreen from "./ViewScreen";
import TextScreen from "./TextScreen";
import ImageScreen from "./ImageScreen";
import TextInputScreen from "./TextInputScreen";
import ScrollScreen from "./ScrollScreen";
import GoogleScreen from "./GoogleScreen";
import UploadScreen from "./UploadScreen";
import Home from "./Home";
import SearchScreen from "./SearchScreen";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';


const styles = StyleSheet.create({
  logo:{
    width:40,
    height:40
  },

 
})


const App = () =>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}  
          options={({ navigation }) => ({
            headerTitle: () => (
              <View>
                   <Image
                      source={require('./logo.png')} 
                      style={styles.logo}
                    />
             
              </View>   
            ),
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor:"#03487a"
            },
           
          })}
      />

      <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="SearchScreen" component={SearchScreen}  
         options={({ navigation }) => ({
          headerTitle: () => (
            <View>
                 <Image
                    source={require('./logo.png')} 
                    style={styles.logo}
                  />
           
            </View>   
          ),
          headerTitleAlign: 'center',
          headerStyle:{
            backgroundColor:"#03487a"
          },
         
        })}
      />

      <Stack.Screen name="UploadScreen" component={UploadScreen} />
      <Stack.Screen name="CadastroScreen" component={CadastroScreen}  
           options={({ navigation }) => ({
            headerTitle: () => (
              <View>
                   <Image
                      source={require('./logo.png')} 
                      style={styles.logo}
                    />
             
              </View>   
            ),
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor:"#03487a"
            },
            headerBackVisible: false,
          })}
        />
    

      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="GoogleScreen" component={GoogleScreen} />
      
        <Stack.Screen name="ViewScreen" component={ViewScreen} />
        <Stack.Screen name="TextScreen" component ={TextScreen} />
        <Stack.Screen name ="ImageScreen" component = {ImageScreen} />
        <Stack.Screen name ="TextInputScreen" component = {TextInputScreen} />
        <Stack.Screen name ="ScrollScreen" component = {ScrollScreen} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;