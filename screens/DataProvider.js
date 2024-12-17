import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Platform } from "react-native";

import DataContext from "./data-context";

function DataProvider(props) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await fetch(`https://backend.com`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
          body: JSON.stringify({
            id: currentUser.uid,
            phoneNumber: currentUser.phoneNumber,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            let userProfile = { ...data.user };
            if (userProfile.reminders === undefined) {
              userProfile.reminders = [];
            }
            if (userProfile.cards === undefined) {
              userProfile.cards = [];
            }
            userProfile.reminders = Object.values(userProfile.reminders);
            userProfile.cards = Object.values(userProfile.cards);
            setUserProfile(userProfile);
            setUser(currentUser);
            setIsAuthChecked(true);
            setLoading(false);
            navigation.navigate("Home");
          })
          .catch((error) => {});
      } else {
        setIsAuthChecked(true);
        setUser(null);
        setUserProfile(null);
        navigation.navigate("Login");
      }
    });

    return () => unsubscribe();
  }, []);


  const dataContext = {
    user: user,
    setUser: setUser,
    userProfile: userProfile,
    setUserProfile: setUserProfile,
    isAuthChecked: isAuthChecked,
    loading: loading,
    setLoading: setLoading,
  };

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
}

export default DataProvider;