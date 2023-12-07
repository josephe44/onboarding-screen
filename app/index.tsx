import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Stack, router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  BounceInRight,
  BounceInLeft,
  SlideInLeft,
} from "react-native-reanimated";

const onboardingSteps = [
  {
    icon: "people-arrows",
    title: "Track every transaction",
    description:
      "Monitor your spending and contribution, ensuring every penny aligns with your family aspiration",
  },
  {
    icon: "user-shield",
    title: "Safeguard your family's future",
    description:
      "Protect your loved ones with comprehensive insurance coverage tailored to your unique needs.",
  },
  {
    icon: "lock-open",
    title: "Unleash financial freedom",
    description:
      "Gain control over your finances with personalized budgeting tools and expert guidance.",
  },
  {
    icon: "snowflake",
    title: "Achieve your financial goals",
    description:
      "Create a personalized roadmap to reach your financial aspirations, whether it's saving for a dream home or securing a comfortable retirement.",
  },
];

export default function Onboarding() {
  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  //   Function going forward
  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;

    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex((prev) => prev + 1);
    }
  };

  //   Function going Back
  const onBack = () => {
    const isFirstScreen = screenIndex === 0;

    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex((prev) => prev - 1);
    }
  };

  //   Function to end and call new screen
  const endOnboarding = () => {
    setScreenIndex(0);
    router.back();
  };

  //   Function for the hand gesture
  const swipeForward = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(onContinue);
  const swipeBack = Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack);
  const swipes = Gesture.Simultaneous(swipeBack, swipeForward);

  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((data, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              { backgroundColor: screenIndex === index ? "#CEF202" : "grey" },
            ]}
          />
        ))}
      </View>

      <GestureDetector gesture={swipes}>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.pageContent}
          key={screenIndex}
        >
          <Animated.View
            entering={BounceInRight}
            exiting={BounceInRight}
            key={screenIndex}
          >
            <FontAwesome5
              style={styles.image}
              name={data.icon}
              size={100}
              color="#CEF202"
            />
          </Animated.View>
          <View style={styles.footer}>
            <Animated.Text
              entering={SlideInLeft.duration(600)}
              style={styles.title}
            >
              {data.title}
            </Animated.Text>
            <Text style={styles.description}>{data.description}</Text>

            <View style={styles.buttonsRow}>
              <TouchableOpacity onPress={endOnboarding}>
                <Text style={styles.buttonText}>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={onContinue}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    // alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#15141A",
  },

  pageContent: {
    padding: 20,
    flex: 1,
  },

  stepIndicatorContainer: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 15,
  },

  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: "grey",
    borderRadius: 10,
  },

  image: {
    alignSelf: "center",
    margin: 20,
    marginTop: 70,
  },

  footer: {
    marginTop: "auto",
  },

  title: {
    color: "#FDFDFD",
    fontSize: 50,
    fontFamily: "interBlack",
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    color: "gray",
    fontSize: 20,
    fontFamily: "interLight",
    lineHeight: 28,
  },

  buttonsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#302E38",
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#FDFDFD",
    fontFamily: "interSemi",
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25,
  },
});
