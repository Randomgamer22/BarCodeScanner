import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarcodeScanner } from 'expo-barcode-scanner';

export default class TransitionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCamerPermission: null,
      scanned : false,
      buttonState: 'normal',
      scannedData : ''
    }
  }

  getCameraPermission = async () => {
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        hasCamerPermission: status === "granted",
        buttonState: 'clicked',
        scanned: false
      });
  }

  handleBarCodeScanned = async ({type, data}) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    });
  }

  render() {
    const hasCamerPermission = this.state.hasCamerPermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === 'clicked' && hasCamerPermission ) {
      return (
        <BarcodeScanner onBarcodeScanned = {scanned ? undefined : this.handleBarCodeScanned} style = {StyleSheet.absoluteFillObject}/>
      )
    }
    else if (buttonState === 'normal') {
      return (
        <View style = {styles.container}>
          <Image source = {require('./assets/scanner.jpg')} style = {{height: 250, width: 250}}/>
          <Text style = {{fontSize: 35}}>Bar Code Scanner</Text>
          <Text style = {styles.displayText}>{hasCamerPermission ? this.state.scannedData : "Request Camera Permission"}</Text>
          <TouchableOpacity style = {styles.scanButton} onPress = {this.getCamerPermission}>
            <Text style = {styles.buttonText}>
              Scan QR Code
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    displayText: {
      fontSize: 15,
      textDecorationLine: 'underline'
    },

    scanButton: {
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },

    buttonText: {
      fontSize: 20,
    }
  }
);
