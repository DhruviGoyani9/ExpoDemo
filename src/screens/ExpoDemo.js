import { Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const ExpoDemo = () => {

    const navigation = useNavigation()

    const DATA = [
        {
            itemName: "Apple",
            itemPrice: 100,
            itemQuantity: '1.5kg'
        },
        {
            itemName: 'Grapes',
            itemPrice: 80,
            itemQuantity: '1kg'
        },
        {
            itemName: 'Banana',
            itemPrice: 50,
            itemQuantity: '2kg'
        },
        {
            itemName: 'Vegetable',
            itemPrice: 30,
            itemQuantity: '1kg'
        },
    ]

    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) =>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.itemName}</Text>
                        <View style={styles.row}>
                            <Text>{item.itemPrice}</Text>
                            <Text>{item.itemQuantity}</Text>
                        </View>
                    </View>
                }
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('ImagePickerLibrary')}
                style={styles.button}>
                <Text>Image Picker Library</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CameraLibrary')}
                style={styles.button}>
                <Text>Camera Library</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CalenderLibrary')}
                style={styles.button}>
                <Text>Calender Library</Text>
            </TouchableOpacity>
        </View>


    )
}

export default ExpoDemo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    item: {
        padding: 20,
        borderWidth: 1,
        margin: 10,
        width: '90%',
        borderRadius: 10
    },
    itemText: {
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    button: {
        backgroundColor: '#adc',
        alignItems: 'center',
        width: 300,
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10,
        padding: 10
    }
})