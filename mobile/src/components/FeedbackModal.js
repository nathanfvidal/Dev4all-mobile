import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../data/mockData';

const C = COLORS;

const TYPES = {
  error: {
    icon: 'alert-circle',
    iconColor: '#ef4444',
    iconBg: '#fef2f2',
    titleDefault: 'Algo deu errado',
    btnBg: '#ef4444',
  },
  success: {
    icon: 'check-circle',
    iconColor: '#22c55e',
    iconBg: '#f0fdf4',
    titleDefault: 'Sucesso!',
    btnBg: '#22c55e',
  },
  warning: {
    icon: 'alert-triangle',
    iconColor: '#f59e0b',
    iconBg: '#fffbeb',
    titleDefault: 'Atenção',
    btnBg: '#f59e0b',
  },
  info: {
    icon: 'info',
    iconColor: '#2563eb',
    iconBg: '#dbeafe',
    titleDefault: 'Informação',
    btnBg: '#2563eb',
  },
};

export default function FeedbackModal({
  visible,
  type = 'error',
  title,
  message,
  btnLabel = 'Entendi',
  onClose,
}) {
  const config = TYPES[type] || TYPES.error;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={s.overlay}>
        <View style={s.box}>
          <View style={[s.iconWrap, { backgroundColor: config.iconBg }]}>
            <Feather name={config.icon} size={36} color={config.iconColor} />
          </View>

          <Text style={s.title}>{title || config.titleDefault}</Text>

          {message ? <Text style={s.message}>{message}</Text> : null}

          <TouchableOpacity
            style={[s.btn, { backgroundColor: config.btnBg }]}
            onPress={onClose}
            activeOpacity={0.85}
          >
            <Text style={s.btnText}>{btnLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  box: {
    backgroundColor: C.white,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: C.textDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: C.textMid,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  btn: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
