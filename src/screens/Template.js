import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import {API} from '../../api.config';
import TemplateCard from '../components/TemplateCard';

const theme1="#5DBCB0";
const Template = ({navigation, route}) => {
    // console.log(route);
    const [template, setTemplate] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const isFocused = useIsFocused();
    const getTemplates = () => {
        axios.post(`${API}/template_list`,{}).then((res) =>{
            setLoading(false);
            if(res.data.responseCode){
                setTemplate(res.data.responseData)
            }
        }).catch((err) => {
            console.warn(err);
            setLoading(false);
        })
    }

    React.useEffect(() => {
        getTemplates();
    },[isFocused]);
    return (
        <View style={{flex:1, backgroundColor:theme1}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" size={35} color={'#fff'} />
                </TouchableOpacity>
                <Text style={{color:'#fff', alignSelf:'center', fontSize:22, fontWeight:'600'}}>Choose Template</Text>
                <View>
                    <Image style={{height:35, width:35}} source={require("../../assets/logowhite.png")} />
                </View>
            </View>
            <View style={styles.body}>
                <View style={{width:'10%',borderWidth:3,borderRadius:12, borderColor:'#5DBCB0',alignSelf:'center', marginTop:10}} />

                <ScrollView showsVerticalScrollIndicator={false}>
                {
                    loading ?
                    (
                        <View style={{flex: 1}}>
                            <ActivityIndicator size="large" color={theme1} />
                        </View>
                    )
                    :
                    (
                        <View style={{flexDirection:'column', justifyContent:'space-evenly', width:'90%', alignSelf:'center', marginTop:20}}>
                            {template.map((temp) => (
                                <TouchableOpacity key={temp.id} activeOpacity={0.6} onPress={() => {
                                    navigation.navigate('ChooseDoctor', {temp});
                                }}>
                                    <TemplateCard image={temp.image} title={temp.title} description={temp.description} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )
                }
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.add} activeOpacity={0.6} onPress={() => navigation.navigate('AddDoctor')}>
                <Icon name="add" size={40} color={theme1} />
            </TouchableOpacity>
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
})

export default Template;
