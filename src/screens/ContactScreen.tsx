// src/screens/ContactScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  TextInput,
} from 'react-native';
import type { KeyboardTypeOptions } from 'react-native';
import Navbar from '../components/Navbar';

const { width } = Dimensions.get('window');
const isLargeScreen = width >= 768;

// form field keys for typing
type FormKeys = 'name' | 'email' | 'phone' | 'message';

export default function ContactScreen() {
  // form state
  const [form, setForm] = useState<Record<FormKeys, string>>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // banner visibility states
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Please fill in all fields correctly.');

  // submit handler
  const handleSubmit = () => {
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (!name || !email || !phone || !message) {
      setErrorMessage('Please fill in all fields.');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setShowSuccess(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5DC' }}>
      <Navbar active="Contact" />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* header */}
        <View style={{ padding: 24, backgroundColor: '#FFF8E1', alignItems: 'center' }}>
          <Text style={{
            fontSize: 26,
            fontWeight: '800',
            color: '#006400',
            fontFamily: 'Montserrat_800ExtraBold'
          }}>
            Get in Touch
          </Text>

          <Text style={{
            fontSize: 15,
            color: '#333',
            marginTop: 6,
            textAlign: 'center',
            maxWidth: 400,
            fontFamily: 'Montserrat_600SemiBold',
          }}>
            Ready to empower? Reach out for courses, quotes, or any questions.
          </Text>
        </View>

        {/* contact info and venues */}
        <View
          style={{
            flexDirection: isLargeScreen ? 'row' : 'column',
            padding: 16,
            gap: isLargeScreen ? 32 : 20,
            width: '100%',
            maxWidth: 900,
            alignSelf: 'center',
          }}
        >

          {/* contact info card */}
          <View
            style={{
              flex: isLargeScreen ? 1 : undefined,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              elevation: 4,
            }}
          >
            <Text style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '800',
              marginBottom: 12,
              color: '#DAA520',
              fontFamily: 'Montserrat_800ExtraBold'
            }}>
              Quick Contact
            </Text>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F5F5DC',
              borderRadius: 10,
              padding: 10,
              marginBottom: 12,
            }}>
              <Text style={{ fontSize: 22, marginRight: 10, color: '#DAA520' }}>📞</Text>
              <Text style={{ fontSize: 14, color: '#333' }}>
                <Text style={{ fontWeight: '700', color: '#006400' }}>Phone:</Text> +27 11 123 4567
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F5F5DC',
              borderRadius: 10,
              padding: 10,
            }}>
              <Text style={{ fontSize: 22, marginRight: 10, color: '#DAA520' }}>📥</Text>
              <Text style={{ fontSize: 14, color: '#333', flex: 1 }}>
                <Text style={{ fontWeight: '700', color: '#006400' }}>Email:</Text>{' '}
                <Text
                  style={{ color: '#006400', textDecorationLine: 'underline' }}
                  onPress={() => Linking.openURL('mailto:info@empoweringthenation.co.za')}
                >
                  info@empoweringthenation.co.za
                </Text>
              </Text>
            </View>
          </View>

          {/* venue list */}
          <View style={{ flex: isLargeScreen ? 2 : undefined }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                textAlign: 'center',
                marginBottom: 12,
                color: '#006400',
                fontFamily: 'Montserrat_800ExtraBold',
              }}
            >
              Our Venues in Johannesburg
            </Text>

            {['Sandton', 'Soweto', 'Midrand'].map((place, i) => (
              <View
                key={i}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  elevation: 4,
                }}
              >
                <Text style={{
                  fontSize: 18,
                  fontWeight: '700',
                  marginBottom: 6,
                  color: '#DAA520',
                  fontFamily: 'Montserrat_700Bold',
                }}>
                  {place}
                </Text>
                <Text style={{ color: '#333' }}>
                  {place === 'Sandton' && '123 Nelson Mandela Dr, Sandton'}
                  {place === 'Soweto' && '456 Vilakazi St, Soweto'}
                  {place === 'Midrand' && '789 Kyalami Rd, Midrand'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* contact form */}
        <View style={{ backgroundColor: '#E8E8C8', padding: 16 }}>
          <View
            style={{
              maxWidth: 550,
              alignSelf: 'center',
              backgroundColor: '#FFFFFF',
              padding: 20,
              borderRadius: 12,
              elevation: 4,
            }}
          >
            <Text style={{
              fontSize: 22,
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: 14,
              color: '#DAA520',
              fontFamily: 'Montserrat_800ExtraBold'
            }}>
              Send Us a Message
            </Text>

            {showError && (
              <View style={{
                backgroundColor: '#F8D7DA',
                borderColor: '#F5C2C7',
                borderWidth: 1,
                borderRadius: 8,
                padding: 10,
                marginBottom: 12,
              }}>
                <Text style={{
                  color: '#842029',
                  fontWeight: '600',
                  textAlign: 'center',
                  fontFamily: 'Montserrat_600SemiBold',
                }}>
                  {errorMessage}
                </Text>
              </View>
            )}

            {showSuccess && (
              <View style={{
                backgroundColor: '#D4EDDA',
                borderColor: '#C3E6CB',
                borderWidth: 1,
                borderRadius: 8,
                padding: 10,
                marginBottom: 12,
              }}>
                <Text style={{
                  color: '#155724',
                  fontWeight: '600',
                  textAlign: 'center',
                  fontFamily: 'Montserrat_600SemiBold',
                }}>
                  Success! Your message has been sent.
                </Text>
              </View>
            )}

            {[ 
              { label: 'Name', value: 'name', placeholder: 'Your full name' },
              { label: 'Email', value: 'email', placeholder: 'your.email@example.com', keyboardType: 'email-address' },
              { label: 'Phone', value: 'phone', placeholder: '+27 11 123 4567', keyboardType: 'phone-pad' },
            ].map((field, i) => (
              <View key={i} style={{ marginBottom: 14 }}>
                <Text style={{
                  fontWeight: '600',
                  marginBottom: 6,
                  color: '#006400',
                  fontFamily: 'Montserrat_600SemiBold'
                }}>
                  {field.label}
                </Text>

                <TextInput
                  style={{
                    backgroundColor: '#F5F5DC',
                    borderWidth: 2,
                    borderColor: !form[field.value as FormKeys].trim() && showError ? '#b32121' : '#F5F5DC',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 15,
                    fontFamily: 'Montserrat_400Regular',
                  }}
                  placeholder={field.placeholder}
                  value={form[field.value as FormKeys]}
                  onChangeText={(t) => setForm({ ...form, [field.value]: t })}
                  keyboardType={(field.keyboardType as KeyboardTypeOptions) || 'default'}
                  autoCapitalize={field.value === 'email' ? 'none' : 'sentences'}
                />
              </View>
            ))}

            {/* message box */}
            <View style={{ marginBottom: 14 }}>
              <Text style={{
                fontWeight: '600',
                marginBottom: 6,
                color: '#006400',
                fontFamily: 'Montserrat_600SemiBold'
              }}>
                Message
              </Text>

              <TextInput
                style={{
                  backgroundColor: '#F5F5DC',
                  borderWidth: 2,
                  borderColor: !form.message.trim() && showError ? '#b32121' : '#F5F5DC',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 15,
                  height: 120,
                  textAlignVertical: 'top',
                  fontFamily: 'Montserrat_400Regular',
                }}
                placeholder="Tell us how we can help."
                value={form.message}
                onChangeText={(t) => setForm({ ...form, message: t })}
                multiline
              />
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#DAA520',
                padding: 14,
                borderRadius: 8,
                alignItems: 'center',
              }}
              onPress={handleSubmit}
            >
              <Text style={{
                color: '#006400',
                fontSize: 17,
                fontWeight: '700',
                fontFamily: 'Montserrat_700Bold',
              }}>
                Submit Inquiry
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* footer */}
        <View style={{ backgroundColor: '#006400', padding: 14, alignItems: 'center' }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 12,
            textAlign: 'center',
            fontFamily: 'Montserrat_400Regular',
          }}>
            © 2022 Empowering the Nation. All rights reserved.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}
