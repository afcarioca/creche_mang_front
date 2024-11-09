import { Image, StyleSheet, View, TouchableOpacity} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { LoginScreen, CadastroScreen, UploadScreen, Home, SearchScreen, CardScreen, UpdateScreen, ClasseScreen, GraficoScreen} from './src/components/';
import logo from "./src/img/logo.png";
import usuarios from "./src/img/usuarios_menu.png";
import graficos from "./src/img/graficos_menu.png";
import pesquisa from "./src/img/pesquisa_menu.png";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#03487a',  height: 80 }, 
        tabBarShowLabel: false 

      }}
    >

  <Tab.Screen name="Home" component={Home}  options={{headerShown: false, 
        tabBarIcon: ({ color, size }) => (
         
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={logo}
              style={styles.logo}
            />
          </TouchableOpacity>
      
          
          ),}}  />

    <Tab.Screen name="Search" component={SearchScreen}  options={{headerShown: false, 
        tabBarIcon: ({ color, size }) => (
         
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image
              source={pesquisa}
              style={styles.logo}
            />
          </TouchableOpacity>
      
          
          ),}}  />
     
       <Tab.Screen name="Classe" component={ClasseScreen}  options={{headerShown: false, 
        tabBarIcon: ({ color, size }) => (
         
          <TouchableOpacity onPress={() => navigation.navigate('Classe')}>
            <Image
              source={usuarios}
              style={styles.logo}
            />
          </TouchableOpacity>
      
          
          ),}}  />

      <Tab.Screen name="Grafico" component={GraficoScreen}  options={{headerShown: false, 
        tabBarIcon: ({ color, size }) => (
         
          <TouchableOpacity onPress={() => navigation.navigate('Grafico')}>
            <Image
              source={graficos}
              style={styles.logo}
            />
          </TouchableOpacity>
      
          
          ),}}  />
      
          
          
          
         

    </Tab.Navigator>
  );
};

const App = () =>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{ headerShown: false, animation: 'none'  }} />

      <Stack.Screen name="HomeScreen" component={MyTabs}  options={({ navigation }) => ({headerShown: false,animation: 'none' })}/>

      <Stack.Screen name="CadastroScreen" component={CadastroScreen}  options={{ headerShown: false,  animation: 'none'  }}/>

     

      <Stack.Screen name="ClasseScreen" component={MyTabs}  
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
      <Stack.Screen name="GraficoScreen" component={MyTabs}  
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
      <Stack.Screen name="SearchScreen" component={MyTabs}  
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
