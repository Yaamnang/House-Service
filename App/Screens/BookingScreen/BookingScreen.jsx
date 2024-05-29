import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo';
import BusinessListItem from '../BusinessListByCategoryScreen/BusinessListItem';

export default function BookingScreen() {
  useEffect(()=>{
    user&&getUserBookings();
  },[user])
  // get user Bookins
  const [bookingList,setBookingList]=useState([])
  const {user}=useUser();
  const getUserBookings=()=>{
    setLoading(true)
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(resp=>{
      setBookingList(resp.bookings);
      setLoading(false)

    })
  }
  const [loading,setLoading]=useState(false)
  return (
    <View style={{padding:20}}>
      <Text style={{fontFamily:'outfit-medium',fontSize:26}}>My Bookings</Text>
      <View>
        <FlatList
          data={bookingList}
          onRefresh={()=>getUserBookings()}
          refreshing={loading}
          renderItem={({item,index})=>(
            <BusinessListItem 
            business={item?.business}
            booking={item}/>
          )}
        />
      </View>
    </View>

  )
}