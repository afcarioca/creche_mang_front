import { useState } from "react";
import { Button, View} from "react-native";


const HomeScreen = ({navigation})=>{
    return(
        <View>
            <Button title="Vá para View"
                    onPress = {() =>
                        navigation.navigate("ViewScreen")
                    }
            />

            <Button title="Vá para Text"
                    onPress={() =>
                        navigation.navigate("TextScreen")
                    }
            />

            <Button title="Vá para Image"
                onPress = {()=>
                    navigation.navigate("ImageScreen")
                }
            />

            <Button title="Vá para TextIput"
                onPress = {()=>
                    navigation.navigate("TextInputScreen")
                }
            />
            <Button title="Vá para Scroll"
                onPress = {()=>
                    navigation.navigate("ScrollScreen")
                }
            />
              <Button title="Vá para Google"
                onPress = {()=>
                    navigation.navigate("GoogleScreen")
                }
            />

            <Button title="Vá para Upload"
                onPress = {()=>
                    navigation.navigate("UploadScreen")
                }
            />
        </View>
      
   
    );
}



export default HomeScreen;