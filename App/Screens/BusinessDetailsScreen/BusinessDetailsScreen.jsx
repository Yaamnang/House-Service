import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute,useNavigation } from '@react-navigation/native'

export default function BusinessDetailsScreen() {
  const param=useRoute().params;
  const [business,setBusiness]=useState(param.business);

  useEffect(()=>{
    console.log("hello",param?.business)
  },[param])
  return (
    <View>
      <Image source={{uri:business.images[0]?.url}}
      style={{width:"100%"}}/>
    </View>
  )
}