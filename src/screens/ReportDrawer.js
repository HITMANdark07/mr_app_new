import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import CircularProgress from '../components/CircularProgress';
import axios from 'axios';
import { API } from '../../api.config';
import { connect } from 'react-redux';

const theme1="#5DBCB0";
const ReportDrawer = ({navigation, currentUser}) => {
    const [doctors, setDoctors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const getDoctors = () => {
        axios.post(`${API}/doctor_list`,{
            mr_id:currentUser.id
        }).then((res) => {
            setLoading(false);
            if(res.data.responseCode){
                setDoctors(res.data.responseData)
            }
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    React.useEffect(() => {
        getDoctors();
    },[]);
    return (
        <View style={{flex:1, backgroundColor:theme1}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" size={35} color={'#fff'} />
                </TouchableOpacity>
                <Text style={{color:'#fff', alignSelf:'center', fontSize:22, fontWeight:'600'}}>Report</Text>
                <View>
                    <Image style={{height:35, width:35}} source={require("../../assets/logowhite.png")} />
                </View>
            </View>
            <View style={styles.body}>
                <View style={{width:'10%',borderWidth:3,borderRadius:12, borderColor:'#5DBCB0',alignSelf:'center', marginTop:10}} />

                <ScrollView>
                    {
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
                    }
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

export default connect(mapStateToProps)(ReportDrawer);
