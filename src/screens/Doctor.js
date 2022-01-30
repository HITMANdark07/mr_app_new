import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import InputText from '../components/InputText';
import CircularProgress from '../components/CircularProgress';
import { connect } from 'react-redux';
const ig = 'https://s3-alpha-sig.figma.com/img/7e84/585f/4d8fb2194a172cacc908d6d43497b343?Expires=1641772800&Signature=KXqmXE3XpjxvgARcZ~02M4TZ7UueadjK~rAKQhYzUJKwU~trlrBeR-QTw1kX7PnQmjEXRwOaepS-F772177IrmsVYitkBNihkf31GmLDP9bvqTu9NjDBpSXBV~aAkKTaakQuF-P4bdgw~7TOHelicoox8rNt0C~BEi-zZFHpvlIBoKzC0MjjVe28a5SGZv-VjanPJs-3TmH51kY5xwa03Ry77Iz3FG7-q-~FtXXfbOiA4~o6JyttXqxC3eWsd-2nQCacCg7JfkEZ6k8~GJhcK5jyesAYudsKNiIj8F4Vg1KFiNO8RNqiU44pxdyS17oK7ubAsgvrdKlzwoHpSyWoPQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';


const theme1="#5DBCB0";
const Doctor = ({navigation, currentUser, route}) => {
    const doctor = route.params.doctor;
    // console.log(doctor)
    return (
        <View style={{flex:1, backgroundColor:theme1}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" size={35} color={'#fff'} />
                </TouchableOpacity>
                {/* <Text style={{color:'#fff', alignSelf:'center', fontSize:22, fontWeight:'600'}}>Report</Text> */}
                <View>
                    <Image style={{height:35, width:35}} source={require("../../assets/logowhite.png")} />
                </View>
            </View>
            <View style={styles.pContainer}>
                {/* <CircularProgress percent={percent()} size={80} wide={5} fontColor="#fff" progressColor="#fff" backgroundColor="#5DBCB0" /> */}
                <Image source={{uri:doctor.doc_image? doctor.doc_image: ig}} style={{height:110, width:110, borderRadius:100}} />
                <View style={{flexDirection:'column', justifyContent:'space-around', flex:1,margin:13, marginLeft:20}}>
                    <Text style={{fontSize:18, fontWeight:'500', color:'#fff'}}>Dr. {doctor.doctor_name}</Text>
                    <Text style={{fontSize:14, fontWeight:'400', color:'#fff'}}>Master of Surgery (MS) in Orthopedicss</Text>
                </View>
            </View>
            <TouchableOpacity style={{flexDirection:'row', justifyContent:'flex-end',marginRight:50,marginBottom:10 }} onPress={() => navigation.navigate('UpdateDoctor', {doctor:doctor})}>
                <View style={{borderColor:'#fff', borderWidth:1, flexDirection:'row', padding:4, paddingLeft:8, paddingRight:8, borderRadius:20}}>
                <Text style={{color:'#fff', fontSize:15}}>Edit_</Text>
                <Icon name="edit" color="#fff" size={15} style={{alignSelf:'center', marginLeft:5}} />
                </View>
            </TouchableOpacity>
            <View style={styles.body}>
                <View style={{width:'10%',borderWidth:3,borderRadius:12, borderColor:'#5DBCB0',alignSelf:'center', marginTop:10}} />

                <ScrollView>
                    {/* {
                        loading ?
                        (
                            <View style={{flex: 1, margin:20}}>
                                <ActivityIndicator size="large" color={theme1} />
                            </View>
                        )
                        :
                        (
                            <View style={{marginTop:20, flexDirection:'column'}}>
                            <Text style={{marginLeft:40, fontSize:18, color:'#000', fontWeight:'500'}}>Doctors Added</Text>
                            <View style={styles.pContainer}>
                                <CircularProgress percent={Math.abs(((doctors.length)/50)*100)} size={80} wide={5} fontColor="#5DBCB0" progressColor="#5DBCB0" backgroundColor="#fff" />
                                <View style={{flexDirection:'column', justifyContent:'space-around', flex:1,margin:13, marginLeft:20}}>
                                    <Text style={{fontSize:18, fontWeight:'700', color:'#5DBCB0'}}>{doctors.length} Out of 50 Doctors</Text>
                                    <Text style={{fontSize:14, fontWeight:'400', color:'#5DBCB0'}}>{Math.abs(50-doctors.length)} pending...</Text>
                                </View>
                            </View>
                            <View style={{borderColor:'#5DBCB0', borderWidth:0.8, width:'80%', alignSelf:'center', marginTop:20, marginBottom:20}} />
                            <Text style={{marginLeft:40, fontSize:18, color:'#000', fontWeight:'500'}}>Messages Sent</Text>
                            <View style={styles.pContainer}>
                                <CircularProgress percent={25} size={80} wide={5} fontColor="#5DBCB0" progressColor="#5DBCB0" backgroundColor="#fff" />
                                <View style={{flexDirection:'column', justifyContent:'space-around', flex:1,margin:13, marginLeft:20}}>
                                    <Text style={{fontSize:18, fontWeight:'700', color:'#5DBCB0'}}>3 Out of 12 Doctors</Text>
                                    <Text style={{fontSize:14, fontWeight:'400', color:'#5DBCB0'}}>9 pending...</Text>
                                </View>
                            </View>
                            </View>
                        )
                    } */}
                    <View style={{ flexDirection:'column',margin:40 }}>
                
                    <InputText name="dName" value={`Dr. ${doctor.doctor_name}`} disable={false} icon="person" placeholder="Doctor Name" handleChange={() => {}}  />
                    <InputText name="phone" value={doctor.mobile} icon="phone" disable={false} placeholder="Doctor Name" handleChange={() => {}}  />
                    <InputText name="calender" value={doctor.birth_date} disable={false} icon="date-range" placeholder="Doctor Name" handleChange={() => {}}  />
                    <InputText name="email" value={doctor.email} icon="person" disable={false} placeholder="Doctor Name" handleChange={() => {}}  />

                    <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => navigation.navigate('ChooseTemplate', {doctor:doctor})} >
                        <Text style={{fontSize:22, fontWeight:'700', color:'#fff'}}>Choose Template</Text>
                    </TouchableOpacity>
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
        marginBottom:10
    },
    button:{
        backgroundColor:theme1,
        marginTop:45,
        elevation:5,
        marginBottom:20,
        width:'80%',
        alignSelf:'center',
        borderRadius:50,
        alignItems:'center',
        padding:8,
        margin:5
    },
    pContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:40,
        marginTop:10,
        marginBottom:10
    },
    pContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:40,
        marginTop:10,
        marginBottom:10
    },
    body:{
        flex:1,
        width:'100%',
        backgroundColor:'#fff',
        borderTopLeftRadius:40,
        borderTopRightRadius:40
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
});

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Doctor);
