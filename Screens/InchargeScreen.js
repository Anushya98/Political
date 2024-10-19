import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Import WhatsApp icon

const InchargeScreen = () => {
    const navigation = useNavigation(); // Initialize navigation
    // Dummy data for 10 cards
    const inchargeData = [
        {
            id: 1,
            name: 'John Doe',
            position: 'Manager',
            number: '123-456-7890',
        },
        {
            id: 2,
            name: 'Jane Smith',
            position: 'Supervisor',
            number: '456-789-0123',
        },
        {
            id: 3,
            name: 'Alice Johnson',
            position: 'Team Lead',
            number: '789-012-3456',
        },
        {
            id: 4,
            name: 'Bob Brown',
            position: 'Coordinator',
            number: '012-345-6789',
        },
        {
            id: 5,
            name: 'Emma Davis',
            position: 'Assistant',
            number: '345-678-9012',
        },
        {
            id: 6,
            name: 'Michael Wilson',
            position: 'Manager',
            number: '678-901-2345',
        },
        {
            id: 7,
            name: 'Sarah Martinez',
            position: 'Supervisor',
            number: '901-234-5678',
        },
        {
            id: 8,
            name: 'David Taylor',
            position: 'Team Lead',
            number: '234-567-8901',
        },
        {
            id: 9,
            name: 'Olivia Anderson',
            position: 'Coordinator',
            number: '567-890-1234',
        },
        {
            id: 10,
            name: 'James White',
            position: 'Assistant',
            number: '890-123-4567',
        },
    ];

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
                <View style={styles.iconContainers}>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name="search" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name="notifications-active" size={24} color="#fff" style={styles.notificationIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Content */}
            <ScrollView contentContainerStyle={styles.content}>
                {inchargeData.map((incharge) => (
                    <TouchableOpacity key={incharge.id} style={styles.card}>
                        {/* Left section with photo */}
                        <View style={styles.leftSection}>
                            {/* Placeholder for photo */}
                            <View style={styles.photoPlaceholder} />
                        </View>
                        {/* Middle section with name, position, and number */}
                        <View style={styles.middleSection}>
                            <Text style={styles.name}>{incharge.name}</Text>
                            <Text style={styles.position}>{incharge.position}</Text>
                            <Text style={styles.number}>{incharge.number}</Text>
                        </View>
                        {/* Right section with phone and WhatsApp icons */}
                        <View style={styles.rightSection}>
                            <TouchableOpacity style={styles.iconContainer}>
                                <Icon name="phone" size={24} color="#41A4E6" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconContainer}>
                                <FontAwesomeIcon name="whatsapp" size={24} color="#25D366" /> 
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
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
    iconContainers: {
        // backgroundColor:"red",
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align items to the end of the container
        flex: 1, // Allow icons to take remaining space

    },
    icon: {
        marginLeft: 10, // Add margin between the icons
    },
    notificationIcon: {
        marginLeft: 5, // Add margin between the icon and the notification badge
    },
    content: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    leftSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc', // Placeholder color for photo
        borderRadius: 25,
    },
    middleSection: {
        flex: 3,
        paddingLeft: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    position: {
        fontSize: 14,
        color: '#555',
    },
    number: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    rightSection: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 10,
    },
});

export default InchargeScreen;

