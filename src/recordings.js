import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image, FlatList} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'Third Item',
      },
  ];


const Item = ({ title }) => (
      // <View style={styles.container}>
        <View style={{marginVertical: 10, backgroundColor: "#262626", borderRadius: 10, overflow: "hidden" }}>
          <View>
            <Image
              source={{uri: 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png'}}
              style={{
                height: 200,
                width: 300
              }}
            />
          </View>
          <View style={{ padding: 10, width: 300 }}>
            <Text style={{ color: "#fff", paddingTop: 5 }}>Title</Text>
            <Text style={{ color: "#777", paddingTop: 5 }}>
              Description of the image
            </Text>
          </View>
        </View>
      // </View>
);

export default function App({ navigation }) {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return(
        <View styles={styles.container}>
            <View style={{backgroundColor:'#000', alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                styles={{backgroundColor: 'black'}}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      },
      item: {
        backgroundColor: '#1a1a1a',
        marginVertical: 6,
        marginHorizontal: 7,
        padding: 0
      },
      title: {
        fontSize: 16,
        color: 'white'
      },
  })