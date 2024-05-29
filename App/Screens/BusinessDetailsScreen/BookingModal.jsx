import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/PageHeading'
import { Ionicons } from '@expo/vector-icons';

import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';

export default function BookingModal({ businessId, hideModal }) {
    const [timeList, setTimeList] = useState([]);
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [note, setNote] = useState();
    const { user } = useUser();

    useEffect(() => {
        // Simpler and clearer time setting
        setTimeList(generateTimeList());
    }, []);

    const generateTimeList = () => {
        let times = [];
        for (let i = 8; i <= 18; i++) {
            const suffix = i < 12 ? 'AM' : 'PM';
            const hour = i <= 12 ? i : i - 12;
            times.push({ time: `${hour}:00 ${suffix}` });
            times.push({ time: `${hour}:30 ${suffix}` });
        }
        return times;
    };

    const createBooking = async () => {
        if (!selectedTime || !selectedDate) {
            ToastAndroid.show('Please select date and time!', ToastAndroid.LONG);
            return;
        }
        const data = {
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress,
            time: selectedTime,
            date: moment(selectedDate).format('DD-MMM-YYYY'),
            businessId
        };
        try {
            const resp = await GlobalApi.createBooking(data);
            console.log("resp", resp);
            ToastAndroid.show('Booking Created Successfully!', ToastAndroid.LONG);
            hideModal();
        } catch (error) {
            ToastAndroid.show('Failed to create booking', ToastAndroid.LONG);
            console.error("Booking Creation Error:", error);
        }
    };

    return (
    <ScrollView>
    <KeyboardAvoidingView style={{padding:20}}>
       <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center'}}
    onPress={()=>hideModal()}
    >
      <Ionicons name="arrow-back-outline" size={30} color="black" />
      <Text style={{fontSize:25,fontFamily:'outfit-medium'}}>Bookng</Text>
    </TouchableOpacity>
    {/* Calendar Section
     */}
     <Heading text={'Select Date'}/>
    <View style={styles.calendarContainer}>
    <CalendarPicker 
        onDateChange={setSelectdDate}
        width={340}
        minDate={Date.now()}
        todayBackGroundColor={Colors.BLACK}
        todayTextStyle={{color:Colors.WHITE}}
        selectedDayColor={Colors.PRIMARY}
        selectedDayTextColor={Colors.WHITE}
    />
    </View>
    {/* Time Select Section */}
    <View style={{marginTop:20}}>
        <Heading text={'Select Time Slot'}/>
        <FlatList 
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
                <TouchableOpacity style={{marginRight:10}}
                onPress={()=>setSelectedTime(item.time)}>
                    <Text style={[selectedTime==item.time?styles.selectedTime:styles.unSelectedTime]}>{item.time}</Text>
                </TouchableOpacity>
            )}
        />
    </View>
    {/* Note Section */}
    <View style={{paddingTop:20}}>
        <Heading text ={'Any Suggestion Note'}/>
        <TextInput placeholder='Note'
        numberOfLines={5}
        style={styles.noteTextArea}
        onChange={(text)=>setNote(text)}/>
    </View>
    {/* confirmation Button */}
    <TouchableOpacity style={{marginTop:15}}
    onPress={()=>createBooking()}>
        <Text style={styles.confirmBtn}>Confirm & Book</Text>
    </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    calendarContainer:{
        backgroundColor:Colors.PRIMARY_LIGHT,
        padding:20,
        borderRadius:15
    },
    selectedTime:{
        padding:10,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        paddingHorizontal:18,
        color:Colors.WHITE,
        backgroundColor:Colors.PRIMARY,
    },
    unSelectedTime:{
        padding:10,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        paddingHorizontal:18,
        color:Colors.PRIMARY
    },
    noteTextArea:{
        borderWidth:1,
        borderRadius:15,
        textAlignVertical:'top',
        padding:20,
        fontSize:16,
        fontFamily:'outfit',
        borderColor:Colors.PRIMARY
    },
    confirmBtn:{
        textAlign:'center',
        fontFamily:'outfit',
        fontSize:17,
        backgroundColor:Colors.PRIMARY,
        color:Colors.WHITE,
        padding:13,
        borderRadius:99,
        elevation:2,

    }
})