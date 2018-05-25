import React from "react";
import { View, Text } from "react-360";

const Title = () => {
    return (
        <View style={{flexDirection: "column", height: 100, padding: 20}}>
            <Text
                style={{
                backgroundColor: "#29ECCE",
                fontSize: 50,
                fontWeight: "400",
                textAlign: "center",
                paddingLeft: 20,
                paddingRight: 20,
            }}>
                Choose your zen
            </Text>
        </View>
    )
}

export default Title;