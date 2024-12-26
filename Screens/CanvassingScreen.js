import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import baseurl from '../Api/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'


const CanvassingPage = () => { // Removed navigation parameter
    const [yesButtonPressed, setYesButtonPressed] = useState(false);
    const [noButtonPressed, setNoButtonPressed] = useState(false);
    const [influencerData, setInfluencerData] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation(); // Use the useNavigation hook

    useEffect(() => {
        fetchInfluencerData();
    }, []);

    const fetchInfluencerData = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');

            const response = await baseurl.get('/get_persons_by_influencer', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Influencer data:', response.data.influencer_data);
            setInfluencerData(response.data.influencer_data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching influencer data:', error);
            setLoading(false);
        }
    };
    const handleYesPress = () => {
        setYesButtonPressed(true);
        setNoButtonPressed(false);
    };

    const handleNoPress = () => {
        setNoButtonPressed(true);
        setYesButtonPressed(false);
    };
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Back Icon and Text */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#ffffff" style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Back</Text>
                {/* Search and Notification Icon */}
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name="search" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name="notifications-active" size={24} color="#fff" style={styles.notificationIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Blue Line */}
            <View style={styles.canvassingContainer}>
                {/* Text for "Canvassing" */}
                <Text style={styles.canvassingText}>Canvassing</Text>
                {/* Blue line */}
                <View style={styles.blueLine} />
            </View>


            {/* Card Section */}
            <ScrollView contentContainerStyle={styles.cardContainer}>
                {/* Render influencer data */}
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : influencerData.length === 0 ? (
                    <Text style={styles.noDataMessage}>No voter details for this person.</Text>
                ) : (
                    influencerData.map((influencer, index) => (
                        <View key={index} style={styles.card}>
                            {/* Serial Number and Voter ID */}
                            <View style={styles.cardTopRow}>
                                <View style={styles.serialNumberContainer}>
                                    <Text style={styles.serialNumber}> {influencer.SerialNuber}</Text>
                                </View>
                                <View style={styles.voterIdContainer}>
                                    <Text style={styles.voterId}>Voter ID: {influencer.ID}</Text>
                                </View>
                            </View>

                            <View style={styles.cardContent}>
                                <View style={styles.infoContainer}>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Name:</Text>
                                        <Text style={styles.info}>{influencer.Name}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Father's Name:</Text>
                                        <Text style={[styles.info, styles.Container]}>{influencer['Husband/Father/Mother Name/Other']}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Door Number:</Text>
                                        <Text style={styles.info}>{influencer['House Number']}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Address:</Text>
                                        <Text style={[styles.info, styles.Container]}>{influencer.Address ? influencer.Address.SectionName : ''}</Text>
                                    </View>
                                </View>
                                <View style={styles.rightContent}>
                                    <View style={styles.photoContainer}>
                                        {/* Placeholder for photo */}
                                    </View>
                                </View>
                            </View>
                            {/* Age and Gender */}
                            <View style={styles.bottomRow}>
                                <Text style={styles.label}>Age: {influencer.Age}</Text>
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Gender:</Text>
                                    <Text style={styles.gender}>{influencer.Gender}</Text>
                                </View>
                            </View>
                            {/* Yes/No Buttons */}
                            <View style={styles.buttonContainer}>
                                <TouchableHighlight
                                    onPress={handleYesPress}
                                    style={[styles.button, yesButtonPressed ? styles.buttonActive : styles.buttonInactive]}
                                    underlayColor="#007bff"
                                >
                                    <Text style={[styles.buttonText, yesButtonPressed ? styles.buttonTextActive : null]}>Yes</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={handleNoPress}
                                    style={[styles.button, noButtonPressed ? styles.buttonActive : styles.buttonInactive]}
                                    underlayColor="#007bff"
                                >
                                    <Text style={[styles.buttonText, noButtonPressed ? styles.buttonTextActive : null]}>No</Text>
                                </TouchableHighlight>
                            </View>


                            {/* 5 Other Buttons */}
                            <View style={styles.otherButtonContainer}>
                                <TouchableOpacity onPress={() => console.log('Button 1')} style={styles.otherButton}>
                                    <Text style={styles.OtherbuttonText}>Ok</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('Button 2')} style={styles.otherButton}>
                                    <Text style={styles.OtherbuttonText}>Opposite Party</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('Button 3')} style={styles.otherButton}>
                                    <Text style={styles.OtherbuttonText}>Not Available</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('Button 4')} style={styles.otherButton}>
                                    <Text style={styles.OtherbuttonText}>Neutral</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('Button 5')} style={styles.otherButton}>
                                    <Text style={styles.OtherbuttonText}>Need more visit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#41A4E6',
        padding: 10,
    },
    backIcon: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 10,
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 10,
    },
    icon: {
        marginLeft: 10, // Add margin between the icons
    },
    notificationIcon: {
        marginLeft: 5, // Add margin between the icon and the notification badge
    },
    canvassingContainer: {
        marginLeft: 20,
        marginRight: 20,
    },
    canvassingText: {
        color: '#41A4E6',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    blueLine: {
        backgroundColor: '#41A4E6',
        height: 2,
        width: '100%',
    },
    cardContainer: {
        padding: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        alignItems: "center"
    },
    serialNumberContainer: {
        backgroundColor: '#41A4E6',
        padding: 5,
        borderRadius: 5,
        width: 100,

    },
    serialNumber: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'right'
    },
    // voterIdContainer: {
    //     // backgroundColor: '#007bff',
    //     padding: 5,
    //     borderRadius: 5,
    // },
    voterId: {
        color: '#41A4E6',
        fontWeight: 'bold',
    },
    cardContent: {
        flexDirection: 'row',
        // marginBottom: 5,
    },
    leftContent: {
        flex: 1, // Reduce the flex value to allocate less space to the left content
        marginRight: 50,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 3,
        fontSize: 12,
    },
    rightContent: {
        width: 80, // Increase the width of the photo container
    },
    photoContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    Container: {
        flexShrink: 1,
    },
    infoContainer: {
        flex: 2, // Reduce the flex value to allocate less space to the left content
        marginRight: 10,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    // label: {
    //     fontWeight: 'bold',
    //     marginRight: 5,
    // },
    info: {
        fontSize: 12,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    gender: {
        color: '#ffffff',
        backgroundColor: '#41A4E6',
        borderRadius: 10,
        paddingHorizontal: 5,
        // paddingVertical: 2,
        fontSize: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        width: 55,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#41A4E6',
        borderRadius: 25,
        marginHorizontal: 10,
    },
    buttonInactive: {
        backgroundColor: '#ffffff',
    },
    buttonActive: {
        backgroundColor: '#41A4E6',
    },
    buttonTextActive: {
        color: '#ffffff',
    },

    buttonText: {
        color: '#41A4E6',
        fontSize: 10,
    },
    otherButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    otherButton: {
        backgroundColor: '#41A4E6',
        padding: 5,
        borderRadius: 5,
        width: '18%', // Adjust button width as needed
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        borderRadius: 25,
        // marginHorizontal: 5,
    },
    OtherbuttonText: {
        color: '#ffffff',
        fontSize: 8,
        textAlign: 'center'
    },
    noDataMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666', // Adjust the color as needed
    }

});

export default CanvassingPage;