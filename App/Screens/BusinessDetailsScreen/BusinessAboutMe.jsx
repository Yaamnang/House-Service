import { View, Text,TouchableOpacity } from 'react-native'
import Heading from '../../Components/Heading'
import React, { useState } from 'react'
import Colors from '../../Utils/Colors';
export default function BusinessAboutMe({business}) {
    const [isReadMore,setIsReadMore]=useState(false);
   
  return business&&(
    <View>
         
            <Heading text={'About Me'}/>
            <Text style={{fontFamily:'outfit', fontSize:16,lineHeight:28,color:Colors.GRAY}} numberOfLines={isReadMore?20:5}>{business.about}</Text>
            <TouchableOpacity onPress={()=>setIsReadMore(!isReadMore)}>
            <Text style={{color:Colors.PRIMARY,
              fontSize:16,fontFamily:'outfit'}}>{isReadMore?'Read Less': 'Read More'}</Text>
            </TouchableOpacity>
          </View>
    
  )
}