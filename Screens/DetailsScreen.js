import React, { useState, useEffect } from 'react';
import { BackHandler, View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';

const DetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { person } = route.params;

    const [phoneNumber, setPhoneNumber] = useState('');
    const [casteOptions, setCasteOptions] = useState({ ABCD: false, BACA: false, CABF: false, Others: false });
    const [religionOptions, setReligionOptions] = useState({ Christian: false, muslim: false, hindu: false, Others: false });
    const [casteOthersValue, setCasteOthersValue] = useState('');
    const [religionOthersValue, setReligionOthersValue] = useState('');
    const [influencer1, setInfluencer1] = useState('');
    const [influencer2, setInfluencer2] = useState('');
    const [familyInput, setFamilyInput] = useState('');
    const [selectedFamilyMembers, setSelectedFamilyMembers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // Do not navigate back when the hardware back button is pressed
            return true;
        });

        return () => backHandler.remove();
    }, []);

    const handleCasteChange = (option, isChecked) => {
        const updatedOptions = { ...casteOptions, [option]: isChecked };
        if (option === 'Others' && isChecked === false) {
            setCasteOthersValue('');
        }
        setCasteOptions(updatedOptions);
    };

    const handleReligionChange = (option, isChecked) => {
        const updatedOptions = { ...religionOptions, [option]: isChecked };
        if (option === 'Others' && isChecked === false) {
            setReligionOthersValue('');
        }
        setReligionOptions(updatedOptions);
    };

    const handleInputChange = (text) => {
        setFamilyInput(text);
        const dynamicFamilyNames = [
            'John Doe',
            'Jane Smith',
            'Michael Johnson',
            'Emily Davis',
            'David Wilson',
            'Sarah Martinez',
            'Chris Taylor',
            'Anna Thompson',
            'James White',
            'Emma Harris',
        ];
        const filteredSuggestions = dynamicFamilyNames.filter((name) =>
            name.toLowerCase().includes(text.toLowerCase())
        );
        if (filteredSuggestions.length > 0 && !selectedFamilyMembers.includes(text)) {
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleInputSubmit = () => {
        if (familyInput.trim() !== '' && !selectedFamilyMembers.includes(familyInput)) {
            setSelectedFamilyMembers([...selectedFamilyMembers, familyInput]);
            setFamilyInput('');
        }
    };

    const handleSuggestionSelect = (item) => {
        setFamilyInput('');
        setSelectedFamilyMembers([...selectedFamilyMembers, item]);
        setSuggestions([]);
    };

    const handleRemoveFamilyMember = (index) => {
        const updatedFamilyMembers = [...selectedFamilyMembers];
        updatedFamilyMembers.splice(index, 1);
        setSelectedFamilyMembers(updatedFamilyMembers);
    };

    const handleUpdate = () => {
        console.log("Update button pressed");
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView>
                <View style={styles.profileCard}>
                    <View style={styles.profileInfo}>
                        <Text style={styles.welcomeText}> Party name</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationIcon}>
                        <Icon name="notifications-active" size={24} color="#fff" style={styles.notificationIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContent}>
                    <Text style={styles.header}>Details of {person.Name}</Text>
                    <Text style={styles.heading}>Caste</Text>
                    <View style={styles.checkboxRow}>
                        {Object.keys(casteOptions).map((option, index) => (
                            <View key={option} style={[styles.checkboxContainer, index % 2 === 1 ? { marginRight: 10 } : null]}>
                                <CheckBox
                                    value={casteOptions[option]}
                                    onValueChange={(isChecked) => handleCasteChange(option, isChecked)}
                                />
                                <Text style={styles.label}>{option}</Text>
                                {option === 'Others' && casteOptions['Others'] && (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Type caste..."
                                        onChangeText={setCasteOthersValue}
                                        value={casteOthersValue}
                                    />
                                )}
                            </View>
                        ))}
                    </View>

                    <Text style={styles.heading}>Religion</Text>
                    <View style={styles.checkboxRow}>
                        {Object.keys(religionOptions).map((option, index) => (
                            <View key={option} style={[styles.checkboxContainer, index % 2 === 1 ? { marginRight: 10 } : null]}>
                                <CheckBox
                                    value={religionOptions[option]}
                                    onValueChange={(isChecked) => handleReligionChange(option, isChecked)}
                                />
                                <Text style={styles.label}>{option}</Text>
                                {option === 'Others' && religionOptions['Others'] && (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Type religion..."
                                        onChangeText={setReligionOthersValue}
                                        value={religionOthersValue}
                                    />
                                )}
                            </View>
                        ))}
                    </View>

                    <Text style={styles.heading}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter phone number"
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        keyboardType="phone-pad"
                    />
                    <Text style={styles.heading}>Influencer 1</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter influencer 1"
                        onChangeText={setInfluencer1}
                        value={influencer1}
                    />
                    <Text style={styles.heading}>Influencer 2</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter influencer 2"
                        onChangeText={setInfluencer2}
                        value={influencer2}
                    />
                    <Text style={styles.heading}>Family</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter family member"
                            onChangeText={handleInputChange}
                            onSubmitEditing={handleInputSubmit}
                            value={familyInput}
                        />
                    </View>
                    <View style={styles.selectedFamilyMembersContainer}>
                        {selectedFamilyMembers.map((item, index) => (
                            <View key={index} style={styles.selectedFamilyMember}>
                                <Text style={styles.selectedFamilyMemberText}>{item}</Text>
                                <TouchableOpacity onPress={() => handleRemoveFamilyMember(index)}>
                                    <Icon name="clear" size={20} color="gray" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    <View style={styles.suggestionsContainer}>
                        {suggestions.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.suggestionContainer}
                                onPress={() => handleSuggestionSelect(item)}
                            >
                                <Text style={styles.suggestionText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        left: 20,
    },
    notificationIcon: {
        // padding: 10,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'purple',
        textAlign: 'center',
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: 'pink',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '45%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    familyMembersContainer: {
        marginTop: 5,
    },
    familyMemberItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    selectedFamilyMember: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 8,
        marginBottom: 5,
    },
    selectedFamilyMemberText: {
        marginRight: 10,
    },
    suggestionContainer: {
        padding: 10,
        backgroundColor: '#fff',
    },
    suggestionText: {
        fontSize: 16,
        color: '#333',
    },
    selectedFamilyMembersContainer: {
        marginBottom: 10,
    },
    suggestionsContainer: {
        marginBottom: 10,
    },
});

export default DetailsScreen;
