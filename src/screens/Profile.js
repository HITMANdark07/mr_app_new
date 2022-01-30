import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import InputText from '../components/InputText';
import { connect } from 'react-redux';
import axios from 'axios';
import { API } from '../../api.config';
import { setCurrentUser } from '../redux/user/user.action';

const theme1="#5DBCB0";
const Profile = ({navigation, currentUser, setUser}) => {
    const [name, setName] = React.useState(currentUser.name);
    const [email, setEmail] = React.useState(currentUser.email);
    const [phone, setPhone] = React.useState(currentUser.phone);
    const [address, setAddress] = React.useState(currentUser.address);
    const [showButton, setShowButton] = React.useState(false);

    const getMrdetail = () => {
        axios.post(`${API}/mr_details`,{
            user_id:currentUser.id
        }).then((res) => {
            console.log("here",res.data);
            if(res.data.responseCode){
                setUser(res.data.responseData);
            }else{
                ToastAndroid.showWithGravity(res.data.responseText, ToastAndroid.LONG, ToastAndroid.CENTER);
            }
        }).catch((err) => {
            ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.CENTER);
        })
    }
    
    const save =() => {
        axios.post(`${API}/edit_profile`,{
            user_id: currentUser.id,
            name:name,
            email:email,
            address:address,
            phone:phone
        }).then((res) => {
            console.log(res.data);
            if(res.data.responseCode){
                ToastAndroid.showWithGravity(res.data.responseText, ToastAndroid.LONG, ToastAndroid.CENTER);
                setShowButton(false);
                getMrdetail();
            }else{
                ToastAndroid.showWithGravity(res.data.responseText, ToastAndroid.LONG, ToastAndroid.CENTER);
            }
        }).catch((err) => {
            ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.CENTER);
        })
    }
    const handleChange = (name,e) => {
        setShowButton(true);
        switch(name){
            case 'name':
                setName(e);
                break;
            case 'phone':
                setPhone(e);
                break;
            case 'email':
                setEmail(e);
                break;
            case 'address':
                setAddress(e);
                break;
            default:
                console.log(e);
        }
    }
    return (
        <View style={{flex:1, backgroundColor:theme1}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={35} color={'#fff'} />
                </TouchableOpacity>
                <Text style={{color:'#fff', alignSelf:'center', fontSize:22, fontWeight:'600'}}>My Profile</Text>
                <View>
                    <Image style={{height:35, width:35}} source={require("../../assets/logowhite.png")} />
                </View>
            </View>
            <View style={styles.body}>
                <View style={{width:'10%',borderWidth:3,borderRadius:12, borderColor:'#5DBCB0',alignSelf:'center', marginTop:10}} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{justifyContent:'center', alignItems:'center', marginTop:10}}>
                        <Image source={{uri:currentUser.image}} style={{width:200, height:200,borderRadius:100}} />
                    </View>
                    <View style={{width:'80%', alignSelf:'center'}}>
                    <InputText name="name" value={name} icon="person" placeholder="MR Name" handleChange={handleChange}  />

                    <InputText name="email" value={email} icon="email" placeholder="MR Email" handleChange={handleChange}  />

                    <InputText name="phone" value={phone} icon="phone" placeholder="Mobile Number" handleChange={handleChange} type="numeric"  />

                    <InputText name="address" value={address} icon="location-on" placeholder="Address" handleChange={handleChange}  />
                    
                    {showButton ?
                    (
                    <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={save}>
                        <Text style={{fontSize:22, fontWeight:'700', color:'#fff'}}>Update</Text>
                    </TouchableOpacity>
                    ):
                    (
                        null
                    )
                    }
                    </View>

                    
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    header:{
        flexDirection:'row',
        top:0,
        justifyContent:'space-between',
        margin:15,
        marginBottom:60
    },
    body:{
        flex:1,
        width:'100%',
        backgroundColor:'#fff',
        borderTopLeftRadius:40,
        borderTopRightRadius:40
    },
    button:{
        backgroundColor:theme1,
        marginTop:45,
        marginBottom:20,
        width:'90%',
        alignSelf:'center',
        borderRadius:50,
        alignItems:'center',
        padding:8,
        margin:5
    },
    add:{
        position:'absolute',
        backgroundColor:'#fff',
        padding:9,
        margin:10,
        right:0,
        borderRadius:50,
        bottom:0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
})
const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser
})
const mapDispatchToProps = (dispatch) => ({
    setUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
