import { View, Text,Image,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import Colors from '../../Utils/Colors'

WebBrowser.maybeCompleteAuthSession();
export default function Login() {
  useWarmUpBrowser();
  
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
  try {
    const { createdSessionId, signIn, signUp, setActive } =
      await startOAuthFlow();

    if (createdSessionId) {
      setActive({ session: createdSessionId });
    } else {
      // Use signIn or signUp for next steps such as MFA
    }
  } catch (err) {
    console.error("OAuth error", err);
    // Additional logging here
    alert(`OAuth Error: ${err.message}`); // Consider using a more sophisticated error handling/display mechanism in production
  }
}, []);
  return (
    <View style={{alignItems:'center'}}>
      <Image source={require('./../../../assets/images/login.png')}
       style={styles.loginImage}
       />
       <View style={styles.subContainer}>
          <Text style={{fontSize:26,color:Colors.WHITE,marginTop:"5%"}}>Lets's Find  
            <Text style={{fontWeight:'bold'}}> Professional Cleaning and Repair </Text>
           Service
          </Text>
          <Text style={{fontSize:17,color:Colors.WHITE,paddingTop:20}}>Best App to find services near you which deliver you with professional services</Text>
          <TouchableOpacity style={styles.button}
           onPress={onPress}>
       
          <Text style={{textAlign:'center',fontSize:17,
        color:Colors.PRIMARY}}>Let's get started</Text>
          </TouchableOpacity>
       </View>
     
    </View>
  )
}
const styles = StyleSheet.create({
  loginImage:{
    width:230,
    height:450,
    marginTop:70,
    borderColor:Colors.BLACK,
    borderWidth:4,
    borderRadius:15,

  },
  subContainer:{
    width:'100%',
    backgroundColor:Colors.PRIMARY,
    height:"70%",
    marginTop:-20,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    padding:20,

  },
  button:{
    padding:15,
    backgroundColor:Colors.WHITE,
    borderRadius:99,
    marginTop:40,

  }
})