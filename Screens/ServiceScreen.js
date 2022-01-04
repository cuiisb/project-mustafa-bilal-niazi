import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();



const ServiceScreen = () => {

  function Profile({ navigation }) {

    return (
        <View >
          
        </View>
      );
    }

function ViewRides({ navigation }) {

      return (
          <View >
            
          </View>
        );
      }
  

  const navigation = useNavigation()
    return (
      <Drawer.Navigator>
      <Drawer.Screen name="Find a ride!" component={ViewRides} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
    )
}

export default ServiceScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    style1: {
        borderBottomWidth: 2,
        paddingTop: 20
      },
      style2: {
        paddingTop: 30,
        alignContent: 'space-between'
      },
      style3: {
        paddingTop: 5,
        paddingBottom: 5,
        width: '50%',
        alignContent: "center",
        fontWeight: 'bold',
      },
      style4: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignContent: "center"
      },
      button: {
        paddingTop: 10,
        borderRadius: 50,
        textAlign: 'center'
      }
  });

