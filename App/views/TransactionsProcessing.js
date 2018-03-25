import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";


export default class TransactionsProcessing extends Component {
  render() {
    return (
      <View
        backgroundColor = "#43484d"
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 10,
          paddingRight: 10,
          paddingBottom: 10,
          paddingLeft: 10
        }}> 
        <Text 
          style={{
            fontSize: 20,
            color: "white",
            paddingBottom: 10
          }}>Processing Transactions On Ethereum...</Text>
        <ActivityIndicator size="large" color="white"/>
      </View>
    );
  }
}
