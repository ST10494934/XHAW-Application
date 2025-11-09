import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Navbar from '../components/Navbar';
import { RootStackParamList } from '../AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AboutScreen() {
  const navigation = useNavigation<NavigationProp>();
  const currentYear = new Date().getFullYear();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Navbar active="About" />

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>About Us</Text>
          <Text style={styles.heroSubtitle}>
            Founded in 2022 by <Text style={styles.heroStrong}>Precious Radebe</Text>, Empowering the
            Nation is dedicated to uplifting domestic workers and gardeners who were denied formal
            education - just like her parents and relatives.
          </Text>
        </View>
      </View>

      {/* Founder Story Section */}
      <View style={styles.founderSection}>
        <View style={styles.founderContainer}>
          <Image
            source={require('../assets/PreciousRadebe.png')}
            style={styles.founderImage}
            resizeMode="contain"
          />
          <View style={styles.visionContent}>
            <Text style={styles.visionTitle}>Precious's Vision</Text>
            <Text style={styles.visionText}>
              Empowering individuals to become more marketable, earn higher wages, and even start
              their own businesses. It’s about transforming everyday challenges into extraordinary
              opportunities!
            </Text>
          </View>
        </View>
      </View>

      {/* Programs Overview Section */}
      <View style={styles.programsSection}>
        <Text style={styles.sectionTitle}>Programs Overview</Text>
        <Text style={styles.sectionText}>
          Our training center in Johannesburg offers 6-month learnerships and 6-week short courses,
          equipping hundreds with essential life and professional skills.
        </Text>
        <View style={styles.testimonial}>
          <Text style={styles.testimonialQuote}>
            “Starting my own business wasn’t just a dream anymore - Empowering the Nation made it
            possible.”
          </Text>
          <Text style={styles.testimonialAuthor}>- Satisfied Graduate</Text>
        </View>
      </View>

      {/* Values Section */}
      <View style={styles.valuesSection}>
        <Text style={styles.sectionTitle}>Our Values</Text>
        <View style={styles.valuesList}>
          <Text style={styles.valueItem}>🌱 Empowerment: Lifting communities one skill at a time.</Text>
          <Text style={styles.valueItem}>🤝 Community Support: Together, we achieve more.</Text>
          <Text style={styles.valueItem}>🚀 Professional Growth: Turning dreams into reality.</Text>
        </View>
      </View>

      {/* Call-to-Action Section */}
      <View style={styles.ctaSection}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Courses')}
          accessibilityLabel="View Our Courses"
        >
          <Text style={styles.ctaButtonText}>View Our Courses</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2022–{currentYear} Empowering the Nation. All rights reserved. | Igniting futures, one
          skill at a time.
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
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroStrong: {
    fontWeight: '700',
    color: '#DAA520', // Gold
  },

  founderSection: {
    padding: 16,
    backgroundColor: '#F5F5DC', // Beige
  },

  founderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  founderImage: {
    width: '100%',
    maxWidth: 300,
    height: 300,
    borderRadius: 15,
    backgroundColor: '#F5F5DC',
    marginBottom: 16,
  },

  visionContent: {
    width: '100%',
    marginTop: 12,
  },

  visionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#DAA520', // Gold
    textAlign: 'center',
    marginBottom: 8,
  },
  visionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },

  programsSection: {
    padding: 16,
    backgroundColor: '#F5F5DC',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#DAA520',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  testimonial: {
    borderLeftWidth: 4,
    borderLeftColor: '#DAA520',
    paddingLeft: 12,
    marginTop: 16,
  },
  testimonialQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#006400',
    marginBottom: 8,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },

  valuesSection: {
    padding: 16,
    backgroundColor: '#F5F5DC',
  },
  valuesList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  valueItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },

  ctaSection: {
    padding: 16,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
  },
  ctaButton: {
    backgroundColor: '#006400',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DAA520',
    textAlign: 'center',
  },

  footer: {
    padding: 16,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});
