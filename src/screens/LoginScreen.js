import { useFormik } from 'formik';
import { LoginForm } from '../components/LoginForm';
import { loginSchema } from '../utils/validationSchema';
import { KeyboardAvoidingView } from 'react-native/types_generated/index';
import { ScrollView } from 'react-native/types_generated/index';
import { TouchableOpacity } from 'react-native';

export default function LoginScreen(){

    //formik login
    const formik = useFormik ({
        initialValues: {email: '', password: ''},
        validationSchema: loginSchema,
        onSubmit: async (values, { seSubmitting, setFieldError }) => {
            try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            if (values.email === 'ghozirobbani74@gmai.com'){
                Alert.alert('Berhasil', 'Login berhasil');  
            } else {
                setFieldError('email', 'Email atau password salah');
            }
            } finally {
                setSubmitting(false);
            }
        },
        });

        return (
            <KeyboardAvoidingView>
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1}}

            <ScrollView>
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps='handled'


            <Text style={styles.title}> Selamat Datang </Text>

            <LoginForm
            label="Email"
            placeholder='contoh@gmail.com'
            keyboardType='email-address'
            autoCapitalize='none'
            returnkeyType='next'
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
            returnkeyType='done'
            onSubmitEditing={formik.handleSubmit}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            error={formik.errors.password}
            touched={formik.touched.password}
            />

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