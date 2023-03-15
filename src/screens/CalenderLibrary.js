import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Calendar from 'expo-calendar';

const CalenderLibrary = () => {

    const [text, setText] = useState('')
    const [calender, setCalender] = useState([])

    useEffect(() => {
        openCalenderRequest()
    }, []);

    const openCalenderRequest = async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        console.log({ status })
        if (status === 'granted') {
            console.log('Granted.. ')
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            console.log('Here are all your calendars:-- ');
            console.log({ calendars });
            setCalender(calendars)
        }
    }

    console.log('calender -- ', calender)
    const getDefaultCalendarSource = async () => {
        const defaultCalendar = await Calendar.getDefaultCalendarAsync();
        return defaultCalendar.source;
    }

    const createCalendar = async () => {

        const defaultCalendarSource =
            Platform.OS === 'ios'
                ? await getDefaultCalendarSource()
                : { isLocalAccount: true, name: 'Expo Calendar' };
        const newCalendarID = await Calendar.createCalendarAsync({
            title: text,
            color: 'blue',
            timeZone: "GM+1",
            entityType: Calendar.EntityTypes.EVENT,
            status: Calendar.EventStatus.CONFIRMED,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });
        console.log(`Your new calendar ID is: ${newCalendarID}`);
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
        setCalender(calendars)
        setText('')
        return newCalendarID

    }

    const deleteEvent = async (id) => {
        console.log({ id })
        await Calendar.deleteCalendarAsync(id)
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
        setCalender(calendars)
        setText('')
    }

    const updateEvent = async (id) => {
        console.log('update id --- ', id)
        await Calendar.updateCalendarAsync(id, { title: 'Update Event ---' })
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
        setCalender(calendars)
        setText('')
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder='Enter Event'
                style={{ borderBottomWidth: 1, padding: 10, margin: 10 }}
            />
            <Button title="Create a new calendar" onPress={() => createCalendar()} />
            <FlatList
                data={calender}
                renderItem={({ item }) =>
                    <View style={[styles.data]}>
                        <View>
                            {/* <Text>{item.id}</Text> */}
                            <Text>{item.title}</Text>
                        </View>
                        <Text style={{ color: 'black', position: 'absolute', right: 80, top: 10 }} onPress={() => updateEvent(item.id)}>EDIT</Text>
                        <Text style={{ color: 'red' }} onPress={() => deleteEvent(item.id)}>DELETE</Text>
                    </View>
                }
            />
        </View>
    )
}

export default CalenderLibrary

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    data: {
        flexDirection: 'row',
        margin: 10,
        borderWidth: 1,
        padding: 10,
        justifyContent: 'space-between'
    }
})