import { Redirect } from 'expo-router';

import { useAuth } from '@/auth/auth';

export default function Index() {
  const { user } = useAuth();
  return <Redirect href={user ? './home' : './login'} />;
}