import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
const ig = 'https://s3-alpha-sig.figma.com/img/7e84/585f/4d8fb2194a172cacc908d6d43497b343?Expires=1641772800&Signature=KXqmXE3XpjxvgARcZ~02M4TZ7UueadjK~rAKQhYzUJKwU~trlrBeR-QTw1kX7PnQmjEXRwOaepS-F772177IrmsVYitkBNihkf31GmLDP9bvqTu9NjDBpSXBV~aAkKTaakQuF-P4bdgw~7TOHelicoox8rNt0C~BEi-zZFHpvlIBoKzC0MjjVe28a5SGZv-VjanPJs-3TmH51kY5xwa03Ry77Iz3FG7-q-~FtXXfbOiA4~o6JyttXqxC3eWsd-2nQCacCg7JfkEZ6k8~GJhcK5jyesAYudsKNiIj8F4Vg1KFiNO8RNqiU44pxdyS17oK7ubAsgvrdKlzwoHpSyWoPQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';
const TemplateCard = ({image,profile, title,description, name}) => {
    return (
        <View style={[styles.main, {backgroundColor:getRandomColor()}]} >
            <View style={styles.card}>
                <Image source={{uri:image}} style={{height:200, width:'100%', borderRadius:15}} resizeMode="cover" />
            </View>
            {/* <Text style={styles.desc}>{description}</Text> */}
            <View style={{flexDirection:'row', marginTop:5, alignItems:'center'}}>
                <Image source={{uri:profile ? profile : ig}} style={{width:50, height:50, borderRadius:100}} />
                <Text style={{marginLeft:20, fontSize:16 , fontWeight:'700'}}>{name ? name: 'Dr. XYZ'}</Text>
            </View>
        </View>
    )
};
function getRandomColor() {
    var colors = ['#FCF3F3','#FDF2E3','#F9EBED','#EBE9FB'];
    var color = colors[Math.floor(Math.random() * 4)];
    return color;
}
const styles = StyleSheet.create({
    main:{
        flexDirection:'column',
        width:'90%',
        alignSelf:'center',
        padding:10,
        marginTop:10,
        marginBottom:10,
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 5,
    },
    desc:{
        position:'absolute',
        alignSelf:'center',
        padding:10,
        paddingTop:20,
        color:'#fff'
    }

})

export default TemplateCard;
