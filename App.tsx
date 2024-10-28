import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./src/components/LoginScreen";
import HomeScreen from "./HomeScreen";
import CadastroScreen from "./src/components/CadastroScreen";
import ViewScreen from "./ViewScreen";
import TextScreen from "./TextScreen";
import ImageScreen from "./ImageScreen";
import TextInputScreen from "./TextInputScreen";
import ScrollScreen from "./ScrollScreen";
import GoogleScreen from "./GoogleScreen";
import UploadScreen from "./src/components/UploadScreen";
import Home from "./src/components/Home";
import SearchScreen from "./src/components/SearchScreen";
import CardScreen from "./src/components/CardScreen";
import UpdateScreen from "./src/components/UpdateScreen";
import ClasseScreen from "./src/components/ClasseScreen";
import { Image, StyleSheet, View} from "react-native";
import logo from "./src/img/logo.png";


const Stack = createNativeStackNavigator();
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

      <Stack.Screen name="SearchScreen" component={SearchScreen}  
         options={({ navigation }) => ({
          headerTitle: () => (
            <View>
                 <Image
                    source={logo} 
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

      <Stack.Screen name="ClasseScreen" component={ClasseScreen}  
         options={({ navigation }) => ({
          headerTitle: () => (
            <View>
                 <Image
                    source={logo} 
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
      
      <Stack.Screen name="CadastroScreen" component={CadastroScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="UpdateScreen" component={UpdateScreen} 
        options={({ navigation }) => ({
          headerTitle: () => (
            <View>
                 <Image
                    source={logo} 
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
      <Stack.Screen name="CardScreen" component={CardScreen} 
        options={({ navigation }) => ({
          headerTitle: () => (
            <View>
                 <Image
                    source={logo} 
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

const styles = StyleSheet.create({
  logo:{
    width:40,
    height:40
  },
})
