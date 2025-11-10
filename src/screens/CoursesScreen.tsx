// src/screens/CoursesScreen.tsx
import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Navbar from '../components/Navbar';
import { RootStackParamList } from '../AppNavigator';
import { useCart } from '../context/CartContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CartItem = { id: string; name: string; price: number; qty: number };

export default function CoursesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addToCart } = useCart();
  const scrollViewRef = useRef<ScrollView>(null);
  const sixMonthSectionRef = useRef<View>(null);
  const sixWeekSectionRef = useRef<View>(null);

  const scrollToSixWeekCourses = () => {
    sixWeekSectionRef.current?.measureLayout(
      scrollViewRef.current?.getScrollResponder() as any,
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y, animated: true });
      },
      () => console.log('Error scrolling to 6-week courses'),
    );
  };

  const scrollToSixMonthCourses = () => {
    sixMonthSectionRef.current?.measureLayout(
      scrollViewRef.current?.getScrollResponder() as any,
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y, animated: true });
      },
      () => console.log('Error scrolling to 6-month courses'),
    );
  };

  const handleAddToCart = (course: { id: string; name: string; price: number }) => {
    const cartItem: CartItem = { ...course, qty: 1 };
    addToCart(cartItem);
    navigation.navigate('Cart');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      ref={scrollViewRef}
    >
      <Navbar active="Courses" />

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Our Courses</Text>
          <Text style={styles.heroSubtitle}>
            Choose your path to empowerment; 6-month deep dives or 6-week quick wins!
          </Text>
        </View>
      </View>

      {/* 6-Month Courses Section */}
      <View style={styles.section} ref={sixMonthSectionRef}>
        <Text style={styles.sectionTitle}>6-Month Courses</Text>
        <TouchableOpacity
          style={styles.jumpButton}
          onPress={scrollToSixWeekCourses}
          accessibilityLabel="View 6-Week Courses"
        >
          <Text style={styles.jumpButtonText}>View 6-Week Courses</Text>
        </TouchableOpacity>

        <View style={styles.coursesGrid}>

          {/* First Aid Card */}
          <View style={styles.courseCard}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/FirstAid.png')}
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.courseTitle}>First Aid</Text>
              <Text style={styles.coursePurpose}>Provide first aid awareness and basic life support</Text>
              <View style={styles.courseContent}>
                <Text style={styles.contentItem}>• Wounds and bleeding</Text>
                <Text style={styles.contentItem}>• Burns and fractures</Text>
                <Text style={styles.contentItem}>• Emergency scene management</Text>
                <Text style={styles.contentItem}>• CPR</Text>
                <Text style={styles.contentItem}>• Choking / blocked airway</Text>
              </View>
              <View style={styles.courseFooter}>
                <Text style={styles.coursePrice}>R1500</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart({ id: 'first-aid', name: 'First Aid', price: 1500 })}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Sewing Card */}
          <View style={styles.courseCard}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/Sewing.png')}
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.courseTitle}>Sewing</Text>
              <Text style={styles.coursePurpose}>Provide tailoring and alteration services</Text>
              <View style={styles.courseContent}>
                <Text style={styles.contentItem}>• Types of stitches</Text>
                <Text style={styles.contentItem}>• Sewing buttons, zips, hems, and seams</Text>
                <Text style={styles.contentItem}>• Threading a sewing machine</Text>
                <Text style={styles.contentItem}>• Designing garments</Text>
              </View>
              <View style={styles.courseFooter}>
                <Text style={styles.coursePrice}>R1500</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart({ id: 'sewing', name: 'Sewing', price: 1500 })}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Landscaping Card */}
          <View style={styles.courseCard}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/Landscaping.png')}
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.courseTitle}>Landscaping</Text>
              <Text style={styles.coursePurpose}>Provide landscaping services for new and established gardens</Text>
              <View style={styles.courseContent}>
                <Text style={styles.contentItem}>• Indigenous & exotic plants</Text>
                <Text style={styles.contentItem}>• Fixed structures (fountains, statues, benches, tables, built-in braai)</Text>
                <Text style={styles.contentItem}>• Garden planning including aesthetics of plant shapes and colours</Text>
              </View>
              <View style={styles.courseFooter}>
                <Text style={styles.coursePrice}>R1500</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart({ id: 'landscaping', name: 'Landscaping', price: 1500 })}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Life Skills Card */}
          <View style={styles.courseCard}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/LifeSkills.png')}
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.courseTitle}>Life Skills</Text>
              <Text style={styles.coursePurpose}>Essential everyday literacy and rights</Text>
              <View style={styles.courseContent}>
                <Text style={styles.contentItem}>• Opening a bank account</Text>
                <Text style={styles.contentItem}>• Basic labour law (know your rights)</Text>
                <Text style={styles.contentItem}>• Basic reading and writing literacy</Text>
                <Text style={styles.contentItem}>• Basic numeric literacy</Text>
              </View>
              <View style={styles.courseFooter}>
                <Text style={styles.coursePrice}>R1500</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart({ id: 'life-skills', name: 'Life Skills', price: 1500 })}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </View>

      {/* 6-Week Courses Section */}
      <View style={styles.section} ref={sixWeekSectionRef}>
        <Text style={styles.sectionTitle}>6-Week Courses</Text>

        <View style={styles.coursesGrid}>

          {/* Child Minding */}
          <View style={styles.courseCard}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/ChildMinding.png')}
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.courseTitle}>Child Minding</Text>
              <Text style={styles.coursePurpose}>Care for babies and toddlers</Text>
              <View style={styles.courseContent}>
                <Text style={styles.contentItem}>• Baby needs</Text>
                <Text style={styles.contentItem}>• Toddler care</Text>
                <Text style={styles.contentItem}>• Educational play</Text>
              </View>
              <View style={styles.courseFooter}>
                <Text style={styles.coursePrice}>R750</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart({ id: 'child-minding', name: 'Child Minding', price: 750 })}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Cooking */}
          <View style={styles.courseCard}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/Cooking.png')}
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.courseTitle}>Cooking</Text>
              <Text style={styles.coursePurpose}>Prepare and cook nutritious family meals</Text>
              <View style={styles.courseContent}>
                <Text style={styles.contentItem}>• Nutritional requirements for a healthy body</Text>
                <Text style={styles.contentItem}>• Types of protein, carbohydrates, and vegetables</Text>
                <Text style={styles.contentItem}>• Planning meals</Text>
                <Text style={styles.contentItem}>• Tasty and nutritious recipes</Text>
              </View>
              <View style={styles.courseFooter}>
                <Text style={styles.coursePrice}>R750</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart({ id: 'cooking', name: 'Cooking', price: 750 })}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Garden Maintenance */}
          <View style={styles.courseCard}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/GardenMaintenance.png')}
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.courseTitle}>Garden Maintenance</Text>
              <Text style={styles.coursePurpose}>Provide basic knowledge of watering, pruning, and planting in a domestic garden</Text>
              <View style={styles.courseContent}>
                <Text style={styles.contentItem}>• Plant care</Text>
                <Text style={styles.contentItem}>• Pruning and propagation of plants</Text>
                <Text style={styles.contentItem}>• Planting techniques for different plant types</Text>
              </View>
              <View style={styles.courseFooter}>
                <Text style={styles.coursePrice}>R750</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart({ id: 'garden-maintenance', name: 'Garden Maintenance', price: 750 })}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>

        <TouchableOpacity
          style={styles.jumpButton}
          onPress={scrollToSixMonthCourses}
        >
          <Text style={styles.jumpButtonText}>Back to 6-Month Courses</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          &copy; 2022 Empowering the Nation. All rights reserved. | Igniting futures, one skill at a time!
        </Text>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width > 900 ? (width - 80) / 3 : width > 600 ? (width - 48) / 2 : width - 32;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  heroSection: {
    padding: 32,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#006400',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
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
  jumpButton: {
    backgroundColor: '#006400',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
  },
  jumpButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DAA520',
    textAlign: 'center',
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 8,
    width: cardWidth,
  },
  imageContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 140,
  },
  courseImage: {
    width: '100%',
    height: 200,
    transform: [{ translateY: -0 }], // move image up
  },
  cardContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DAA520',
    textAlign: 'center',
    marginBottom: 8,
  },
  coursePurpose: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  courseContent: {
    marginBottom: 12,
  },
  contentItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  courseFooter: {
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 8,
},
coursePrice: {
  fontSize: 16,
  fontWeight: '700',
  color: '#006400',
  marginBottom: 8,
},
addToCartButton: {
  backgroundColor: '#006400',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  width: '100%', // makes responsive for all phone sizes
  alignItems: 'center',
},
  addToCartButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DAA520',
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
