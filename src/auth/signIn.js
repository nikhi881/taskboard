/* src/auth/signIn.js */
import * as React from 'react';
import { AppProvider, SignInPage } from '@toolpad/core';
import { createTheme } from '@mui/material/styles';
// import { useColorSchemeShim } from 'docs/src/modules/components/ThemeContext';
import { getDesignTokens } from '../theme';
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { auth, firestore } from "../firebasaeConfig";  // Added `firestore` for Firestore
import { signInWithGooglePopup, signInWithGithubPopup } from './firebase';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,FormHelperText 
} from '@mui/material';
import Cookies from 'js-cookie';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { doc, getDoc, setDoc } from "firebase/firestore";  // Import Firestore functions

const providers = [
  { id: 'github', name: 'GitHub' },
  { id: 'google', name: 'Google' },
  { id: 'credentials', name: 'Email and Password' },
];

function CustomEmailField({ error }) {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      error={!!error}
      helperText={error?.message}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField({ error }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined" error={!!error}>
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Sign In
    </Button>
  );
}

function SignUpLink() {
  return (
    <Link href="/signup" variant="body2">
      Sign up
    </Link>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Forgot password?
    </Link>
  );
}

async function submitUserInfo(userInfo) {
  try {
      const userRef = doc(firestore, "Users", userInfo.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) { // Save user info only if it doesn't exist
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
  const [error, setError] = React.useState(null); // State to handle errors
  const brandingDesignTokens = getDesignTokens(calculatedMode);
  const THEME = createTheme({
    ...brandingDesignTokens,
    palette: {
      ...brandingDesignTokens.palette,
      mode: calculatedMode
    },
  });

  const signIn = async (provider, formData) => {
    setError(null); // Reset error state

    if (provider === "credentials") {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then(async (result) => { // Made the callback asynchronous
          console.log(result);
          const user = result.user;
          const userInfo = {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              phone: user.phoneNumber,
              photo: user.photoURL
          }
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          localStorage.setItem('token', JSON.stringify(user.stsTokenManager))
          Cookies.set('accessToken', user.stsTokenManager.accessToken, { expires: user.stsTokenManager.expirationTime, secure: true });
          await submitUserInfo(userInfo); // Submit user info to Firestore
          navigate(formData.redirectTo);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          setError({ message: "Incorrect email or password." }); // Set error state
        });
    } else if (provider === "google") {
      const response = await signInWithGooglePopup().then(async (result) => { // Made the callback asynchronous
        const user = result.user;
        const userInfo = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photo: user.photoURL
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        localStorage.setItem('token', JSON.stringify(user.stsTokenManager))
        Cookies.set('accessToken', user.stsTokenManager.accessToken, { expires: user.stsTokenManager.expirationTime, secure: true });
        await submitUserInfo(userInfo); // Submit user info to Firestore
        navigate(formData.redirectTo);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        setError({ message: "Error signing in with Google." }); // Set error state
      });
    } else if (provider === "github") {
      const response = await signInWithGithubPopup().then(async (result) => { // Made the callback asynchronous
        const user = result.user;
        const userInfo = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photo: user.photoURL
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        localStorage.setItem('token', JSON.stringify(user.stsTokenManager))
        Cookies.set('accessToken', user.stsTokenManager.accessToken, { expires: user.stsTokenManager.expirationTime, secure: true });
        await submitUserInfo(userInfo); // Submit user info to Firestore
        navigate(formData.redirectTo);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        setError({ message: "Error signing in with GitHub." }); // Set error state
      });
    }
  };

  return (
      // preview-start
      <AppProvider theme={THEME}>
          <SignInPage providers={providers}
              signIn={async (
                  provider,
                  formData,
                  callbackUrl,
              ) => {
                  'use server';
                  try {
                      return await signIn(provider.id, {
                          ...(formData && {
                              email: formData.get('email'),
                              password: formData.get('password'),
                          }),
                          redirectTo: callbackUrl ?? '/',
                      });
                  } catch (error) {
                      if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
                          throw error;
                      }
                      if (error) {
                          return {
                              error:
                                  error.type === 'CredentialsSignin'
                                      ? 'Invalid credentials.'
                                      : 'An error with Auth.js occurred.',
                              type: error.type,
                          };
                      }
                      return {
                          error: 'Something went wrong.',
                          type: 'UnknownError',
                      };
                  }
              }}
              slots={{
                  emailField: () => <CustomEmailField error={error} />, // Pass error state
                  passwordField: () => <CustomPasswordField error={error} />, // Pass error state
                  submitButton: CustomButton,
                  signUpLink: SignUpLink,
                  forgotPasswordLink: ForgotPasswordLink,
              }}
          />
      </AppProvider>
      // preview-end
  );
}
