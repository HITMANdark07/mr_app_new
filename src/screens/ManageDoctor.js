import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import Ico from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {API} from '../../api.config';
import DoctorListItem from '../components/DoctorListItem';
import CircularProgress from '../components/CircularProgress';
import {connect} from 'react-redux';
const ig =
  'https://s3-alpha-sig.figma.com/img/7e84/585f/4d8fb2194a172cacc908d6d43497b343?Expires=1641772800&Signature=KXqmXE3XpjxvgARcZ~02M4TZ7UueadjK~rAKQhYzUJKwU~trlrBeR-QTw1kX7PnQmjEXRwOaepS-F772177IrmsVYitkBNihkf31GmLDP9bvqTu9NjDBpSXBV~aAkKTaakQuF-P4bdgw~7TOHelicoox8rNt0C~BEi-zZFHpvlIBoKzC0MjjVe28a5SGZv-VjanPJs-3TmH51kY5xwa03Ry77Iz3FG7-q-~FtXXfbOiA4~o6JyttXqxC3eWsd-2nQCacCg7JfkEZ6k8~GJhcK5jyesAYudsKNiIj8F4Vg1KFiNO8RNqiU44pxdyS17oK7ubAsgvrdKlzwoHpSyWoPQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';

const theme1 = '#5DBCB0';
const ManageDoctor = ({navigation, currentUser}) => {
  const [doctors, setDoctors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const percent = () => {
      return (Math.abs(((doctors.length)/50)*100));
  }

  const getDoctors = () => {
    axios
      .post(`${API}/doctor_list`, {
        mr_id: currentUser.id,
      })
      .then(res => {
        if (res.data.responseCode) {
          setDoctors(res.data.responseData);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getDoctors();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: theme1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ico name="menu" size={35} color={'#fff'} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            alignSelf: 'center',
            fontSize: 22,
            fontWeight: '600',
          }}>
          Manage Doctor
        </Text>
        <View>
          <Image
            style={{height: 35, width: 35}}
            source={require('../../assets/logowhite.png')}
          />
        </View>
      </View>
      <View style={styles.pContainer}>
          <CircularProgress percent={percent()} size={80} wide={5} fontColor="#fff" progressColor="#fff" backgroundColor="#5DBCB0" />
          <View style={{flexDirection:'column', justifyContent:'space-around', flex:1,margin:13, marginLeft:20}}>
              <Text style={{fontSize:18, fontWeight:'700', color:'#fff'}}>{doctors.length} Out of 50 Doctors</Text>
              <Text style={{fontSize:14, fontWeight:'400', color:'#fff'}}>{Math.abs(50-doctors.length)} pending...</Text>
          </View>
      </View>
      <TouchableOpacity style={[styles.pContainer, {marginBottom:30}]} activeOpacity={0.7} onPress={() => navigation.navigate('AddDoctor')}>
          <Image source={require('../../assets/add.png')} style={{height: 80, width: 80}} />
          <View style={{flexDirection:'column', justifyContent:'space-around', flex:1,margin:13, marginLeft:20}}>
              <Text style={{fontSize:18, fontWeight:'700', color:'#fff'}}>Add Doctors</Text>
              <Text style={{fontSize:14, fontWeight:'400', color:'#fff'}}>{Math.abs(50-doctors.length)} pending...</Text>
          </View>
      </TouchableOpacity>
      <View style={styles.body}>
        <View
          style={{
            width: '10%',
            borderWidth: 3,
            borderRadius: 12,
            borderColor: '#5DBCB0',
            alignSelf: 'center',
            marginTop: 10,
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={{flex: 1}}>
              <ActivityIndicator size="large" color={theme1} />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'column',
                width: '80%',
                alignSelf: 'center',
              }}>
              {doctors.map((doc, idx) => (
                <DoctorListItem doc={doc} navigation={navigation} key={idx} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.add}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('AddDoctor')}>
        <Ico name="add" size={40} color={theme1} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    top: 0,
    justifyContent: 'space-between',
    margin: 15,
    marginBottom: 20,
  },
  pContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:40,
    marginTop:10,
    marginBottom:10
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  add: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 9,
    margin: 10,
    alignSelf: 'center',
    borderRadius: 50,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(ManageDoctor);
