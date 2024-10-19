import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InformationScreen = ({ navigation }) => {
    const [informationData, setInformationData] = useState([
        { id: 1, title: 'Important Notice', description: 'Please be informed that there will be a scheduled maintenance tomorrow from 10:00 AM to 12:00 PM. We apologize for any inconvenience this may cause.' },
        { id: 2, title: 'New Feature Announcement', description: 'We are excited to announce the release of our new feature! Check out our app now to explore the latest updates.' },
        { id: 3, title: 'Upcoming Event', description: 'Don\'t miss out on our upcoming event happening next weekend! Join us for a day filled with fun activities and entertainment.' },
        { id: 4, title: 'Product Update', description: 'We have just released a new version of our product with improved performance and enhanced user experience. Update now to enjoy the latest features.' },
        { id: 5, title: 'Holiday Closure', description: 'Please note that our office will be closed on the following dates for the upcoming holidays: December 24th, December 25th, and January 1st. We wish you a happy holiday season!' },
    ]);

    const handleCardPress = (id) => {
        // Handle card press action here
        console.log('Card pressed with ID:', id);
    };

    const renderInformationCards = () => {
        return informationData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} onPress={() => handleCardPress(item.id)}>
                <View style={styles.cardHeader}>
                    <View style={styles.shareIconContainer}>
                        <Icon name="share" size={20} color="#41A4E6" />
                    </View>
                    <Text style={styles.cardHeaderText}>{item.title}</Text>
                </View>
                <Text style={styles.cardDescription}>{item.description}</Text>
            </TouchableOpacity>
        ));
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

            {/* Information Section */}
            <ScrollView contentContainerStyle={styles.cardContainer}>
                {renderInformationCards()}
            </ScrollView>
        </View>
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
        marginLeft: 10,
    },
    notificationIcon: {
        marginLeft: 5,
    },
    cardContainer: {
        padding: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
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
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareIconContainer: {
        marginRight: 10,
    },
    cardHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    cardDescription: {
        marginTop: 10,
        color: '#666666',
    },
});

export default InformationScreen;
