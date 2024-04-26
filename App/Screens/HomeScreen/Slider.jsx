import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../Utils/GlobalApi';
import Heading from '../../Components/Heading';

export default function Slider() {
    const [slider, setSlider] = useState([]);

    useEffect(() => {
      GlobalApi.getSlider().then((result) => {
          // Assuming the GraphQL API response structure matches your query
          console.log(result); // Log the result to ensure it's what you expect
          setSlider(result.sliders || []);
      }).catch((error) => {
          console.error("Failed to fetch sliders:", error);
      });
  }, []);
  

    const getSlider = () => {
      GlobalApi.getSlider()
          .then(resp => {
              console.log("resp", resp.sliders);
              setSlider(resp?.sliders || []);
          })
          .catch(error => {
              console.error("Failed to fetch sliders:", error);
              // Optionally set some state here to show an error message or fallback content
          });
  };
  

    return (
        <View>
            <Heading text={'Offers for you'}/>
            <FlatList
              data={slider}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                  <View style={{marginRight:20}}>
                      <Image
                          source={{ uri: item?.image?.url }} // Corrected from item?.image?.ul to item?.image?.url
                          style={styles.sliderImage}
                      />
                  </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginBottom: 10
    },
    sliderImage: {
        width: 270,
        height: 150,
        borderRadius: 20,
        resizeMode: 'contain'
    }
});
