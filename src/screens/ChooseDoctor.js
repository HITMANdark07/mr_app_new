import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,PermissionsAndroid, ToastAndroid, } from 'react-native';
import TemplateCard from '../components/TemplateCard';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from "react-native-vector-icons/MaterialIcons"
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import { API } from '../../api.config';
import { connect } from 'react-redux';
import InputText from '../components/InputText';

const theme1="#5DBCB0";
const ChooseDoctor = ({currentUser,navigation, route:{params:{temp}}}) => {
    const [image, setImage] = React.useState(temp.image);
    const [name , setName] = React.useState("");
    const [doctors, setDoctors] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState({});
    const [docId, setDocId] = React.useState("");

    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "App Camera Permission",
              message:"App needs access to your camera ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
          } else {
            return false
          }
        } catch (err) {
            ToastAndroid.showWithGravity(err, ToastAndroid.LONG);
        }
      };

    const getDoctors = () => {
        axios.post(`${API}/doctor_list`,{
            mr_id:currentUser.id
        }).then((res) => {
            if(res.data.responseCode){
                setDoctors(res.data.responseData)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const  openGallery = () => {
        ImagePicker.openPicker({mediaType:'photo', cropping:true, includeBase64:true}).then(res => {
            setImage(`data:image/jpeg;base64,${res.data}`);
        }).catch(err => {
            console.log(err);
        })
    }
    const openCamera = async() => {
        let granted = await requestCameraPermission();
        if(granted){
            ImagePicker.openCamera({mediaType:'photo', cropping:true, includeBase64:true}).then(res => {
                // console.log({...res,data:""});
                setImage(`data:image/jpeg;base64,${res.data}`);
            }).catch(err => {
                console.log(err);
            })
        }else{
            ToastAndroid.showWithGravity("CAMERA PERMISSION DENIED", ToastAndroid.SHORT);
        }
    }
    

    React.useEffect(() => {
        getDoctors();
    },[]);

    // const doclabel = ({image, name}) => {
    //     return(
    //         <View style={{flexDirection:'row'}}>
    //             <Image source={{uri:image}} style={{width:50, height:50, borderRadius:50}} />
    //             <Text>{JSON.stringify(name)}</Text>
    //         </View>
    //     )
    // }
    return (
        <View style={{flex:1, backgroundColor:theme1}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Template')}>
                    <Icon name="arrow-back" size={35} color={'#fff'} />
                </TouchableOpacity>
                <Text style={{color:'#fff', alignSelf:'center', fontSize:22, fontWeight:'600'}}>Select Doctor</Text>
                <View>
                    <Image style={{height:35, width:35}} source={require("../../assets/logowhite.png")} />
                </View>
            </View>
            
            <View style={styles.body}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{width:'10%',borderWidth:3,borderRadius:12, borderColor:'#5DBCB0',alignSelf:'center', marginTop:10}} />

                {/* <Text>{JSON.stringify(temp)}</Text> */}
                <Text style={[styles.label, {marginLeft:50}]}>Select Doctor </Text>
                <View style={{
                    borderColor:'#6B6B6B',
                    width:'80%',
                    alignSelf:'center',
                    borderWidth:0.5,
                    borderRadius:50,
                    marginTop:10,
                    marginBottom:10}}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedValue(itemValue);
                            setImage(itemValue.doc_image);
                            setName(itemValue.doctor_name);
                            setDocId(itemValue.doc_id);
                            // console.log(itemValue);
                        }}
                    >
                        {
                            doctors.map((doc, idx) => (
                                <Picker.Item key={idx} label={doc.doctor_name} value={doc} />
                            ))
                        }
                        
                    </Picker>
                </View>
                <TemplateCard image={temp.image} profile={image} title={temp.title} description={temp.description} name={name} />

                <View style={{alignSelf:'center', width:'80%'}}>
                <InputText name="dName" icon="person" value={name} placeholder="Doctor Name" handleChange={(name, e) => {
                    setName(e);
                }} />
                </View>

                <View style={{width:'85%', alignSelf:'center'}}>
                <Text style={styles.label}>Image </Text>
                {
                    image ?
                    (
                        <View style={{margin:10, flexDirection:'column', justifyContent:'space-between'}}>
                            <Image source={{uri:`${image}`}} style={{height: 200, width: 200, borderRadius:20}} />
                            <TouchableOpacity onPress={() => setImage(null)} style={styles.cancel}>
                                <Text style={{color:'#fff'}}>CHANGE</Text>
                            </TouchableOpacity>
                        </View>
                    )
                    :
                    (
                        <View style={{flexDirection:'row', margin:10, justifyContent:'space-between'}}>
                            <TouchableOpacity style={styles.uploads} activeOpacity={0.6} onPress={() => openGallery()}>
                                <Text>Gallery</Text>
                                <Icon name="image" size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.uploads} activeOpacity={0.6} onPress={() => openCamera()}>
                                <Text>Camera</Text>
                                <Icon name="camera" size={30} />
                            </TouchableOpacity>
                        </View>
                    )
                }
                </View>
                            <TouchableOpacity  style={styles.next} activeOpacity={0.7} onPress={() => {
                                navigation.navigate("Final", {image:temp.image, doc_id:docId, profile:image, title:temp.title, description:temp.description, name:name})
                            }}>
                                <Text style={{color:'#fff', fontSize:20, fontWeight:'700'}}>NEXT</Text>
                            </TouchableOpacity>

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
    label:{
        width:'90%',
        marginLeft:10,
        justifyContent:'flex-start',
        color:'#000'
    },
    body:{
        flex:1,
        width:'100%',
        backgroundColor:'#fff',
        borderTopLeftRadius:40,
        borderTopRightRadius:40
    },
    uploads:{
        flexDirection:'row', 
        width:'40%',
        justifyContent:'space-between', 
        alignItems:'center', 
        padding:15, 
        borderColor:'#6B6B6B', 
        borderRadius:40, 
        borderWidth:0.5
    },
    cancel:{
        backgroundColor:theme1,
        marginTop:20,
        marginBottom:10,
        width:'40%',
        borderRadius:50,
        alignItems:'center',
        padding:8,
        margin:5
    },
    next:{
        backgroundColor:theme1,
        marginTop:20,
        alignSelf:'center',
        marginBottom:10,
        width:'60%',
        borderRadius:50,
        alignItems:'center',
        padding:8,
        margin:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
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
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(ChooseDoctor);
