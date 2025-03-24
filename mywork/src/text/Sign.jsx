import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';

// 建立 Material UI 主題
const theme = createTheme();

// 登入提供者列表
const providers = [{ id: 'credentials', name: 'Email and password' }];

// 模擬登入函數
const signIn = async (provider, formData) => {
  console.log('Provider:', provider);
  console.log('Form Data:', formData);

  return new Promise((resolve) => {
    setTimeout(() => {
      const account = formData?.get('account');
      const password = formData?.get('password');
      console.log(`Signing in with ${provider.name}:`, account, password);

      resolve({
        type: 'CredentialsSignin',
        error: 'Invalid credentials.', // 這裡可以改成實際的 API 回應
      });
    }, 300);
  });
};

export default function NotificationsSignInPageError() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider theme={theme}>
        <SignInPage
          signIn={signIn}
          providers={providers}
          slotProps={{
            emailField: { autoFocus: true }, 
            form: { noValidate: true },
          }}
        />
      </AppProvider>
    </ThemeProvider>
  );
}
