import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Mainpage = () => {
    const navigation = useNavigation();

    const handleTabPress = (routeName) => {
        navigation.navigate(routeName);
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileCard}>
                {/* <Image source={require('../assets/profile_image.png')} style={styles.profileImage} /> */}
                <View style={styles.profileInfo}>
                    <Text style={styles.welcomeText}> Party name</Text>
                </View>
                <TouchableOpacity style={styles.notificationIcon}>
                    <Icon name="notifications-active" size={24} color="#fff" style={styles.notificationIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleTabPress('Allocated')}>
                    <Image source={require('../assets/add-category-svgrepo-com.png')} style={[styles.cardImage, { tintColor: '#fff' }]} />
                    <Text style={styles.buttonText}>Allocated</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleTabPress('Unalloted')}>
                    <Image source={require('../assets/received-inbox-svgrepo-com.png')} style={[styles.cardImage, { tintColor: '#fff' }]} />
                    <Text style={styles.buttonText}>Unalloted</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleTabPress('OwnParty')}>
                    <Image source={require('../assets/businessman-ceo-representative-boss-svgrepo-com.png')} style={[styles.cardImage, { tintColor: '#fff' }]} />
                    <Text style={styles.buttonText}>Own Party</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleTabPress('OppositeParty')}>
                    <Image source={require('../assets/opposite-arrows-couple-svgrepo-com.png')} style={[styles.cardImage, { tintColor: '#fff' }]} />
                    <Text style={styles.buttonText}>Opposite Party</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleTabPress('Neutral')}>
                    <Image source={require('../assets/neutral-trading-svgrepo-com.png')} style={[styles.cardImage, { tintColor: '#fff' }]} />
                    <Text style={styles.buttonText}>Neutral</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleTabPress('Not Available')}>
                    <Image source={require('../assets/unavailable-svgrepo-com.png')} style={[styles.cardImage, { tintColor: '#fff' }]} />
                    <Text style={styles.buttonText}>Not Available</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleTabPress('Details Not Known')}>
                    <Image source={require('../assets/unknown-svgrepo-com.png')} style={[styles.cardImage, { tintColor: '#fff' }]} />
                    <Text style={styles.buttonText}>Details Not Known</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleTabPress('Completed')}>
                    <Image source={require('../assets/finished-svgrepo-com.png')} style={[styles.cardImage, { tintColor: '#fff' }]} />
                    <Text style={styles.buttonText}>Completed</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cardImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 15,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#77C9FF',
        padding: 10,
    },
    profileInfo: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        left:20,
    },
    notificationIcon: {
        // padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 25,
        alignItems: "center"
    },
    button: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: '#77C9FF', // Light blue background color
        alignItems: 'center',
        // justifyContent: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff', // White text color
        // marginTop: 5,
    },
});

export default Mainpage;
