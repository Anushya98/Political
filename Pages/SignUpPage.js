import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import baseurl from '../Api/baseurl'; // Assuming baseurl is the correct path to your API base URL
import { Picker } from '@react-native-picker/picker';


const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [partyName, setPartyName] = useState('');
    const [constituency, setConstituency] = useState('');
    const [position, setPosition] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [filteredConstituencies, setFilteredConstituencies] = useState([]);
    const [filteredPositions, setFilteredPositions] = useState([]);
    const [isConstituencyPickerVisible, setIsConstituencyPickerVisible] = useState(false);
    const [showConstituencyPicker, setShowConstituencyPicker] = useState(false);


    // List of all constituencies and positions
    const allConstituencies = [
        "GUMMUDIPOONDI",
        "PONNERI",
        "TIRUTTANI",
        "THIRUVALLUR",
        "POONAMALLEE",
        "AVADI",
        "MADURAVOYAL",
        "AMBATTUR",
        "MADAVARAM",
        "THIRUVOTTIYUR",
        "DR.RADHAKRISHNAN NAGAR (GEN)",
        "PERAMBUR",
        "KOLATHUR",
        "VILLIVAKKAM",
        "THIRU-VI-KA-NAGAR",
        "EGMORE",
        "ROYAPURAM",
        "HARBOUR",
        "CHEPAUK-THIRUVALLIKENI",
        "THOUSAND LIGHTS",
        "ANNA NAGAR",
        "VIRUGAMPAKKAM",
        "SAIDAPET",
        "THIYAGARAYA NAGAR",
        "MYLAPORE",
        "VELACHERY",
        "SHOLINGANALLIUR",
        "ALANDUR",
        "SRIPERUMBUDUR",
        "PALLAVARAM",
        "TAMBARAM",
        "CHENGALPATTU",
        "THIRUPORUR",
        "CHEYYUR",
        "MADURANTAKAM",
        "UTHIRAMERUR",
        "KANCHEEPURAM",
        "ARAKKONAM",
        "SHOLINGUR",
        "KATPADI",
        "RANIPET",
        "ARCOT",
        "VELLORE",
        "ANAIKATTU",
        "KILVAITHINANKUPPAM",
        "GUDIYATTAM",
        "VANIYAMBADI",
        "AMBUR",
        "JOLARPET",
        "TIRUPATTUR",
        "UTHANGARAI",
        "BARGUR",
        "KRISHNAGIRI",
        "VEPPANAHALLI",
        "HOSUR",
        "THALLI",
        "PALACODU",
        "PENNAGARAM",
        "DHARMAPURI",
        "PAPPIREDDIPATTI",
        "KARUR",
        "CHENGAM",
        "TIRUVANNAMALAI",
        "KILPENNATHUR",
        "KALASAPAKKAM",
        "POLUR",
        "ARANI",
        "CHEYYAR",
        "VANDAVASI",
        "GINGEE",
        "MAILAM",
        "TINDIVANAM",
        "VANUR",
        "VILLUPURAM",
        "VIKRAVANDI",
        "TIRUKKOYILUR",
        "ULUNDURPETTAI",
        "RISHIVANDIYAM",
        "SANKARAPURAM",
        "KALLAKURICHI",
        "GANGAVALLI",
        "ATTUR",
        "YERCAUD",
        "OMALUR",
        "METTUR",
        "EDAPPADI",
        "SANKARAGIRI",
        "SALEM (WEST)",
        "SALEM (NORTH)",
        "SALEM (SOUTH)",
        "VEERAPANDI",
        "RASIPURAM",
        "SENTHAMANGALAM",
        "NAMAKKAL",
        "PARAMATHI-VELUR",
        "TIRUCHENGODU",
        "KUMARAPALAYAM",
        "ERODE (EAST)",
        "ERODE (WEST)",
        "MODAKKURUICHI",
        "DHARAPURAM",
        "KANKEYAM",
        "PERUNDURAI",
        "BHAVANI",
        "ANTHIYUR",
        "GOBICHETTIPALAYAM",
        "BHAVANISAGAR",
        "UDHAGAMANDALAM",
        "GUDALUR",
        "COONOOR",
        "METTUPALAYAM",
        "AVANASHI",
        "TIRUPPUR (NORTH)",
        "TIRUPPUR (SOUTH)",
        "PALLADAM",
        "SULUR",
        "KAVUNDAMPALAYAM",
        "COIMBATORE (NORTH)",
        "THONDAMUTHUR",
        "COIMBATORE (SOUTH)",
        "SINGANALLUR",
        "KINATHUKADAVU",
        "POLLACHI",
        "VALPARAI",
        "UDUMALPET",
        "MADATHUKULAM",
        "PALANI",
        "ODDANCHATRAM",
        "ATHOOR",
        "NILAKOTTAI",
        "NATHAM",
        "DINDIGUL",
        "VEDASANTHUR",
        "ARAVAKURICHI",
        "KARUR",
        "KRISHNARAYAPURAM",
        "KULITHALAI",
        "MANAPPARAI",
        "SRIRANGAM",
        "TIRUCHIRAPALLI (WEST)",
        "TIRUCHIRAPALLI (EAST)",
        "THIRUVERUMBUR",
        "LALGUDI",
        "MANACHANALLUR",
        "MUSIRI",
        "THURAIYUR",
        "PERAMBALUR",
        "KUNNAM",
        "ARIYALUR",
        "JAYANKONDAM",
        'TITTAKUDI',
        "VRIDDHACHALAM",
        "NEYVELI",
        "PANRUTI",
        "CUDDALORE",
        "KURINJIPADI",
        "BHUVANAGIRI",
        "CHIDAMBARAM",
        "KATTUMANNARKOIL",
        "SIRKAZHI",
        "MAYILADUTHURAI",
        "POOMPHUHAR",
        "NAGAPATTINAM",
        "KILVELUR",
        "VEDARANYAM",
        "THIRUTHURAIPOONDI",
        "MANNARGUDI",
        "THIRUVARUR",
        "NANNILAM",
        "THIRUVIDAIMARUDHUR",
        "KUMBAKONAM",
        "PAPANASAM",
        "THIRUVAIYARU",
        "THANJAVUR",
        "ORATHANADU",
        "PATTUKKOTTAI",
        "PERAVURANI",
        "GANDHARVAKOTTAI",
        "VIRALIMALAI",
        "PUDUKKOTTAI",
        "THIRUMAYAM",
        "ALANGUDI",
        "ARANTHANGI",
        "KARAIKUDI",
        "TIRUPATTUR",
        "SIVAGANGAI",
        "MANAMADURAI",
        "MELUR",
        "MADURAI (EAST)",
        "SHOLAVANDAN",
        "MADURAI (NORTH)",
        "MADURAI (SOUTH)",
        "MADURAI (CENTRAL)",
        "MADURAI (WEST)",
        "THIRUPARANKUNDRAM",
        "THIRUMANGALAM",
        "USILAMPATTI",
        "ANDIPATTI",
        "PERIYAKULAM",
        "BODINAYAKANUR",
        "CUMBAM",
        "RAJAPALAYAM",
        "SRIVILLIPUTHUR",
        "SATTUR",
        "SIVAKASI",
        "VIRUDHUNAGAR",
        "ARUPPUKKOTTAI",
        "TIRUCHULI",
        "PARAMAKUDI",
        "TIRUVADANAI",
        "RAMANATHAPURAM",
        "MUDHUKULATHUR",
        "VILATHIKULAM",
        "THOOTHUKKUDI",
        "TIRUCHENDUR",
        "SRIVAIKUNDAM",
        "OTTAPIDARAM",
        "KOVILPATTI",
        "SANKARANKOVIL",
        "VASUDEVANALLUR",
        "KADAYANALLUR",
        "TENKASI",
        "ALANGULAM",
        "TIRUNELVELI",
        "AMBASAMUDHRAM",
        "PALAYAMKOTTAI",
        "NANGUNERI",
        "RADHAPURAM",
        "KANNIYAKUMARI",
        "NAGERCOIL",
        "COLACHAL",
        "PADMANABHAPURAM",
        "VILAVANCODE",
        "KILLIYUR"
    ]

    const allPositions = [
        "Influencer",
        "Incharge Level 1",
        "Incharge Level 2",
        "Polling Booth Member"
    ];

    const handleConstituencyFilter = (text) => {
        const filtered = allConstituencies.filter((item) => item.toLowerCase().startsWith(text.toLowerCase()));
        setFilteredConstituencies(filtered);
    };

    const handlePositionFilter = (text) => {
        const filtered = allPositions.filter((item) => item.toLowerCase().startsWith(text.toLowerCase()));
        setFilteredPositions(filtered);
    };

    const handleSignUp = async () => {
        try {
            // Check if password and confirm password match
            if (password !== confirmPassword) {
                Alert.alert('Passwords do not match');
                return;
            }

            // Make a POST request to the backend for signing up
            const response = await baseurl.post('/register', {
                name: name,
                phonenumber: phoneNumber,
                password: password,
                partyname: partyName,
                constituency: constituency,
                position: position
            });

            Alert.alert('Success', response.data.message);
            // Navigate to login screen or any other appropriate screen after successful sign-up
        } catch (error) {
            Alert.alert('Error', error.response.data.error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/Loginback.jpg')} // Your background image
                style={styles.backgroundImage}
            >
                <View style={[styles.formContainer, { marginTop: 150 }]}>
                    <TextInput
                        style={styles.input}
                        placeholder="UserName"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Party Name"
                        value={partyName}
                        onChangeText={setPartyName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, styles.passwordInput]}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                    {/* <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry={!showPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                   */}
                    <TextInput
                        style={styles.input}
                        placeholder="Constituency"
                        value={constituency}
                        onChangeText={handleConstituencyFilter}
                        onFocus={() => setIsConstituencyPickerVisible(true)} // Add this onFocus event
                        onBlur={() => setIsConstituencyPickerVisible(false)} // Add this onBlur event to close the picker when the input is blurred
                    />
                    {isConstituencyPickerVisible && (
                        <Picker
                            selectedValue={constituency}
                            style={styles.input}
                            onValueChange={(itemValue) => setConstituency(itemValue)}
                        >
                            {filteredConstituencies.map((item, index) => (
                                <Picker.Item key={index} label={item} value={item} />
                            ))}
                        </Picker>
                    )}
                     {/* <TextInput
                        style={styles.input}
                        placeholder="Constituency"
                        value={constituency}
                        onChangeText={handleConstituencyFilter}
                    /> */}
                    <Picker
                        selectedValue={position}
                        style={styles.input}
                        onValueChange={(itemValue) => setPosition(itemValue)}
                    >
                        <Picker.Item label="Select Position" value="" />
                        <Picker.Item label="Influencer" value="Influencer" />
                        <Picker.Item label="Incharge Level 1" value="Incharge Level 1" />
                        <Picker.Item label="Incharge Level 2" value="Incharge Level 2" />
                        <Picker.Item label="Polling Booth Member" value="Polling Booth Member" />
                    </Picker>
                    <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: '#EFFAFF', // Blue color with opacity
        borderRadius: 70,
        width: '100%',
        padding: 40,
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#43B3FE',
        borderRadius: 25,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    registerButton: {
        backgroundColor: '#43B3FE',
        padding: 10,
        borderRadius: 25,
        marginTop: 10,
        alignItems: 'center',
        width: '50%',
    },
    registerButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default SignUpScreen;
