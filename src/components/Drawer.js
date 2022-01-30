import React from 'react';
import {
  DrawerContentScrollView,
  //   DrawerItemList,
  //   DrawerItem
} from '@react-navigation/drawer';
import {View, Text, Image, StyleSheet} from 'react-native';
import Ico from "react-native-vector-icons/MaterialIcons";
import Icons from 'react-native-vector-icons/Fontisto';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.action';

const themeColor1= "#3F4541";
const themeColor2="#5DBCB0";
function CustomDrawer({navigation,currentUser,setUser}) {


  const signOut = () => {
      setUser(null);
  }
  return (
    <DrawerContentScrollView style={{backgroundColor:'#fff', borderTopRightRadius:35, borderBottomRightRadius:35, flex:1}}>
      {/* <View style={styles.logo}> */}
        {/* <Image source={require('../../assets/logo.png')} /> */}
        <View style={{flexDirection:'column', flex:2, justifyContent:'space-between'}}>
        <TouchableOpacity style={{
          flexDirection:'row',
          margin:10,
          marginLeft:30,
          marginBottom:20
        }} activeOpacity={0.5} onPress={() => navigation.navigate('Profile')}>
           {
             currentUser && currentUser.image ?
             
             (
              <Image source={{uri:currentUser.image}} style={{width:60, height:60, borderRadius:50, alignSelf:'center', borderColor:themeColor2, borderWidth:1}} />
             )
             :
             (
              <View style={{backgroundColor:'#5DBCB0', padding:12 ,borderRadius:50}}>
                <Ico name="person" size={40} color="#fff"  />
              </View>
             )
           }
           
           <View style={{alignItems:'center',alignSelf:'center', marginLeft:10}}>
           <Text style={{fontSize:20, color:'#5DBCB0', fontWeight:'500', alignSelf:'center'}}>Hello,</Text>
           <Text style={{fontSize:20, color:'#5DBCB0', fontWeight:'500', alignSelf:'center'}}>{currentUser && currentUser.name}</Text>
           </View>

        </TouchableOpacity>

        <View style={{borderWidth:0.5, borderColor:'#5DBCB0'}} />


      <ScrollView showsVerticalScrollIndicator={false}>

      <TouchableOpacity onPress={() => navigation.navigate('HomeDrawer')}>
      <View style={styles.drawerMenu}>
          <Ico name="home" style={styles.icon} color={themeColor2} size={30} />
          <Text style={styles.menuText}>Home</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('AddDoctor')} >
          {/* {currentUser && currentUser.photo ? (<Image source={{uri:currentUser.photo}} style={styles.photo} />) :
          (<Icon name="user-circle-o" style={styles.icon} color={themeColor1} size={30} />)}
          <Text style={styles.menuText}>Hi, {currentUser && currentUser.name ? currentUser.name.split(" ")[0] : "USER"}</Text> */}
          <View style={styles.drawerMenu} >
          <Icons name="doctor" style={styles.icon} color={themeColor2} size={30} />
          <Text style={styles.menuText}>Add Doctors</Text>
      </View>

      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('ManageDoctor')}>
      <View style={styles.drawerMenu}>
          <Ico name="medical-services" style={styles.icon} color={themeColor2} size={30} />
          <Text style={styles.menuText}>Manage Doctors</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Template')}>
      <View style={styles.drawerMenu}>
          <Ico name="design-services" style={styles.icon} color={themeColor2} size={30} />
          <Text style={styles.menuText}>Templates</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ReportDrawer')} >
      <View style={styles.drawerMenu} >
          <Ico name="analytics" style={styles.icon} color={themeColor2} size={30} />
          <Text style={styles.menuText}>Reports</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signOut()}>
        <View style={styles.drawerMenu} >
            <Ico name="logout" style={styles.icon} color={themeColor2} size={30} />
            <Text style={styles.menuText}>Sign Out</Text>
        </View>
      </TouchableOpacity>
      </ScrollView>
      </View>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  logo: {
    margin: 0,
    marginTop: -30,
    top: 0,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  icon:{
    margin:5,
    marginRight:20
  },
  photo:{
    margin:5,
    marginRight:20,
    height:40,
    width:40,
    borderRadius:50
  },
  drawerMenu:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      margin:10,
      padding:2,
      // borderLeftColor:themeColor1,
      // borderLeftWidth:1,
      borderRadius:5
  },
  menuText:{
      textAlignVertical:"center",
      color:themeColor1,
      fontSize:18,
      fontWeight:'300'
  }
});

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})
const mapDispatchToProps = (dispatch) => ({
  setUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(CustomDrawer);