import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
    const navigation = useNavigation(); // Initialize navigation

    const handleVoterDetailsPress = () => {
        navigation.navigate('MainPage'); // Navigate to MainPage when "Voter Details" is pressed
    };
    const handleCanvassingDetailsPress = () => {
        navigation.navigate('Canvassing'); // Navigate to MainPage when "Voter Details" is pressed
    };
    const handleEventsPress = () => {
        navigation.navigate('Events'); // Navigate to MainPage when "Voter Details" is pressed
    };

    return (
        <View style={styles.container}>
            {/* Top section with image and circular overlay */}
            <View style={styles.topSection}>
                <Image
                    source={require('../assets/2150913274(1).jpg')} // Replace with your image path
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.overlayContainer}>
                    <View style={styles.circularOverlay}>
                        <View style={styles.innerCircle} />
                    </View>
                </View>
            </View>

            {/* Text and button cards */}
            <View style={styles.bottomSection}>

                <View style={styles.topText}>
                    <Text style={styles.loginName}>John Doe</Text>
                    <Text style={styles.infoText}>Allocated Polling Booth: Nagercoil</Text>
                    <Text style={styles.infoText}>Allocated Assembly Constituency: ABC</Text>
                    <Text style={styles.infoText}>Allocated Parliament Constituency: XYZ</Text>
                </View>
                {/* Individual TouchableOpacity components for each button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonCard} onPress={handleVoterDetailsPress}>
                        <Image source={require('../assets/poll-people-svgrepo-com.png')} style={[styles.buttonImage, { tintColor: '#41A4E6' }]} />
                        <Text style={styles.buttonText}>Voter Details</Text>
                    </TouchableOpacity>
                    {/* Repeat this TouchableOpacity pattern for other buttons */}
                    <TouchableOpacity style={styles.buttonCard}>
                        <Image source={require('../assets/person-rotation-svgrepo-com.png')} style={[styles.buttonImage, { tintColor: '#41A4E6' }]} />
                        <Text style={styles.buttonText}>Incharge</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCard}>
                        <Image source={require('../assets/pdf-send-portable-digital-file-svgrepo-com.png')} style={[styles.buttonImage, { tintColor: '#41A4E6' }]} />
                        <Text style={styles.buttonText}>Polling Booth PDF Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCard} onPress={handleCanvassingDetailsPress}>
                        <Image source={require('../assets/illustration-of-handshake-svgrepo-com.png')} style={[styles.buttonImage, { tintColor: '#41A4E6' }]} />
                        <Text style={styles.buttonText}>Canvassing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCard} onPress={handleEventsPress}>
                        <Image source={require('../assets/event-svgrepo-com.png')} style={[styles.buttonImage, { tintColor: '#41A4E6' }]} />
                        <Text style={styles.buttonText}>Event</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCard}>
                        <Image source={require('../assets/information-circle-svgrepo-com.png')} style={[styles.buttonImage, { tintColor: '#41A4E6' }]} />
                        <Text style={styles.buttonText}>Information</Text>
                    </TouchableOpacity>
                    {/* Repeat this TouchableOpacity pattern for other buttons */}
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF4F6'
    },
    topSection: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        height: 180, // Adjust height as needed
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlayContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '60%',
        alignItems: 'center',
    },
    circularOverlay: {
        width: 120,
        height: 120,
        borderRadius: 75,
        backgroundColor: '#EFF4F6', // Light blue background color
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        width: 100,
        height: 100,
        borderRadius: 70,
        backgroundColor: '#fff', // White inner color
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#41A4E6'
    },
    topText: {
        paddingTop: 40,
        alignItems: 'center',
    },
    bottomSection: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    loginName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#41A4E6'
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#41A4E6'
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    buttonCard: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
        height: 120,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#41A4E6',
        borderRadius: 10,
        elevation: 3, // Elevation for shadow effect
        shadowColor: '#41A4E6', // Shadow color
        shadowOffset: {
            width: 5, // Adjust the width for the shadow spread
            height: 0, // No vertical shadow offset
        },
        shadowOpacity: 0.8, // Opacity of the shadow
        shadowRadius: 5, // Radius of the shadow
    },
    buttonText: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center',
        color: '#41A4E6',
    },
    buttonImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
});

export default HomePage;
// {/* Button cards */}
// <View style={styles.buttonContainer}>
//     <ButtonCard title="Voter Details" imageUrl={require('../assets/poll-people-svgrepo-com.png')} onPress={handleVoterDetailsPress} />
//     <ButtonCard title="Incharge" imageUrl={require('../assets/person-rotation-svgrepo-com.png')} />
//     <ButtonCard title="Polling Booth PDF Update" imageUrl={require('../assets/pdf-send-portable-digital-file-svgrepo-com.png')} />
//     <ButtonCard title="Canvassing" imageUrl={require('../assets/illustration-of-handshake-svgrepo-com.png')} />
//     <ButtonCard title="Event" imageUrl={require('../assets/event-svgrepo-com.png')} />
//     <ButtonCard title="Information" imageUrl={require('../assets/information-circle-svgrepo-com.png')} />
// </View>

