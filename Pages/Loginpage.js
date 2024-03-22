import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming FontAwesome is installed for eye icons
import { useNavigation } from '@react-navigation/native';
import baseurl from '../Api/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleSignIn = async () => {
        console.log('Login Button Pressed');
        try {
            // Make a POST request to your Flask backend for authentication
            const response = await baseurl.post('/login', {
                phonenumber: phoneNumber,
                password: password,
            });
            console.log('Response:', response);
            if (response.status === 200) {
                // Successful login
                const data = response.data;
                console.log('Login successful:', data);
                // Save the token to AsyncStorage
                await AsyncStorage.setItem('access_token', data.access_token);
                // Navigate to the main page
                navigation.navigate('HomePage');
            } else {
                // Handle unsuccessful login
                console.log('Login failed');
                // You can display an error message or perform other actions here
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Handle the error, e.g., display an error message to the user
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigateToSignUp = () => {
        navigation.navigate('SignUp');
    };
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/Loginback.jpg')} // Your background image
                style={styles.backgroundImage}
            />
            <View style={styles.contentContainer}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        {/* <Image
                        source={require('../assets/logo.png')} // Your logo image
                        style={styles.logo}
                    /> */}
                    </View>
                    <Text style={styles.loginText}>Login to your account</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mobile Number"
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
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                        <Text style={styles.signInButtonText}>Sign In</Text>
                    </TouchableOpacity>
                    <View style={styles.signUpLink}>
                        <Text style={styles.dontHaveAccountText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={navigateToSignUp}>
                            <Text style={styles.boldBlueText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject, // Position the background image absolutely
        resizeMode: 'cover',
    },
    contentContainer: {
        ...StyleSheet.absoluteFillObject, // Position the content container absolutely
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#43B3FE',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    loginText: {
        marginTop: 5,
        color: '#43B3FE',
        fontSize: 18,
        fontWeight: 'bold',
    },
    formContainer: {
        backgroundColor: 'transparent',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginTop: -30,
    },
    input: {
        backgroundColor: "white",
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#43B3FE',
        borderRadius: 25,
        paddingHorizontal: 20,
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
        right: 15,
        top: 15,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        color: '#43B3FE',
    },
    signInButton: {
        backgroundColor: '#43B3FE',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    signInButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    signUpLink: {
        marginTop: 20,
        flexDirection: 'row',
    },
    dontHaveAccountText: {
        color: '#666',
    },
    signUpLinkText: {
        color: '#666',
    },
    boldBlueText: {
        fontWeight: 'bold',
        color: '#43B3FE',
    },
});

export default LoginScreen;
