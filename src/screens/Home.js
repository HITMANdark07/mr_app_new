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
import InputText from '../components/InputText';
import axios from 'axios';
import {API} from '../../api.config';
import {connect} from 'react-redux';
const ig =
  'https://s3-alpha-sig.figma.com/img/7e84/585f/4d8fb2194a172cacc908d6d43497b343?Expires=1641772800&Signature=KXqmXE3XpjxvgARcZ~02M4TZ7UueadjK~rAKQhYzUJKwU~trlrBeR-QTw1kX7PnQmjEXRwOaepS-F772177IrmsVYitkBNihkf31GmLDP9bvqTu9NjDBpSXBV~aAkKTaakQuF-P4bdgw~7TOHelicoox8rNt0C~BEi-zZFHpvlIBoKzC0MjjVe28a5SGZv-VjanPJs-3TmH51kY5xwa03Ry77Iz3FG7-q-~FtXXfbOiA4~o6JyttXqxC3eWsd-2nQCacCg7JfkEZ6k8~GJhcK5jyesAYudsKNiIj8F4Vg1KFiNO8RNqiU44pxdyS17oK7ubAsgvrdKlzwoHpSyWoPQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';

const theme1 = '#5DBCB0';
const Home = ({navigation, currentUser}) => {
  const [doctors, setDoctors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
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
        <Image
          style={{width: 200, height: 60}}
          source={require('../../assets/brandwhite.png')}
        />
        <View>
          <Image
            style={{height: 35, width: 35}}
            source={require('../../assets/logowhite.png')}
          />
        </View>
      </View>
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
        <View style={{width:'80%', alignSelf:'center'}}>
          <InputText name="search" value={search} icon="search" placeholder="Search Here..." handleChange={(e, text) => {setSearch(text)}}  />
        </View>
        
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
              {doctors.filter((d) => d?.doctor_name?.toLowerCase()?.includes(search)).map((doc, idx) => (
                <TouchableOpacity
                onPress={() => navigation.navigate('Doctor', {doctor:doc})}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.8,
                    paddingBottom: 10,
                  }}
                  key={idx}>
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
                  <Text
                    style={{alignSelf: 'center', fontSize: 18, color: '#000'}}>
                    {doc.doctor_name}
                  </Text>
                  <Icon
                    name="checkbox-active"
                    size={20}
                    color={theme1}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
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
    marginBottom: 60,
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
    // right:0,
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

export default connect(mapStateToProps)(Home);
