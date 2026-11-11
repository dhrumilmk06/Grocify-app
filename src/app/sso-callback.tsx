import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

/**
 * Receives grocify://sso-callback after a social provider finishes. Keeping this
 * route in the app makes the native deep-link destination explicit while Clerk
 * finishes activating the new session.
 */
export default function SsoCallbackScreen() {
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" />
    </View>
  );
}
