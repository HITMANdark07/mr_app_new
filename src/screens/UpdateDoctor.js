import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,PermissionsAndroid, ToastAndroid, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/MaterialIcons"
import {Picker} from '@react-native-picker/picker';
import InputText from '../components/InputText';
import { API } from '../../api.config';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const theme1="#5DBCB0";
const UpdateDoctor = ({currentUser,navigation, route}) => {
    const doctor = route.params.doctor;
    const [selectedValue, setSelectedValue] = React.useState(doctor.brand_id);
    const [brands, setBrands] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [email, setEmail] = React.useState(doctor.email);
    const [education, setEducation] = React.useState(doctor.education);
    const [sendimage, setSendImage] = React.useState(null);
    const [image, setImage] = React.useState(doctor.doc_image ? doctor.doc_image : null);
    const [show1, setShow1] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const [bdate, setBDate] = React.useState(new Date(doctor?.birth_date));
    const [adate, setADate] = React.useState(new Date(doctor?.anniversary_date));
    const [dName, setDName] = React.useState(doctor.doctor_name);
    const [phone, setPhone] = React.useState(doctor.mobile);
    const handleChange = (name,e) => {
        switch(name){
            case 'dName':
                setDName(e);
                break;
            case 'phone':
                setPhone(e);
                break;
            case 'email':
                setEmail(e);
                break;
            case 'education':
                setEducation(e);
                break;
            default:
                console.log(e);
        }
    }

    const valuePopUp = (arr) => {
        let i = 0;
        for(i=0;i<arr.length;i++){
            if(arr[i].id==selectedValue){
                break;
            }
        }
        let info = arr[i];
        arr.splice(i,1);
        arr.unshift(info);
        setBrands(arr);
    }

    const getBrands = () => {
        axios.post(`${API}/brand_list`,{}).then((res) => {
            if(res.data.responseCode){
                setLoading(false);
                valuePopUp(res.data.responseData);
            }
        }).catch((err) => {
            console.warn(err);
        })
    };
    React.useEffect(() => {
        getBrands();
    },[]);
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
          console.warn(err);
        }
      };
    const save = () => {
        const formdata = new FormData();
        setLoading(true);
        formdata.append('doctor_id', doctor.doc_id);
        formdata.append('brand_id', selectedValue);
        formdata.append('doctor_name', dName);
        formdata.append('mobile', phone);
        formdata.append('status',1);
        formdata.append('education', education);
        formdata.append('email', email);
        formdata.append('birth_date',moment(bdate).format('YYYY-MM-DD'));
        formdata.append('anniversary_date',moment(adate).format('YYYY-MM-DD'));
        if(sendimage){
            formdata.append('image', {
                uri: sendimage.path,
                name: `image.${sendimage.mime.split("/")[1]}`,
                type: sendimage.mime
            });
            // console.log(sendimage.path);
            // console.log(sendimage.mime);
        }
  
        console.log(formdata);
        
        // fetch(`${API}/add_doctor`, {
        //     method:'POST',
        //     headers:{
        //         'Content-Type': 'multipart/form-data'
        //     },
        //     body:formdata
        // }).then((response) => {
        //     console.log(response);
        //     response.json().then((res) => {
        //         console.log(res);
        //     }).catch((err) => {
        //         console.log("here", err);
        //     })
        // }).catch((err) => {
        //     console.log("THere", err);
        // })

        axios({
            method:'post',
            url:`${API}/doctor_update`,
            data:formdata,
        }).then((res) => {
            setLoading(false);
            console.log(res.data);
            if(res.data.responseCode){
                console.log(res.data.responseCode);
                ToastAndroid.showWithGravity(res.data.responseText, ToastAndroid.LONG, ToastAndroid.CENTER);
                // setDName("");
                // setPhone("");
                // setEmail("");
                // setImage(null);
                setSendImage(null);
            }else{
                ToastAndroid.showWithGravity(res.data.responseText, ToastAndroid.LONG, ToastAndroid.CENTER);
                console.log(res.data.responseText)
            }
        }).catch((err) =>{
            console.log("ERROR",err);
            setLoading(false);
        })
        
    }
      

    const  openGallery = () => {
        ImagePicker.openPicker({mediaType:'photo', cropping:true, includeBase64:true}).then(res => {
            // console.log({...res,data:""});
            setSendImage(res);
            setImage(`data:image/jpeg;base64,${res.data}`);
        }).catch(err => {
            console.log(err);
        })
    }
    // console.log(image);
    const openCamera = async() => {
        let granted = await requestCameraPermission();
        if(granted){
            ImagePicker.openCamera({mediaType:'photo', cropping:true, includeBase64:true}).then(res => {
                setSendImage(res);
                setImage(`data:image/jpeg;base64,${res.data}`);
            }).catch(err => {
                console.log(err);
            })
        }else{
            ToastAndroid.showWithGravity("CAMERA PERMISSION DENIED", ToastAndroid.SHORT);
        }
    }
    
    return (
        <View style={{flex:1, backgroundColor:theme1}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" size={35} color={'#fff'} />
                </TouchableOpacity>
                <Text style={{color:'#fff', alignSelf:'center', fontSize:22, fontWeight:'600'}}>Update Doctor</Text>
                <View>
                    <Image style={{height:35, width:35}} source={require("../../assets/logowhite.png")} />
                </View>
            </View>
        
            <View style={styles.body}>

            <View style={{width:'10%',borderWidth:3,borderRadius:12, borderColor:'#5DBCB0',alignSelf:'center', marginTop:10}} />
            {
            !loading?
            (<ScrollView showsVerticalScrollIndicator={false}>
                {/* <Text>{JSON.stringify(brands)}</Text> */}
                <View style={{ flexDirection:'column',margin:40 }}>
                    <Text style={styles.label}>Brand Name <Text style={{color:'red'}}>*</Text></Text>
                    <View style={{
                    borderColor:'#6B6B6B',
                    borderWidth:0.5,
                    borderRadius:50,
                    marginTop:10,
                    marginBottom:10}}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        {
                            brands.map((b) => (
                                <Picker.Item key={b.id} label={b.name} color='#000' value={b.id} />
                            ))
                        }
                        {/* <Picker.Item label="JavaScript" value="js" /> */}
                    </Picker>
                    </View>
                    <Text style={styles.label}>Doctor Name <Text style={{color:'red'}}>*</Text></Text>
                    <InputText name="dName" value={dName} icon="person" placeholder="Doctor Name" handleChange={handleChange}  />

                    <Text style={styles.label}>Doctor Email <Text style={{color:'red'}}>*</Text></Text>
                    <InputText name="email" value={email} icon="email" placeholder="Doctor Email" handleChange={handleChange}  />

                    <Text style={styles.label}>Mobile Number <Text style={{color:'red'}}>*</Text></Text>
                    <InputText name="phone" value={phone} icon="phone" placeholder="Mobile Number" handleChange={handleChange} type="numeric"  />

                    <Text style={styles.label}>Doctor Education <Text style={{color:'red'}}>*</Text></Text>
                    <InputText name="education" value={education} icon="cast-for-education" placeholder="Doctor Education" handleChange={handleChange}  />

                    <Text style={styles.label}>Upload Image <Text style={{color:'red'}}>*</Text></Text>
                    {
                        image ?
                        (
                            <View style={{margin:10, flexDirection:'column', justifyContent:'space-between'}}>
                                <Image source={{uri:`${image}`}} style={{height: 200, width: 200, borderRadius:20}} />
                                <TouchableOpacity onPress={() => setImage(null)} style={styles.cancel}>
                                    <Text style={{color:'#fff'}}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        :
                        (
                            <View style={{flexDirection:'row', margin:10, justifyContent:'space-between'}}>
                                <TouchableOpacity style={styles.uploads} activeOpacity={0.6} onPress={() => openGallery()}>
                                    <Text style={{color:'#6B6B6B'}}>Gallery</Text>
                                    <Icon name="image" size={30} color="#6B6B6B" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.uploads} activeOpacity={0.6} onPress={() => openCamera()}>
                                    <Text style={{color:'#6B6B6B'}}>Camera</Text>
                                    <Icon name="camera" size={30} color="#6B6B6B" />
                                </TouchableOpacity>
                            </View>
                        )
                    }

                    <Text style={styles.label}>Birth Date </Text>
                    <TouchableOpacity onPress={() => setShow1(true)}>
                        {/* <InputText  name="bDate" icon="cake" placeholder="Birth Date (example : 1992-10-10)" handleChange={handleChange} type="numeric"  /> */}
                        <View style={styles.input}>
                            <Icon name='cake' style={{padding:6}} size={30} color="#6B6B6B"  />
                            <Text style={{flex:1, color:'#000'}}>{moment(bdate).format('YYYY-MM-DD')}</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.label}>Anniversary Date </Text>
                    <TouchableOpacity onPress={() => setShow2(true)}>
                    {/* <InputText name="aDate" icon="wc" placeholder="Anniversary Date  (example : 2002-11-08)" handleChange={handleChange} type="numeric"  /> */}
                        <View style={styles.input}>
                            <Icon name='wc' style={{padding:6}} size={30} color="#6B6B6B"  />
                            <Text style={{flex:1, color:'#000'}}>{moment(adate).format('YYYY-MM-DD')}</Text>
                        </View>
                    </TouchableOpacity>
                    {show1 && <DateTimePicker
                            testID="dateTimePicker"
                            value={bdate}
                            mode="date"
                            // is24Hour={true}
                            display="calendar"
                            onChange={(e) => {
                                setShow1(false);
                                if(e.nativeEvent && e.nativeEvent.timestamp){
                                    setBDate(e.nativeEvent.timestamp);
                                }
                            }}
                    />}
                    {show2 && <DateTimePicker
                            testID="dateTimePicker"
                            value={adate}
                            mode="date"
                            // is24Hour={true}
                            display="calendar"
                            onChange={(e) =>  {
                                setShow2(false);
                                if(e.nativeEvent && e.nativeEvent.timestamp){
                                    setADate(e.nativeEvent.timestamp);
                                }
                            }}
                    />}

                    <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={save} >
                        <Text style={{fontSize:22, fontWeight:'700', color:'#fff'}}>Update</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>)
                :
                (
                    <View style={{flex:1}}>
                        <ActivityIndicator size="large" color={theme1} />
                    </View>
                )
                }
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
    input:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center',
        borderColor:'#6B6B6B',
        borderWidth:0.5,
        borderRadius:50,
        marginTop:10, 
        marginBottom:10
    },
    label:{
        width:'90%',
        marginLeft:10,
        justifyContent:'flex-start',
        color:'#000'
    },
    body:{
        flex:1,
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
    datePickerStyle: {
        width: '90%',
        marginTop: 20,
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
    cancel:{
        backgroundColor:theme1,
        marginTop:20,
        marginBottom:10,
        width:'40%',
        borderRadius:50,
        alignItems:'center',
        padding:8,
        margin:5
    }
})
const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser
})

export default connect(mapStateToProps)(UpdateDoctor);
