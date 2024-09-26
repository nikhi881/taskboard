/* src/auth/signUp.js */
import * as React from 'react';
import { auth, firestore } from "../firebasaeConfig";  // Added `firestore` for Firestore
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AppProvider } from '@toolpad/core';
import { createTheme } from '@mui/material/styles';
import { getDesignTokens } from '../theme';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Link,
    Box,
    FormHelperText
} from '@mui/material';
import Cookies from 'js-cookie';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function SignUpLink() {
    return (
        <Link href="/login" variant="body2">
            Sign In
        </Link>
    );
}

async function submitUserInfo(userInfo) {
    try {
        const userRef = doc(firestore, "Users", userInfo.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            await setDoc(userRef, userInfo);
            console.log('User info submitted to Firestore');
        } else {
            console.log('User already exists in Firestore');
        }
    } catch (error) {
        console.error('Error submitting user info to Firestore:', error);
    }
}

export default function ThemeSignInPage() {
    const navigate = useNavigate();
    const [calculatedMode, setCalculateMode] = React.useState('dark');
    const [data, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const brandingDesignTokens = getDesignTokens(calculatedMode);
    const THEME = createTheme({
        ...brandingDesignTokens,
        palette: {
            ...brandingDesignTokens.palette,
            mode: calculatedMode,
        },
    });

    const updateFormData = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });

        setErrors({
            ...errors,
            [event.target.name]: '',
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!data.name || data.name.trim() === '') {
            formErrors.name = "Full name is required";
        }
        if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
            formErrors.email = "Valid email is required";
        }
        if (!data.password || data.password.length < 6) {
            formErrors.password = "Password must be at least 6 characters";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // If validation fails, do not proceed
        }

        const auth = getAuth();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

            if (userCredential && auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: data.name
                });

                const user = auth.currentUser;
                const userInfo = {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber,
                    photo: user.photoURL
                };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                localStorage.setItem('token', JSON.stringify(user.stsTokenManager));
                Cookies.set('accessToken', user.stsTokenManager.accessToken, { expires: user.stsTokenManager.expirationTime, secure: true });
                await submitUserInfo(userInfo);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            setErrors({ form: error.message });
        }
    };

    return (
        <AppProvider theme={THEME}>
            <Container
                maxWidth="xs"
                style={{
                    padding: '2rem',
                    marginTop: '5rem'
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Welcome user, please register to continue
                </Typography>
                <form onSubmit={submitForm}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: 1,
                            m: 1,
                            gap: 2
                        }}
                    >
                        <TextField
                            id="input-with-icon-textfield"
                            label="Full Name"
                            name="name"
                            type="text"
                            size="small"
                            required
                            fullWidth
                            variant="outlined"
                            onChange={updateFormData}
                            value={data.name || ''}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            id="input-with-icon-textfield"
                            label="Email"
                            name="email"
                            type="email"
                            size="small"
                            required
                            fullWidth
                            variant="outlined"
                            onChange={updateFormData}
                            value={data.email || ''}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            id="input-with-icon-textfield"
                            label="Password"
                            name="password"
                            type="password"
                            size="small"
                            required
                            fullWidth
                            variant="outlined"
                            onChange={updateFormData}
                            value={data.password || ''}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <Button
                            type="submit"
                            variant="outlined"
                            color="info"
                            size="small"
                            disableElevation
                            fullWidth
                            sx={{ my: 2 }}
                        >
                            Sign Up
                        </Button>
                        {errors.form && (
                            <FormHelperText error>{errors.form}</FormHelperText>
                        )}
                    </Box>
                    <SignUpLink />
                </form>
            </Container>
        </AppProvider>
    );
}
