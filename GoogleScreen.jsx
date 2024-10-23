import { Button, Text, View} from "react-native";
import { useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-url-polyfill/auto'
import axios from 'axios';

const supabaseUrl = 'https://jkwzjaociiifhlgxhyik.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprd3pqYW9jaWlpZmhsZ3hoeWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2Nzk4MDMsImV4cCI6MjA0NDI1NTgwM30.sGQK0xfHeAxeIR5zII26GMprV8pguLQo_njDLuIcViM';


const GoogleScreen = () =>{

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})
    


const fetchItems = async () => {
    try{
        
        const { data, error } = await supabase
        .from('Teste')
        .select()
        console.log(data)
    } catch(erro){
        console.log(erro)
    }
   
  };
  



  
    
return(
        <View>
            <Button onPress={fetchItems} title="A"/>
        </View>
    );
}

export default GoogleScreen;