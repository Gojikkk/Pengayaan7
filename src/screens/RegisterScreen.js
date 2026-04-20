import { useFormik } from 'formik';
import { useState } from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { registerSchema } from '../utils/validationSchema';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
  View,
  Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen ({ navigation, onLoginSuccess }) {
    
    //formik register
    const formik = useFormik ({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: registerSchema,
        onSubmit: async  (values, { setSubmitting, setFieldError }) => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500));

                await AsyncStorage.setItem(
                    'userProfile',
                    JSON.stringify({
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        phone: values.phone,
                    })
                )
                Alert.alert('Berhasil', 'Registrasi berhasil', [
                    { text: 'OK', onPress: () => navigation.navigate('Login') }
                ]);
                

            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1}}
        >

            <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps='handled'
            >

            <Text style={styles.title}> Register </Text>

            <RegisterForm
            label="Name"
            placeholder='Masukkan Nama'
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            error={formik.errors.name}
            touched={formik.touched.name}
            />

            <RegisterForm
            label='Email'
            placeholder='Masukkan Email'
            keyboardType='email-address'
            autoCapitalize='none'
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            error={formik.errors.email}
            touched={formik.touched.email}
            />

            <RegisterForm
            label='Phone'
            placeholder="Masukkan Nomor HP"
            keyboardType='phone-pad'
            value={formik.values.phone}
            onChangeText={formik.handleChange('phone')}
            onBlur={formik.handleBlur('phone')}
            error={formik.errors.phone}
            touched={formik.touched.phone}
            />

            <RegisterForm
            label='Password'
            placeholder='Masukkan Password'
            returnKeyType='done'
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            error={formik.errors.password}
            touched={formik.touched.password}
            />

            <RegisterForm
            label='Confirm Password'
            placeholder='Konfirmasi Password'
            secureTextEntry
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
            />

            <View style={styles.login}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={styles.LoginLink}>Login</Text>
            </Pressable>
            </View>

            <TouchableOpacity
            style={[styles.btn, formik.isSubmitting && { opacity: 0.7 }]}
            onPress={formik.handleSubmit}
            disabled={formik.isSubmitting}
            >
                <Text style={styles.btnText}>
                    {formik.isSubmitting ? 'Loading...' : 'Register'}
                </Text>
            </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,  
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    btn: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    login: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: '#c3c5c7',
        fontSize: 14,
    },
    LoginLink: {
        color: '#4A5CC4',
        fontSize: 14,
        fontWeight: 'bold',
    }
})