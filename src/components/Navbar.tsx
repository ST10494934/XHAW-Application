// src/components/Navbar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Navbar({ active }: { active?: string }) {
  const nav = useNavigation<any>();

  return (
    <View style={styles.navbar}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.links}>
        <TouchableOpacity onPress={() => nav.navigate('Home')}>
          <Text style={[styles.link, active === 'Home' && styles.active]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('About')}>
          <Text style={[styles.link, active === 'About' && styles.active]}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('Courses')}>
          <Text style={[styles.link, active === 'Courses' && styles.active]}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('Contact')}>
          <Text style={[styles.link, active === 'Contact' && styles.active]}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('Cart')}>
          <Text style={[styles.link, active === 'Cart' && styles.active]}>Cart 🛒</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#006400',
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  link: {
    color: '#DAA520',
    marginHorizontal: 8,
    fontWeight: '600',
    fontSize: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  active: {
    backgroundColor: '#DAA520',
    color: '#006400',
    borderRadius: 6,
  },
});
