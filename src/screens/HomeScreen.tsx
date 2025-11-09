// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Navbar from '../components/Navbar';
import { RootStackParamList } from '../AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const currentYear = new Date().getFullYear();
  const { width } = Dimensions.get('window');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Navbar active="Home" />

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Welcome to Empowering the Nation</Text>
          <Text style={styles.heroSubtitle}>Equipping Everyday Heroes Since 2022</Text>
          <Text style={styles.heroText}>
            We provide practical skills training that upskills everyday heroes. Based in Johannesburg,
            our courses empower individuals to contribute meaningfully to their communities.
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Courses')}
            accessibilityLabel="Explore Courses"
          >
            <Text style={styles.ctaButtonText}>Explore Courses</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards Section */}
      <View style={styles.cardsSection}>
        <View style={styles.cardsContainer}>
          <View style={[styles.card, { width: width > 900 ? '30%' : width > 600 ? '45%' : '100%' }]}>
            <Image
              source={require('../assets/Wrench.png')}
              style={styles.cardIcon}
              resizeMode="contain"
            />
            <Text style={styles.cardTitle}>Our Mission</Text>
            <Text style={styles.cardText}>
              Empowering communities through accessible skills training that transforms lives!
            </Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => navigation.navigate('About')}
              accessibilityLabel="Learn More About Our Mission"
            >
              <Text style={styles.cardButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, { width: width > 900 ? '30%' : width > 600 ? '45%' : '100%' }]}>
            <Image
              source={require('../assets/Scissors.png')}
              style={styles.cardIcon}
              resizeMode="contain"
            />
            <Text style={styles.cardTitle}>Courses</Text>
            <Text style={styles.cardText}>
              Discover 6-month learnerships and 6-week short programs tailored for your success!
            </Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => navigation.navigate('Courses')}
              accessibilityLabel="Learn More About Courses"
            >
              <Text style={styles.cardButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, { width: width > 900 ? '30%' : width > 600 ? '45%' : '100%' }]}>
            <Image
              source={require('../assets/Leaf.png')}
              style={styles.cardIcon}
              resizeMode="contain"
            />
            <Text style={styles.cardTitle}>Get to know us!</Text>
            <Text style={styles.cardText}>
              Contact us or visit our Johannesburg venues to start your empowerment journey.
            </Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => navigation.navigate('Contact')}
              accessibilityLabel="Learn More About Contact"
            >
              <Text style={styles.cardButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          &copy; 2022–{currentYear} Empowering the Nation. All rights reserved. | Igniting futures, one
          skill at a time!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Beige
  },
  heroSection: {
    padding: 32,
    backgroundColor: '#FFF8E1', // Light beige for hero
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#006400', // Dark green
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  ctaButton: {
    backgroundColor: '#006400', // Dark green
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DAA520', // Gold
    textAlign: 'center',
  },
  cardsSection: {
    padding: 16,
    backgroundColor: '#F5F5DC', // Beige
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardIcon: {
    width: 50,
    height: 50,
    marginBottom: 12,
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DAA520', // Gold
    textAlign: 'center',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  cardButton: {
    backgroundColor: '#006400', // Dark green
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
  },
  cardButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DAA520', // Gold
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFF8E1', // Light beige
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});
