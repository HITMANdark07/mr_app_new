import React from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import InputText from '../components/InputText';
import axios from 'axios';
import { API } from '../../api.config';
import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.action';

const theme1 = "#5DBCB0";
const Login = ({setUser}) => {
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const handleChange = (name, e) => {
        switch(name){
            case 'name':
                setName(e);
                break;
            case 'password':
                setPassword(e);
                break;
            default:
                console.log(e);
        }
    }
    const login = () => {
        setLoading(true);
        axios.post(`${API}/login`, {
            email:name,
            password:password
        }).then((response) => {
            if(response.data.responseCode){
                setLoading(false);
                setUser(response.data.responseData);
            }else{
                ToastAndroid.showWithGravity(response.data.responseText, ToastAndroid.LONG, ToastAndroid.CENTER);
                setLoading(false);
            }
            
        }).catch((err) => {
            console.log("error",err);
            ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.CENTER);
            setLoading(false);
        }) 
    }
    return (
        <View style={{flex:1, justifyContent:'center', backgroundColor:'#fff'}}>
            <View style={styles.logoContainer}>
                <Image style={{alignSelf:'center'}} source={require("../../assets/logo.png")} />
                <Image style={{alignSelf:'center'}} source={require("../../assets/brand.png")} />
            </View>
            <View style={styles.container}>
                <Text style={styles.title} >Login</Text>
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <InputText name="campaign" icon="campaign" placeholder="Campaign Code" handleChange={handleChange} type="numeric" />
                    <InputText name="name" icon="person" placeholder="Email" handleChange={handleChange}  />
                    <InputText name="password" icon="lock" placeholder="Password" handleChange={handleChange} password={true}  />
                    <Text style={{alignItems:'flex-end', textDecorationLine:'underline'}} >Forgot Password ?</Text>
                </View>
                {
                    loading ?
                    (
                        <View style={{alignSelf:'center'}}>
                            <ActivityIndicator size="large" color={theme1} />
                        </View>
                    )
                    :
                    (
                        <TouchableOpacity style={styles.button} onPress={login}>
                            <Text style={{fontSize:22, fontWeight:'700', color:'#fff'}}>Login</Text>
                        </TouchableOpacity>
                    )
                }
                
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    title:{
        color:theme1,
        fontSize:35,
        alignSelf:'center',
        fontWeight:'700'
    },
    logoContainer:{
        flexDirection:'column',
        alignSelf:'center',
        justifyContent:'space-evenly',
        backgroundColor:'#fff',
        padding:30,
        borderRadius:500,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    container:{
        width:'85%',
        marginTop:20,
        justifyContent:'center',
        alignSelf:'center',
        padding:10,
        backgroundColor:'#fff',
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,

        elevation: 5,
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
    }
})
const mapDispatchToProps = (dispatch) => ({
    setUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(Login);
