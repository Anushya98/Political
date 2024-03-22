import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseurl from '../Api/baseurl'; // Importing baseurl assuming it's correctly configured
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';

const AllocatedScreen = () => {
  const [voterDetails, setVoterDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const itemsPerPage = 30; // 30 cards per page

  useEffect(() => {
    // Fetch voter details when component mounts
    fetchVoterDetails();
  }, []);

  const fetchVoterDetails = async () => {
    try {
      // Fetch voter details from API
      const token = await AsyncStorage.getItem('access_token');
      const response = await baseurl.get('/voters_details', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = response.data;
      const votersArray = Object.values(data)[0];
      setVoterDetails(votersArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching voter details:', error);
      setLoading(false);
    }
  };

  const handleAgeFilterChange = (ageRange) => {
    setSelectedAgeRange(ageRange);
    // Reset current page when applying a new filter
    setCurrentPage(1);
  };

  const filterVoterDetailsByAge = () => {
    if (!selectedAgeRange || selectedAgeRange === 'all') { // Check if selectedAgeRange is 'all'
      return voterDetails;
    } else {
      const [minAge, maxAge] = selectedAgeRange.split('_');
      return voterDetails.filter(voter => {
        const age = parseInt(voter.Age);
        return age >= parseInt(minAge) && (maxAge ? age <= parseInt(maxAge) : true);
      });
    }
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterVoterDetailsByAge().slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterVoterDetailsByAge().length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(totalPages, prevPage + 1));
  };

  const searchHandler = async (text) => {
    const searchQuery = text.trim().toLowerCase();

    if (!isNaN(searchQuery)) {
      // If input is a number, search by serial number
      const filterVotersDetail = voterDetails.filter((voter) => voter.SerialNuber.toString().includes(searchQuery));
      setVoterDetails(filterVotersDetail);
    } else {
      // If input is not a number, search by name
      const filterVotersDetail = voterDetails.filter((voter) => {
        if (voter.Name) {
          return voter.Name.toLowerCase().startsWith(searchQuery);
        }
        return false;
      });
      setVoterDetails(filterVotersDetail);
    }

    if (searchQuery === "") {
      // If search query is empty, fetch voter details again
      await fetchVoterDetails();
    }
  };


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
            placeholder="Search by name or S.No"
            onChangeText={searchHandler}
          />
        </View>
        <View style={styles.filterInputContainer}>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: 'Filter by age...', value: 'all' }} // Set default value to 'all'
            onValueChange={handleAgeFilterChange}
            items={[
              { label: 'All Ages', value: 'all' }, // Ensure each item has a non-null value
              { label: 'under 20', value: '18_20' },
              { label: '20 - 30', value: '20_30' },
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
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {currentItems.length === 0 ? ( // Check if current items are empty
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>Voter details not available</Text>
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.cardsContainer}>
              {currentItems.map(user => (
                <View key={user.ID} style={styles.card}>
                  <View style={styles.cardTopRow}>
                    <View style={styles.serialNumberContainer}>
                      <Text style={styles.serialNumber}>S.No:{user.SerialNuber}</Text>
                    </View>
                    <View style={styles.voterIdContainer}>
                      <Text style={styles.voterId}>ID.No: {user.ID}</Text>
                    </View>
                  </View>
                  <View style={styles.cardContent}>
                    <View style={styles.leftContent}>
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={{ color: '#77C9FF', fontWeight: 'bold' }}>{user.Name}</Text>
                      </View>
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Father's Name:</Text>
                        <Text style={styles.users}>{user['Husband/Father/Mother Name/Other']}</Text>
                      </View>
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>House Number:</Text>
                        <Text>{user['House Number']}</Text>
                      </View>
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={styles.addressContainer}>{user.Address ? user.Address.SectionName : ''}</Text>
                      </View>
                    </View>
                    {/* <View style={styles.leftContent}>
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.users}>{user.Name}</Text>
                      </View>
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Father's Name:</Text>
                        <Text style={styles.users}>{user['Husband/Father/Mother Name/Other']}</Text>
                      </View>
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>House Number:</Text>
                        <Text style={styles.users}>{user['House Number']}</Text>
                      </View>
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Address: </Text>
                        <Text style={[styles.users, styles.addressContainer]}>{user.Address ? user.Address.SectionName : ''}</Text>
                      </View>
                    </View> */}
                    <View style={styles.rightContent}>
                      <View style={styles.photoContainer}>
                        {/* Placeholder for photo */}
                      </View>
                    </View>
                  </View>
                  <View style={styles.bottomRow}>
                    <Text style={styles.label}>Age: {user.Age}</Text>
                    <View style={styles.infoRow}>
                      <Text style={styles.label}>Gender:</Text>
                      <Text style={styles.gender}>{user.Gender}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
          <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={handlePrevPage} disabled={currentPage === 1}>
              <Icon name="arrow-back" size={24} color="#41A4E6" style={styles.prevNextIcon} />
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
              <Icon name="arrow-forward" size={24} color="#41A4E6" style={styles.prevNextIcon} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View >
  );
}

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
  notificationIcon: {},
  cardsContainer: {
    padding: 20,
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
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  serialNumberContainer: {
    backgroundColor: '#41A4E6',
    padding: 5,
    borderRadius: 5,
  },
  serialNumber: {
    color: 'white',
    fontWeight: 'bold',
  },
  // voterIdContainer: {
  //   backgroundColor: '#41A4E6',
  //   padding: 5,
  //   borderRadius: 5,
  // },
  voterId: {
    color: '#41A4E6',
    fontWeight: 'bold',
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  leftContent: {
    flex: 2, // Reduce the flex value to allocate less space to the left content
    marginRight: 10, // Add margin to separate from the photo container
  },
  addressContainer: {
    flexShrink: 1, // Allow the text to shrink if needed
  },
  rightContent: {
    width: 80, // Increase the width of the photo container
  },
  label: {
    fontWeight: 'bold',
    marginRight: 3,
    fontSize: 12,
  },
  users: {
    // flex:1,
    fontSize: 12,
  },
  photoContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    textAlign: "center"
  },
  gender: {
    color: 'white',
    backgroundColor: '#77C9FF',
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 1,
    fontSize: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#41A4E6',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: 'auto', // Adjust width as needed
    alignSelf: 'center', // Center horizontally
    marginBottom: 10,
  },

  // prevNextIcon: {
  //   paddingHorizontal: 10,
  // },
  verticalLine: {
    height: '100%',
    width: 1,
    backgroundColor: 'gray',
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageNumber: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  currentPage: {
    fontWeight: 'bold',
  },
  filterInputContainer: {
    width: 150,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
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


export default AllocatedScreen;
