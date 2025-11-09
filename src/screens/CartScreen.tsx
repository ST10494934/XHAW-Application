import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { RootStackParamList } from '../AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CartItem = { id: string; name: string; price: number; qty: number };

export default function CartScreen() {
  const { cart, removeFromCart, subtotal, count, setQty, clearCart } = useCart();
  const navigation = useNavigation<NavigationProp>();
  const [calculated, setCalculated] = useState<null | {
    subtotal: number;
    discountRate: number;
    discount: number;
    vat: number;
    total: number;
  }>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });

  const discountRateFor = (n: number) => (n === 2 ? 0.05 : n === 3 ? 0.10 : n >= 4 ? 0.15 : 0);

  const calculate = () => {
    const n = count;
    const rate = discountRateFor(n);
    const discount = subtotal * rate;
    const vat = (subtotal - discount) * 0.15;
    const total = subtotal - discount + vat;
    setCalculated({ subtotal, discountRate: rate, discount, vat, total });
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    Alert.alert('Removed', 'Item removed from cart');
    setCalculated(null);
  };

  const handleQuoteSubmit = () => {
    if (!form.name || !form.email) {
      Alert.alert('Error', 'Please enter both name and email.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    setModalVisible(false);
    Alert.alert('Success', `Quote request sent to ${form.email}! You'll receive it soon.`);
    setForm({ name: '', email: '' });
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>R{(item.price * item.qty).toFixed(2)} ({item.qty} × R{item.price})</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => setQty(item.id, Math.max(1, item.qty - 1))}
          accessibilityLabel={`Decrease quantity for ${item.name}`}
        >
          <Text style={styles.qtyText}>−</Text>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 8, fontSize: 16, color: '#333', fontFamily: 'Montserrat_400Regular' }}>
          {item.qty}
        </Text>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => setQty(item.id, item.qty + 1)}
          accessibilityLabel={`Increase quantity for ${item.name}`}
        >
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRemove(item.id)}
          style={styles.removeBtn}
          accessibilityLabel={`Remove ${item.name} from cart`}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      <Navbar active="Cart" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {cart.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
            <Text style={styles.emptyText}>
              No courses selected yet? Time to dive into it and start building your future!
            </Text>
            <TouchableOpacity
              style={styles.emptyCta}
              onPress={() => navigation.navigate('Courses')}
              accessibilityLabel="Browse Courses"
            >
              <Text style={styles.emptyCtaText}>Browse Courses</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>Your Cart</Text>
                <Text style={styles.heroSubtitle}>
                  Awesome choices! Review your skills journey and get your personalized quote.
                </Text>
              </View>
            </View>

            {/* Cart Items Section */}
            <View style={styles.cartItemsSection}>
              <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 8 }}
              />
            </View>

            {/* Summary Section */}
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Quote Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.rowLabel}>Subtotal</Text>
                <Text style={styles.rowValue}>R{subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.rowLabel}>Courses</Text>
                <Text style={styles.rowValue}>{count}</Text>
              </View>
              <TouchableOpacity
                style={styles.calcBtn}
                onPress={calculate}
                accessibilityLabel="Calculate Total"
              >
                <Text style={styles.calcText}>Calculate Total</Text>
              </TouchableOpacity>
              {calculated && (
                <View style={{ marginTop: 12 }}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.rowLabel}>Discount ({(calculated.discountRate * 100).toFixed(0)}%)</Text>
                    <Text style={styles.rowValue}>- R{calculated.discount.toFixed(2)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.rowLabel}>VAT (15%)</Text>
                    <Text style={styles.rowValue}>R{calculated.vat.toFixed(2)}</Text>
                  </View>
                  <View style={[styles.summaryRow, { marginTop: 8 }]}>
                    <Text style={[styles.rowLabel, { fontWeight: '700', fontFamily: 'Montserrat_700Bold' }]}>Total</Text>
                    <Text style={[styles.rowValue, { fontWeight: '700', fontFamily: 'Montserrat_700Bold' }]}>R{calculated.total.toFixed(2)}</Text>
                  </View>
                </View>
              )}
            </View>

            {/* CTA Section */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#DAA520' }]}
                onPress={() => setModalVisible(true)}
                accessibilityLabel="Request Quote"
              >
                <Text style={[styles.actionBtnText, { color: '#006400' }]}>Request Quote</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#006400' }]}
                onPress={() => navigation.navigate('Courses')}
                accessibilityLabel="Continue Browsing"
              >
                <Text style={[styles.actionBtnText, { color: '#006400' }]}>Continue Browsing</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#006400' }]}
                onPress={() => {
                  clearCart();
                  setCalculated(null);
                }}
                accessibilityLabel="Clear Cart"
              >
                <Text style={[styles.actionBtnText, { color: '#DAA520' }]}>Clear Cart</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            &copy; 2022 Empowering the Nation. All rights reserved. | Igniting futures, one skill at a time!
          </Text>
        </View>
      </ScrollView>

      {/* Quote Request Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Request Your Quote</Text>
            <Text style={styles.modalSubtitle}>
              Enter your name and email to receive your personalized quote:
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Full Name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
              accessibilityLabel="Full Name"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email Address"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              keyboardType="email-address"
              accessibilityLabel="Email Address"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#006400' }]}
                onPress={handleQuoteSubmit}
                accessibilityLabel="Submit Quote"
              >
                <Text style={styles.modalButtonText}>Get Quote</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#DC143C' }]}
                onPress={() => setModalVisible(false)}
                accessibilityLabel="Cancel"
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Beige
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Beige
  },
  contentContainer: {
    paddingBottom: 40,
  },
  heroSection: {
    padding: 32,
    backgroundColor: '#FFF8E1', // Light beige
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
    fontFamily: 'Montserrat_800ExtraBold',
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Montserrat_600SemiBold',
  },
  empty: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#DAA520', // Gold
    marginBottom: 8,
    fontFamily: 'Montserrat_800ExtraBold',
  },
  emptyText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  emptyCta: {
    backgroundColor: '#006400', // Dark green
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyCtaText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DAA520', // Gold
    fontFamily: 'Montserrat_700Bold',
  },
  cartItemsSection: {
    padding: 12,
    backgroundColor: '#F5F5DC', // Beige
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    fontFamily: 'Montserrat_700Bold',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#006400', // Dark green
    fontFamily: 'Montserrat_700Bold',
  },
  qtyBtn: {
    backgroundColor: '#EEE',
    padding: 6,
    borderRadius: 6,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'Montserrat_700Bold',
  },
  removeBtn: {
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  removeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF5252', // Red for remove
    fontFamily: 'Montserrat_700Bold',
  },
  summary: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    margin: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#DAA520', // Gold
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Montserrat_800ExtraBold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Montserrat_600SemiBold',
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#006400', // Dark green
    fontFamily: 'Montserrat_600SemiBold',
  },
  calcBtn: {
    backgroundColor: '#006400', // Dark green
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  calcText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DAA520', // Gold
    fontFamily: 'Montserrat_700Bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 12,
  },
  actionBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  actionBtnText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Montserrat_700Bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#DAA520', // Gold
    marginBottom: 8,
    fontFamily: 'Montserrat_800ExtraBold',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#F5F5DC', // Beige
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    fontFamily: 'Montserrat_400Regular',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Montserrat_700Bold',
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
    fontFamily: 'Montserrat_400Regular',
  },
});