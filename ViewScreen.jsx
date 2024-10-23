import { View, Text } from "react-native";


const ViewScreen = ({navigation, route}) => {
    return (
        <View
            style ={{
                flexDirection: "row",
                height: 100,
                padding: 20
            }}
        >
        <View 
            style ={{ backgroundColor: "red", flex: 0.5}} />
            <Text>ViewScreen</Text>
        </View>
    );
}

export default ViewScreen;