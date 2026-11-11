import { useSSO } from "@clerk/expo";
import Constants, { AppOwnership } from "expo-constants";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_github" | "oauth_apple"
  ) => {
    if (loadingStrategy) return; // guard against concurrent flows

    // Expo Go cannot register the app's grocify:// scheme. Opening a browser
    // OAuth session there can never return to this application.
    if (Constants.appOwnership === AppOwnership.Expo) {
      Alert.alert(
        "Development build required",
        "Google sign-in must be tested in the Grocify Android development build, not Expo Go."
      );
      return;
    }

    setLoadingStrategy(strategy);

    try {
      // Open the selected provider directly. Using the app's registered scheme
      // avoids sending users through Clerk's general-purpose hosted sign-in page.
      // This must remain identical to the mobile SSO redirect URL allowlisted
      // in the Clerk Dashboard.
      const redirectUrl = "grocify://sso-callback";

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl,
      });

      if (!createdSessionId || !setActive) {
        Alert.alert(
          "Sign-in incomplete",
          "Sign-in did not complete. Please try again."
        );
        return;
      }

      await setActive({ session: createdSessionId });
      router.replace("/");
    } catch (error) {
      console.log("[SocialAuth] Error in social auth:", error);
      Alert.alert("Error", "Failed to sign in. Please try again.");
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
};

export default useSocialAuth;
