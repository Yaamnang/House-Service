import { View, Text, Image, TouchableOpacity ,StyleSheet, ScrollView, Modal, Linking} from 'react-native'
import React, { useEffect ,useState} from 'react'
import { useRoute,useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';
import BookingModal from './BookingModal';
export default function BusinessDetailsScreen() {
  const param=useRoute().params;
  const [business,setBusiness]=useState(param.business);
  const[showModal,setShowModal]=useState(false);
  const navigation =useNavigation();
 
  useEffect(()=>{

  },[])
  const onMessageBtnClick=()=>{
    Linking.openURL('mailto:'+business?.email+'?subject= I am looking for your Service&body=Hi There,');
  }
  return business &&(
    <View>
      <ScrollView style={{height:'90%'}}>

        <TouchableOpacity style={styles.backBtnContainer}
        onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <Image source={{uri:business.images[0]?.url}}
        style={{width:"100%",height:300}}/>
        <View style={styles.infoContainer}>
          <Text style={{fontFamily:'outfit-bold',fontSize:25}}>{business?.name}</Text>
          <View style={styles.subContainer}>
            <Text style={{fontFamily:'outfit-medium',color:Colors.PRIMARY,fontSize:20}}>{business?.contactPerson}⭐</Text>
            <Text style={{fontSize:14,color:Colors.PRIMARY,backgroundColor:Colors.PRIMARY_LIGHT,padding:5,borderRadius:5}}>{business?.category.name}</Text>
          </View>
          
          <Text style={{fontSize:17, fontFamily:'outfit',color:Colors.GRAY}}>
            <Ionicons name="location-sharp" size={25} color={Colors.PRIMARY}/>  
            {business?.address}</Text>

            {/* Horizontal Line */}
            <View style={{borderWidth:1,borderColor:Colors.GRAY,marginTop:20,marginBottom:20}}></View>
            {/* About me Section */}
              <BusinessAboutMe business={business}/>
            {/* Horizontal Line */}
            <View style={{borderWidth:1,borderColor:Colors.GRAY,marginTop:20,marginBottom:20}}></View>
            <BusinessPhotos business={business}/>
    </View>
   
  
  </ScrollView>
  <View style={{display:'flex',flexDirection:'row',margin:8,gap:8,alignItems:'center'}}>
    <TouchableOpacity style={styles.messageBtn} onPress={()=>onMessageBtnClick()}>
      <Text style={{textAlign:'center',fontFamily:'outfit-medium',color:Colors.PRIMARY,fontSize:18}}> Message</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bookingBtn}
    onPress={()=>setShowModal(true)}>
      <Text style={{textAlign:'center',fontFamily:'outfit-medium',color:Colors.PRIMARY,fontSize:18}}>Book Now</Text>
    </TouchableOpacity>
  </View>
  {/* Booking */}
  <Modal
  animationType='slide'
  visible={showModal}
  >
    <BookingModal 
    businessId={business.id}
    hideModal={()=>setShowModal(false)}/>

  </Modal>
    </View>
  
  )
}
const styles = StyleSheet.create({
  backBtnContainer:{
    position:'absolute',
    zIndex:10,
    padding:20
  },
  infoContainer:{
    padding:20,
    display:'flex',
    gap:7
  },
  subContainer:{
    display:'flex',
    flexDirection:'row',
    gap:5,
    alignItems:'center'

  },
  messageBtn:{
    padding:15,
    backgroundColor:Colors.WHITE,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius:99,
    textAlign:'center',
    flex:1
  },
  bookingBtn:{
    padding:15,
    backgroundColor:Colors.WHITE,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius:99,
    textAlign:'center',
    flex:1
  }
})