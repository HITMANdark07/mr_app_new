import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Ico from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Entypo';
const ig =
  'https://s3-alpha-sig.figma.com/img/7e84/585f/4d8fb2194a172cacc908d6d43497b343?Expires=1641772800&Signature=KXqmXE3XpjxvgARcZ~02M4TZ7UueadjK~rAKQhYzUJKwU~trlrBeR-QTw1kX7PnQmjEXRwOaepS-F772177IrmsVYitkBNihkf31GmLDP9bvqTu9NjDBpSXBV~aAkKTaakQuF-P4bdgw~7TOHelicoox8rNt0C~BEi-zZFHpvlIBoKzC0MjjVe28a5SGZv-VjanPJs-3TmH51kY5xwa03Ry77Iz3FG7-q-~FtXXfbOiA4~o6JyttXqxC3eWsd-2nQCacCg7JfkEZ6k8~GJhcK5jyesAYudsKNiIj8F4Vg1KFiNO8RNqiU44pxdyS17oK7ubAsgvrdKlzwoHpSyWoPQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';

const theme1 = '#5DBCB0';

const DoctorListItem = ({doc, navigation}) => {

    const [visible, setVisible] = useState(false);


  return (
    <TouchableOpacity
        onPress={() => setVisible(false)}
        activeOpacity={1}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.8,
        paddingBottom: 10,
      }}
      >
      <View>
        {doc.doc_image ? (
          <Image
            source={{uri: doc.doc_image}}
            style={{width: 70, height: 70, borderRadius: 100}}
          />
        ) : (
          <Image
            source={{uri: ig}}
            style={{width: 70, height: 70, borderRadius: 100}}
          />
        )}
      </View>
      <Text style={{alignSelf: 'center', fontSize: 18, color: '#000'}}>
        {doc.doctor_name}
      </Text>
      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => setVisible(true)}
        >
        <Icons
          name="dots-three-vertical"
          size={25}
          color={theme1}
          style={{alignSelf: 'center'}}
        />
      </TouchableOpacity>
      <View style={{position:'absolute', elevation:5, backgroundColor:'#fff', right:0, borderRadius:5, display:visible ? 'flex':'none'}}   >
            <View style={{flexDirection:'column'}} onFocus={() => {console.log('OnBLur')}} >
                <TouchableOpacity style={{padding:10, paddingLeft:14, paddingRight:14,flexDirection:'row',}} onPress={() => navigation.navigate('UpdateDoctor', {doctor: doc})}>
                <Ico color={theme1} name="edit" style={{alignSelf:'center',marginRight:8}} />
                <Text style={{color:"#000"}}>Manage Doctor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:10,paddingLeft:14, paddingRight:14,flexDirection:'row',}} onPress={() => navigation.navigate('ChooseTemplate', {doctor:doc})}>
                <Ico color={theme1} name="send" style={{alignSelf:'center',marginRight:8}} />
                <Text style={{color:"#000"}}>Send Greeting</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:10,paddingLeft:14, paddingRight:14,flexDirection:'row',}} onPress={() => setVisible(false)}>
                <Ico name="cancel" color="red" style={{alignSelf:'center',marginRight:8}} />
                <Text style={{color:"#000"}}>Cancel</Text>
                </TouchableOpacity>
            </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorListItem;
