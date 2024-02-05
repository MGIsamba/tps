import React from 'react';
import './firebase'

import RootNavigation from './src/navigations/RootNavigation';
import { AuthProvider } from './src/utils/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
