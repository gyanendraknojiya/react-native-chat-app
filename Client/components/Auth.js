import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/Entypo";
import {useDispatch, useSelector} from "react-redux"

import {setUser} from "../Redux/Reducer"

const Auth = ({  }) => {
  const [showLogin, setShowLogin] = useState(true);
  const dispatch = useDispatch()
  const user = useSelector((state) => state);

  const [showPassword, setShowPassword] = useState(false);
  const [formDetails, setFormDetails] = useState({});
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFormChanges = (type, text) => {
    formDetails[type]= text
    setFormDetails(formDetails)
  };

  const handleSubmit = () => {
    const {email, password} = formDetails
    if (!email) {
      alert("Please enter your password!");
      return;
    }

    if (!password) {
      alert("Please enter your password!");
      return;
    }

    dispatch(setUser({ email, password }))
    console.log(user);
  };

  return (
    <View style={{ ...styles.box, paddingTop: showLogin ? 120 : 50 }}>
      <ScrollView>
        <View style={{ padding: 20, paddingBottom: 0 }}>
          {showLogin ? (
            <View>
              <Text style={styles.heading}>Hello.</Text>

              <Text style={styles.heading}>Welcome back</Text>
            </View>
          ) : (
            <View>
              <Text style={{ ...styles.heading }}>Create an account</Text>
            </View>
          )}
        </View>
        <View style={{ padding: 25 }}>
          {!showLogin && (
            <View>
              <Text style={styles.label}>Name</Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                {/* first name field */}

                <TextInput
                  style={{ ...styles.input, marginRight: "2%", width: "48%" }}
                  placeholder="First name..."
                  placeholderTextColor="#525151"
                  autoCompleteType="name"
                  textContentType="name"
                  onChangeText={(text) => handleFormChanges("fName", text)}
                  value={formDetails.email}
                />
                {/* Last name field */}

                <TextInput
                  style={{ ...styles.input, marginLeft: "2%", width: "48%" }}
                  placeholder="Last name..."
                  placeholderTextColor="#525151"
                  autoCompleteType="name"
                  textContentType="name"
                  onChangeText={(text) => handleFormChanges("fName", text)}
                  value={formDetails.email}
                />
              </View>
            </View>
          )}

          {/* Email address  */}

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address..."
            placeholderTextColor="#525151"
            autoCompleteType="email"
            textContentType="emailAddress"
            onChangeText={(text) => handleFormChanges("email", text)}
            value={formDetails.email}
          />
          <View>
            {/* ---------------- Password -------------------------- */}

            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password..."
              placeholderTextColor="#525151"
              textContentType="password"
              secureTextEntry={showPassword ? false : true}
              onChangeText={(text) => handleFormChanges("password", text)}
              value={formDetails.password}
            />

            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 2,
                color: "#4302de",
                right: 2,
                padding: 8,
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text>
                {showPassword ? (
                  <Icon name="eye" size={20} color="#fff" />
                ) : (
                  <Icon name="eye-with-line" size={20} color="#fff" />
                )}
              </Text>
            </TouchableOpacity>
          </View>

          {/* -------------------- confirm password ---------------------- */}

          {!showLogin && (
            <View>
              <Text style={styles.label}>CONFIRM PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password..."
                placeholderTextColor="#525151"
                textContentType="password"
                secureTextEntry={showConfirmPassword ? false : true}
                onChangeText={(text) =>
                  handleFormChanges("confirmPassword", text)
                }
                value={formDetails.password}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 2,
                  color: "#4302de",
                  right: 2,
                  padding: 8,
                }}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Text>
                  {showConfirmPassword ? (
                    <Icon name="eye" size={20} color="#fff" />
                  ) : (
                    <Icon name="eye-with-line" size={20} color="#fff" />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: "#2196F3",
              alignItems: "center",
              padding: 12,
              marginTop: 80,
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: 10,
              shadowOpacity: 1,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontFamily: "Overpass-Black",
                letterSpacing: 5,
              }}
            >
              {!showLogin ? "SIGN UP" : "LOGIN"}{" "}
              <Icon name="login" size={20} color="#fff" />
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <TouchableOpacity onPress={() => setShowLogin(!showLogin)}>
              <Text style={{ color: "#c8c2bc", fontSize: 20 }}>
                {showLogin ? "CREATE ACCOUNT" : "LOG IN"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    color: "#fff",
    backgroundColor: "#373d46",
    height: "100%",
    padding: 15,
  },
  heading: {
    fontSize: 50,
    color: "#fff",
    fontFamily: "Overpass-Regular",
  },
  input: {
    borderBottomWidth: 1,
    paddingTop: 10,
    color: "#f3f3f3",
    borderBottomColor: "#464f41",

    fontFamily: "Overpass-Light",
    fontSize: 20,
  },
  label: {
    fontSize: 18,
    color: "#f3f3f3",
    letterSpacing: 2,
    fontFamily: "Overpass-Light",
    marginTop: 50,
  },
});

export default Auth;
