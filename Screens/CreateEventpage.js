import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import baseurl from '../Api/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CreateEventPage = () => {
    const navigation = useNavigation(); // Initialize navigation

    const [places, setPlaces] = useState([]);
    const [newPlace, setNewPlace] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [coordinatorNumbers, setCoordinatorNumbers] = useState([]);
    const [newCoordinatorNumber, setNewCoordinatorNumber] = useState('');
    const [assemblingPoints, setAssemblingPoints] = useState([]);
    const [newAssemblingPoint, setNewAssemblingPoint] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); // State variable to store the selected date
    const [selectedStartTime, setSelectedStartTime] = useState(null); // State variable to store the selected start time
    const [selectedEndTime, setSelectedEndTime] = useState(null); // State variable to store the selected end time
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false); // State variable for start time picker visibility
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false); // State variable for end time picker visibility

    const handleUpdateEvent = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');

            // Combine new values with existing values for coordinator numbers, assembling points, and places
            const updatedCoordinatorNumbers = [...coordinatorNumbers];
            if (newCoordinatorNumber.trim() !== '') {
                updatedCoordinatorNumbers.push(newCoordinatorNumber);
            }

            const updatedAssemblingPoints = [...assemblingPoints];
            if (newAssemblingPoint.trim() !== '') {
                updatedAssemblingPoints.push(newAssemblingPoint);
            }

            const updatedPlaces = [...places];
            if (newPlace.trim() !== '') {
                updatedPlaces.push(newPlace);
            }

            // Prepare the event data
            const eventData = {
                canvassing_place: updatedPlaces,
                starting_time: selectedStartTime,
                ending_time: selectedEndTime,
                coordinator_number: updatedCoordinatorNumbers,
                assembling_point: updatedAssemblingPoints,
                canvassing_date: selectedDate
            };

            console.log('Request Payload:', eventData); // Log request payload

            // Make a POST request to create the event
            const response = await baseurl.post('/event', eventData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Event created successfully:', response.data);
            // Handle the success response, e.g., show a success message
            Alert.alert('Success', 'Event created successfully', [
                { text: 'OK', onPress: () => resetForm() }
            ]);
        } catch (error) {
            console.error('Error creating event:', error);
            // Handle the error, e.g., show an error message
            Alert.alert('Error', 'Failed to create event. Please try again.');
        }
    };

    // Function to reset the form to its initial state
    const resetForm = () => {
        setPlaces([]);
        setNewPlace('');
        setStartTime('');
        setEndTime('');
        setCoordinatorNumbers([]);
        setNewCoordinatorNumber('');
        setAssemblingPoints([]);
        setNewAssemblingPoint('');
        setSelectedDate(null);
        setSelectedStartTime(null);
        setSelectedEndTime(null);
        setDatePickerVisibility(false);
        setStartTimePickerVisibility(false);
        setEndTimePickerVisibility(false);
    };


    const handleClosePage = () => {
        navigation.goBack(); // Navigate back to the previous screen
    };

    const addPlace = () => {
        if (newPlace.trim() !== '') {
            setPlaces([...places, newPlace]);
            setNewPlace('');
        }
    };

    const addCoordinatorNumber = () => {
        if (newCoordinatorNumber.trim() !== '') {
            setCoordinatorNumbers([...coordinatorNumbers, newCoordinatorNumber]);
            setNewCoordinatorNumber('');
        }
    };

    const addAssemblingPoint = () => {
        if (newAssemblingPoint.trim() !== '') {
            setAssemblingPoints([...assemblingPoints, newAssemblingPoint]);
            setNewAssemblingPoint('');
        }
    };

    const updatePlace = (index, value) => {
        const updatedPlaces = [...places];
        updatedPlaces[index] = value;
        setPlaces(updatedPlaces);
    };

    const updateCoordinatorNumber = (index, value) => {
        const updatedCoordinatorNumbers = [...coordinatorNumbers];
        updatedCoordinatorNumbers[index] = value;
        setCoordinatorNumbers(updatedCoordinatorNumbers);
    };

    const updateAssemblingPoint = (index, value) => {
        const updatedAssemblingPoints = [...assemblingPoints];
        updatedAssemblingPoints[index] = value;
        setAssemblingPoints(updatedAssemblingPoints);
    };
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date); // Step 2: Update selected date when a date is selected
        hideDatePicker();
    };

    const showStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    };

    const hideStartTimePicker = () => {
        setStartTimePickerVisibility(false);
    };

    const handleConfirmStartTime = (time) => {
        setSelectedStartTime(time);
        hideStartTimePicker();
    };

    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    };

    const handleConfirmEndTime = (time) => {
        setSelectedEndTime(time);
        hideEndTimePicker();
    };

    const formatTime = (time) => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const amPM = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amPM}`;
    };
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClosePage} style={styles.backIcon}>
                    <Icon name="close" size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Create Event</Text>
            </View>
            {/* Card Container */}
            <ScrollView contentContainerStyle={styles.cardContainer}>
                <View style={styles.card}>
                    {/* Canvassing Place */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Canvassing Place</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter place"
                                value={newPlace}
                                onChangeText={(text) => setNewPlace(text)}
                            />
                            <TouchableOpacity onPress={addPlace}>
                                <Icon name="add" size={24} color="#41A4E6" />
                            </TouchableOpacity>
                        </View>
                        {places.map((place, index) => (
                            <Text key={index}>{place}</Text>
                        ))}
                    </View>
                    {/* Canvassing Dates */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Canvassing Dates</Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                            placeholder="Select Date"
                        />
                        <TouchableOpacity onPress={showDatePicker} style={styles.datePickerButton}>
                            <Icon name="calendar-month" size={24} color="#41A4E6" />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    {/* Start Time */}
                    <View style={styles.timeSection}>
                        <View style={styles.timeInputContainer}>
                            <Text style={styles.sectionHeader}>Start Time</Text>
                            <TextInput
                                style={styles.input}
                                editable={false}
                                value={selectedStartTime ? formatTime(selectedStartTime) : ''}
                                placeholder="Start Time"
                            />
                            <TouchableOpacity onPress={showStartTimePicker} style={styles.timePickerButton}>
                                <Icon name="access-time" size={24} color="#41A4E6" />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isStartTimePickerVisible}
                                mode="time"
                                onConfirm={handleConfirmStartTime}
                                onCancel={hideStartTimePicker}
                            />
                        </View>

                        <View style={styles.timeInputContainer}>
                            <Text style={styles.sectionHeader}>End Time</Text>
                            <TextInput
                                style={styles.input}
                                editable={false}
                                value={selectedEndTime ? formatTime(selectedEndTime) : ''}
                                placeholder="End Time"
                            />
                            <TouchableOpacity onPress={showEndTimePicker} style={styles.timePickerButton}>
                                <Icon name="access-time" size={24} color="#41A4E6" />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isEndTimePickerVisible}
                                mode="time"
                                onConfirm={handleConfirmEndTime}
                                onCancel={hideEndTimePicker}
                            />
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Coordinator Numbers</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter coordinator number"
                                value={newCoordinatorNumber}
                                onChangeText={(text) => setNewCoordinatorNumber(text)}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity onPress={addCoordinatorNumber}>
                                <Icon name="add" size={24} color="#41A4E6" />
                            </TouchableOpacity>
                        </View>
                        {coordinatorNumbers.map((number, index) => (
                            <Text key={index}>{number}</Text>
                        ))}
                    </View>

                    {/* Assembling Points */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Assembling Points</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter assembling point"
                                value={newAssemblingPoint}
                                onChangeText={(text) => setNewAssemblingPoint(text)}
                            />
                            <TouchableOpacity onPress={addAssemblingPoint}>
                                <Icon name="add" size={24} color="#41A4E6" />
                            </TouchableOpacity>
                        </View>
                        {assemblingPoints.map((point, index) => (
                            <Text key={index}>{point}</Text>
                        ))}
                    </View>

                    {/* Update and Close Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleUpdateEvent} style={styles.button}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClosePage} style={[styles.button, styles.closeButton]}>
                            <Text style={[styles.buttonText, styles.closeButtonText]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 10,
    },
    closeIcon: {
        marginRight: 10,
    },
    cardContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
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
    section: {
        marginBottom: 15,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        maxWidth: 275,
        marginRight: 10,
    },

    timeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    timeInputContainer: {
        flex: 1,
        width: 100,
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#41A4E6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#41A4E6',
    },
    closeButtonText: {
        color: '#41A4E6',
    },
    datePickerButton: {
        position: 'absolute',
        right: 0,
        top: 35,
        paddingRight: 40,
    },
    timePickerButton: {
        position: 'absolute',
        right: 0,
        top: 35,
        paddingRight: 20,
    },
});

export default CreateEventPage;
