import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import baseurl from '../Api/baseurl'; // Assuming baseurl is the correct path to your API base URL
import { useNavigation } from '@react-navigation/native';

const Card = ({ person, index, onLongPress }) => (
    <TouchableOpacity onLongPress={() => onLongPress(person)}>
        <View style={styles.card}>
            <View style={styles.cardTopRow}>
                <View style={styles.serialNumberContainer}>
                    <Text style={styles.serialNumber}>{person.SerialNuber}</Text>
                </View>
                <View style={styles.voterIdContainer}>
                    <Text style={styles.voterId}>{person.ID}</Text>
                </View>
            </View>
            <View style={styles.cardContent}>

                <View style={styles.leftContent}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={{ color: '#77C9FF', fontWeight: 'bold' }}>{person.Name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Father's Name:</Text>
                        <Text>{person['Husband/Father/Mother Name/Other']}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>House Number:</Text>
                        <Text>{person['House Number']}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Address:</Text>
                        <Text>{person.Address ? person.Address.SectionName : ''}</Text>
                    </View>
                </View>
                <View style={styles.photoContainer} />
            </View>
            <View style={styles.bottomRow}>
                <Text style={styles.label}>Age: {person.Age}</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Gender:</Text>
                    <Text style={styles.gender}>{person.Gender}</Text>
                </View>
            </View>

        </View>
    </TouchableOpacity>
);


const UnallotedScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAgeFilter, setSelectedAgeFilter] = useState('');
    const [votersData, setVotersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 100;

    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, [currentPage]); // Update data when currentPage changes

    const fetchData = async () => {
        try {
            const response = await baseurl.get('/voters_details', {
                params: {
                    limit: cardsPerPage,
                    offset: (currentPage - 1) * cardsPerPage,
                }
            });
            console.log('Fetched voters data:', response.data);
            setVotersData(response.data); // Update voters data with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset page to 1 when search query changes
    };

    const handleAgeFilterChange = (value) => {
        setSelectedAgeFilter(value);
        setCurrentPage(1); // Reset page to 1 when age filter changes
    };

    const handleCardLongPress = (person) => {
    console.log('Long pressed:', person);
    navigation.navigate('DetailsScreen', { person: person }); // Make sure 'person' is correctly passed
};


    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };


    // Calculate total pages based on the total number of persons
    const totalPages = Math.ceil(votersData.reduce((acc, voter) => acc + voter.Persons.length, 0) / cardsPerPage);

    return (
        <View style={styles.container}>
            <View style={styles.profileCard}>
                <View style={styles.profileInfo}>
                    <Text style={styles.welcomeText}> Party name</Text>
                </View>
                <TouchableOpacity style={styles.notificationIcon}>
                    <Icon name="notifications-active" size={24} color="#fff" style={styles.notificationIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.nameInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by name"
                        onChangeText={handleSearch}
                        value={searchQuery}
                    />
                </View>
                <View style={styles.filterInputContainer}>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        placeholder={{ label: 'Filter by age...', value: null }}
                        onValueChange={handleAgeFilterChange}
                        items={[
                            { label: 'Under 30', value: 'under_30' },
                            { label: '30 - 40', value: '30_40' },
                            { label: '40 - 50', value: '40_50' },
                            { label: '40 - 50', value: '40_50' },
                            { label: '50 - 60', value: '50_60' },
                            { label: '60 - 70', value: '60_70' },
                            { label: '70 - 80', value: '70_80' },
                            { label: '80 - 90', value: '80_90' },
                            { label: 'over 90', value: 'over_90' },
                        ]}
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {votersData.map((voter, voterIndex) => (
                    <React.Fragment key={voterIndex}>
                        {voter.Persons.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map((person, personIndex) => (
                            <Card key={`${voter._id}_${personIndex}`} person={person} index={personIndex} onLongPress={handleCardLongPress} />
                        ))}
                    </React.Fragment>
                ))}
            </ScrollView>
            <View style={styles.paginationContainer}>
                <TouchableOpacity onPress={handlePrevPage} disabled={currentPage === 1}>
                    <Icon name="arrow-back" size={24} color="blue" style={styles.prevNextIcon} />
                </TouchableOpacity>
                <View style={styles.verticalLine} />
                <View style={styles.pageNumbersContainer}>
                    <TouchableOpacity onPress={() => setCurrentPage(1)}>
                        <Text style={[styles.pageNumber, currentPage === 1 && styles.currentPage]}>1</Text>
                    </TouchableOpacity>
                    {currentPage > 4 && <Text style={styles.pageNumber}>...</Text>}
                    {Array.from({ length: totalPages }, (_, i) => {
                        const pageLinksToShow = 1;
                        const start = Math.max(2, currentPage - pageLinksToShow);
                        const end = Math.min(totalPages - 1, currentPage + pageLinksToShow);
                        if (i >= start && i <= end) {
                            return (
                                <TouchableOpacity key={i} onPress={() => setCurrentPage(i)}>
                                    <Text style={[styles.pageNumber, currentPage === i && styles.currentPage]}>{i}</Text>
                                </TouchableOpacity>
                            );
                        }
                        return null;
                    })}
                    {currentPage < totalPages - 3 && <Text style={styles.pageNumber}>...</Text>}
                    {totalPages > 1 && (
                        <TouchableOpacity onPress={() => setCurrentPage(totalPages)}>
                            <Text style={[styles.pageNumber, currentPage === totalPages && styles.currentPage]}>{totalPages}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.verticalLine} />
                <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPages}>
                    <Icon name="arrow-forward" size={24} color="blue" style={styles.prevNextIcon} />
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
    card: {
        width: '100%',
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    label: {
        fontWeight: 'bold',
        marginRight: 3,
        fontSize: 12,
    },
    gender: {
        color: 'white',
        backgroundColor: '#77C9FF',
        borderRadius: 10,
        paddingHorizontal: 3,
        paddingVertical: 1,
        fontSize: 10,
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
    },
    cardsContainer: {
        padding: 20,
    },
    cardContent: {
        flexDirection: 'row',
    },
    leftContent: {
        flex: 1,
    },
    infoRow: {
        flexDirection: 'row',
    },
    photoContainer: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc',
        borderRadius: 5,
        marginLeft: 20,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    serialNumberContainer: {
        backgroundColor: 'blue',
        padding: 5,
        borderRadius: 5,
        width: 100
    },
    serialNumber: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'right'
    },
    voterIdContainer: {
        backgroundColor: '#77C9FF',
        padding: 5,
        borderRadius: 5,
    },
    voterId: {
        color: 'white',
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    nameInputContainer: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    filterInputContainer: {
        width: 150,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        paddingVertical: 5,
        width: '80%', // Adjust width as needed
        alignSelf: 'center', // Center horizontally
        marginBottom: 10,
    },

    prevNextIcon: {
        marginHorizontal: 10,
    },
    pageNumbersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verticalLine: {
        height: '100%',
        width: 1,
        backgroundColor: 'blue',
    },
    pageNumber: {
        marginHorizontal: 10,
        fontSize: 18, // Increase font size for page numbers
    },
    currentPage: {
        fontWeight: 'bold', // You can customize the style for the current page number
        fontSize: 20, // Increase font size for the current page number
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        width: '80%',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        width: '100%',
    },
});

export default UnallotedScreen;
