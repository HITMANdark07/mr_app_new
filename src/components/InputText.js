import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const InputText = ({icon, placeholder,type, name, handleChange,value, password, disable }) => {

    return (
        <View style={styles.input}>
            <Icon name={icon} style={styles.icon} size={30} color="#6B6B6B" />
            {type ? 
            (<TextInput style={{flex:1, color:'#000'}} value={value} editable={disable} autoCapitalize='none' placeholderTextColor="#000"  onChangeText={(e) => handleChange(name, e)} placeholder={placeholder} keyboardType={type} />)
            :
            (<TextInput style={{flex:1, color:'#000'}} value={value} editable={disable} autoCapitalize='none' placeholderTextColor="#000" onChangeText={(e) => handleChange(name, e)} placeholder={placeholder} secureTextEntry={password} />)
            }
        </View>
    )
};

const styles = StyleSheet.create({
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
    icon:{
        padding:6
    }
})

export default InputText;
