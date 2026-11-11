import { useAuth, useUser } from '@clerk/expo';
import { Redirect } from 'expo-router';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';


export default function Index() {
  const { isSignedIn, isLoaded, signOut } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Grocify!</Text>
      <Text style={styles.subtitle}>
        Signed in as:{' '}
        <Text style={styles.email}>
          {user?.primaryEmailAddress?.emailAddress ?? 'User'}
        </Text>
      </Text>
      <View style={styles.buttonWrapper}>
        <Button title="Sign Out" onPress={() => signOut()} color="#ef4444" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  email: {
    fontWeight: '600',
    color: '#111',
  },
  buttonWrapper: {
    width: '100%',
    maxWidth: 200,
  },
});
