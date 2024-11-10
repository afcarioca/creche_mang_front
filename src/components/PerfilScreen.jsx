import { Text, View, StyleSheet, Image, TouchableOpacity, ToastAndroid} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { storeData, retrieveData } from '../utils/storage';
import {API_URL} from '@env';
import axios from "axios";
import { useState, useEffect, } from "react";
import imgAluno from "../img/aluno.png";
import update from "../img/update.png";
import logout from "../img/logout.png";
import LoginScreen from "./LoginScreen";




const PerfilScreen = ({navigation}) =>{
    const [inf, setInf] = useState({
      username: "",
      email:""
    });

    useFocusEffect(
      useCallback(() => {
          const fetch = async () => {
              try {

                  const token = await retrieveData('token');
                  const username = await retrieveData('username');
                
                  const response = await axios.post(`${API_URL}/perfil/`,{username},{
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  });
                  setInf({
                      username: response.data.data["nome"],
                      email: response.data.data["email"],
                      
                  });
                  

              } catch (error) {
                  if(error.response && error.response.status === 401)
                      navigation.navigate('LoginScreen');
              }
          };

          fetch();
      }, [])
  );

  const sair = () =>{
    ToastAndroid.show('Até Breve!', ToastAndroid.SHORT);
    navigation.navigate("LoginScreen")
  }
  
    
    return(
       <View style={styles.card} >
        <View  style={styles.cardContent}>
          < Image source={imgAluno} 
                        style={styles.image} />
            <View style={styles.containerDesc}>
                <Text style={styles.description}>{inf.username}</Text>
                <Text style={styles.description}>{inf.email}</Text>

            </View>
            <View style={styles.containerImg}>
                    <TouchableOpacity onPress={sair}>
                        <Image source={logout} 
                                style={styles.update} />
                    </TouchableOpacity>

                </View>
        </View>
         
       </View>
    );
}

export default PerfilScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#03487a',
    borderRadius: 10,
    elevation: 3, 
    shadowColor: '#000', 
    margin: 30,
  },
  cardContent: {
    padding: 20,
    height:"100%",
    backgroundColor: '#fff',
  },
 
  description: {
    fontSize: 15,
    color: '#03487a',
    padding:5
  },

  containerImg:{
      flexDirection:"row",
      justifyContent:"space-around",
      alignItems: "center",
      paddingHorizontal: 10
  },

  image:{
      margin:"auto",
      width:150,
      height:150,
      justifyContent:"center",
      alignItems:"center"
      
  }, 

  containerDesc:{
      marginBottom:40,
      alignItems:"center",   
  },
  update:{
      width:40,
      height:40,
  },

  lixeira:{
      width:40,
      height:40,
  },
 
});

