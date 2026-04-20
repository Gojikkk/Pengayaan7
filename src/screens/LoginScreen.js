import { useFormik } from 'formik';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text,
  View,
  Alert,
Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginForm } from '../components/LoginForm';
import { loginSchema } from '../utils/validationSchema';

export default function LoginScreen({navigation, onLoginSuccess}) {

    //formik login
    const formik = useFormik ({
        initialValues: {email: '', password: ''},
        validationSchema: loginSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            const data = await AsyncStorage.getItem('userProfile');

            if (!data) {
                Alert.alert('Error', 'Tidak ada data pengguna, silahkan register terlebih dahulu');
                setSubmitting(false);
                return;
            }
            
            const user = JSON.parse(data);

            await new Promise((resolve) => setTimeout(resolve, 1500));

            if ( values.email === user.email && values.password === user.password) {
                Alert.alert('Berhasil', 'Login berhasil');
                onLoginSuccess();
            } else {
                Alert.alert('Error', 'Email atau password salah');
            } 
            setSubmitting(false);
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


            <Text style={styles.title}> Selamat Datang </Text>

            <LoginForm
            label="Email"
            placeholder='contoh@gmail.com'
            keyboardType='email-address'
            autoCapitalize='none'
            returnKeyType='next'
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            error={formik.errors.email}
            touched={formik.touched.email}
            />

            <LoginForm
            label="Password"
            placeholder='Masukkan Password'
            secureTextEntry
            returnKeyType='done'
            onSubmitEditing={formik.handleSubmit}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            error={formik.errors.password}
            touched={formik.touched.password}
            />

            <View style={styles.register}>
                <Text style={styles.registerText}>Don't have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Create an account</Text>
            </Pressable>
            </View>

            <TouchableOpacity
            style={[styles.btn, formik.isSubmitting && { opacity: 0.7 }]}
            onPress={formik.handleSubmit}
            disabled={formik.isSubmitting}
            >
                <Text style={styles.btnText}>
                    {formik.isSubmitting ? 'Loading...' : 'Login'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
        );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center'
    },
    btn: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
     register: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        color: '#ccced0',
        fontSize: 14,
    },
    registerLink: {
        color: '#4A5CC4',
        fontSize: 14,
        fontWeight: 'bold',
    }
})