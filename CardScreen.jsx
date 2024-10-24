import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native"
import { useRoute } from '@react-navigation/native';
import { useState, useEffect, } from "react";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

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
      alignItems:"center",
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 20,
      color: '#03487a',
      padding:10
    },

    image:{
        marginTop:10,
        width:150,
        height:150,
        justifyContent:"center",
        alignItems:"center"
    }, 

    containerDesc:{
        alignItems:"center",
        marginTop:50
    },

    atualizar:{
        marginBottom:25
    }
  });


const CardScreen = ({navigation}) =>{
    const route = useRoute();
    const { idAluno } = route.params;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const aluno = new Map();
    aluno.set("F", "Feminino");
    aluno.set("M", "Masculino");
    aluno.set("B1", "Berçário 1");
    aluno.set("B2", "Berçário 2");
    aluno.set("M1", "Maternal 1");
    aluno.set("M2", "Maternal 2");
    aluno.set(true, "Sim");
    aluno.set(false, "Não");

    const [inf, setInf] = useState({
        id: "",
        nome:"",
        turma:"",
        sexo:"",
        bolsa:"",
        ativo:"",
     })
     useFocusEffect(
        useCallback(() => {
            const fetch = async () => {
                try {
                    const response = await axios.get(`http://192.168.42.77:8000/api/form/${idAluno}/`, {
                        withCredentials: true
                    });
                    setInf({
                        id: response.data.data[0].id,
                        nome: response.data.data[0].nome,
                        turma: response.data.data[0].turma,
                        sexo: response.data.data[0].sexo,
                        bolsa: response.data.data[0]["bolsa_familia"],
                        ativo: response.data.data[0]["ativo"]
                    });
                    console.log(response.data.data[0])
                } catch (error) {
                    console.error(error.response.data.message);
                }
            };

            fetch();
        }, [idAluno])
    );

   
    
    const atualizar = () =>{
        navigation.navigate("UpdateScreen", {idAluno: idAluno});
    }

    const remover = () =>{
        const fetch = async () => {
            try {
                const response = await axios.delete(`http://192.168.42.77:8000/api/form/${idAluno}/`, {
                    withCredentials: true
                });
                setInf({
                    id: response.data.data[0].id,
                    nome: response.data.data[0].nome,
                    turma: response.data.data[0].turma,
                    sexo: response.data.data[0].sexo,
                    bolsa: response.data.data[0]["bolsa_familia"],
                    ativo: response.data.data[0]["ativo"]
                });
            } catch (error) {
                console.error(error.response.data.message);
            }
        };

        fetch();
    }
    return(
        <View style={styles.card} >
            <View style={styles.cardContent}>
                <Image source={require('./aluno.png')} 
                        style={styles.image} />
                <View style={styles.containerDesc}>
                    <Text style={styles.description}>Nome: {inf.nome}</Text>
                    <Text style={styles.description}>Turma: {aluno.get(inf.turma)}</Text>
                    <Text style={styles.description}>Sexo: {aluno.get(inf.sexo)}</Text>
                    <Text style={styles.description}>Bolsa-Família: {aluno.get(inf.bolsa)}</Text>
                    <Text style={styles.description}>Ativo: {aluno.get(inf.ativo)}</Text>
                </View>
                <TouchableOpacity style={styles.atualizar} onPress={() => atualizar()}>
                        <Text>Atualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => remover()}>
                        <Text>Remover</Text>
                </TouchableOpacity>

            </View>
      </View>
    )
}

export default CardScreen;