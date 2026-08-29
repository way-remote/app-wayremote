import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { responsive, styles } from './style';

const logo = require('../../images/logos/wayremote-logo.png');

export default function LoginScreen({
  onNavigateRegister,
}: {
  onNavigateRegister: () => void;
}) {
  const { signIn, signInWithGoogle, resetPasswordForEmail, loading, error, clearError } = useAuth();
  const { height } = useWindowDimensions();
  const compact = height < 700;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState('');
  const [recoverSent, setRecoverSent] = useState(false);
  const [validationError, setValidationError] = useState('');

  const isBusy = loading;
  const shownError = validationError || error || '';

  const compactStyles = compact ? responsive.compactScreenStyles : null;
  const scrollContentStyle = [styles.scrollContent, compactStyles?.scrollContent];
  const logoStyle = [styles.logo, compactStyles?.logo];
  const cardStyle = [styles.card, compactStyles?.card];
  const titleStyle = [styles.title, compactStyles?.title];
  const subtitleStyle = [styles.subtitle, compactStyles?.subtitle];
  const recoverySuccessStyle = [styles.recoverySuccess, compactStyles?.recoverySuccess];

  function handleEmailLogin() {
    clearError();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setValidationError('PREENCHA O E-MAIL E A SENHA.');
      return;
    }
    setValidationError('');
    signIn(normalizedEmail, password);
  }

  function handleGoogleLogin() {
    clearError();
    setValidationError('');
    signInWithGoogle();
  }

  async function handleSendReset() {
    clearError();
    const normalizedEmail = recoverEmail.trim().toLowerCase();
    if (!normalizedEmail) {
      setValidationError('INFORME SEU E-MAIL.');
      return;
    }
    setValidationError('');
    const ok = await resetPasswordForEmail(normalizedEmail);
    if (ok) {
      setRecoverSent(true);
    }
  }

  if (forgotOpen) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={scrollContentStyle}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View pointerEvents="none" style={styles.mapTexture}>
              <View style={[styles.mapLine, styles.mapLineOne]} />
              <View style={[styles.mapLine, styles.mapLineTwo]} />
              <View style={[styles.mapLine, styles.mapLineThree]} />
              <View style={[styles.mapLine, styles.mapLineFour]} />
            </View>

            <Image source={logo} resizeMode="contain" style={logoStyle} />

            <View style={cardStyle}>
              <Text style={titleStyle}>RECUPERAR</Text>
              <Text style={subtitleStyle}>Enviaremos um link para redefinir sua senha</Text>

              {recoverSent ? (
                <Text style={recoverySuccessStyle}>
                  SE O E-MAIL ESTIVER CADASTRADO, VOCÊ RECEBERÁ UM LINK DE
                  RECUPERAÇÃO. VERIFIQUE SUA CAIXA DE ENTRADA.
                </Text>
              ) : (
                <>
                  <Text style={styles.label}>E-MAIL</Text>
                  <View style={styles.inputShell}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color="#151b18"
                      style={styles.leadingIcon}
                    />
                    <TextInput
                      accessibilityLabel="E-mail para recuperação"
                      autoCapitalize="none"
                      autoComplete="email"
                      editable={!isBusy}
                      keyboardType="email-address"
                      onChangeText={setRecoverEmail}
                      returnKeyType="done"
                      onSubmitEditing={handleSendReset}
                      style={styles.input}
                      value={recoverEmail}
                    />
                  </View>

                  {shownError ? <Text style={styles.errorText}>{shownError}</Text> : null}

                  <Pressable
                    accessibilityRole="button"
                    disabled={isBusy}
                    onPress={handleSendReset}
                    style={({ pressed }) => [
                      styles.primaryButton,
                      pressed && !isBusy ? styles.buttonPressed : null,
                      isBusy ? styles.buttonDisabled : null,
                    ]}
                  >
                    {isBusy ? (
                      <ActivityIndicator color="#f4ecdc" />
                    ) : (
                      <Text style={styles.primaryButtonText}>ENVIAR LINK</Text>
                    )}
                  </Pressable>
                </>
              )}

              <View style={styles.separatorRow}>
                <View style={styles.separatorLine} />
              </View>

              <Pressable
                accessibilityRole="button"
                disabled={isBusy || recoverSent}
                onPress={() => {
                  setForgotOpen(false);
                  setRecoverSent(false);
                  setRecoverEmail('');
                  clearError();
                }}
                style={({ pressed }) => [
                  styles.googleButton,
                  pressed ? styles.buttonPressed : null,
                ]}
              >
                <Text style={styles.googleButtonText}>VOLTAR AO LOGIN</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={scrollContentStyle}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View pointerEvents="none" style={styles.mapTexture}>
            <View style={[styles.mapLine, styles.mapLineOne]} />
            <View style={[styles.mapLine, styles.mapLineTwo]} />
            <View style={[styles.mapLine, styles.mapLineThree]} />
            <View style={[styles.mapLine, styles.mapLineFour]} />
          </View>

          <Image source={logo} resizeMode="contain" style={logoStyle} />

          <View style={cardStyle}>
            <Text style={titleStyle}>ENTRAR</Text>
            <Text style={subtitleStyle}>Acesse sua conta WayRemote</Text>

            <Text style={styles.label}>E-MAIL</Text>
            <View style={styles.inputShell}>
              <Ionicons name="mail-outline" size={20} color="#151b18" style={styles.leadingIcon} />
              <TextInput
                accessibilityLabel="E-mail"
                autoCapitalize="none"
                autoComplete="email"
                editable={!isBusy}
                keyboardType="email-address"
                onChangeText={setEmail}
                returnKeyType="next"
                style={styles.input}
                value={email}
              />
            </View>

            <Text style={[styles.label, styles.passwordLabel]}>SENHA</Text>
            <View style={styles.inputShell}>
              <Ionicons name="lock-closed-outline" size={20} color="#151b18" style={styles.leadingIcon} />
              <TextInput
                accessibilityLabel="Senha"
                autoCapitalize="none"
                autoComplete="password"
                editable={!isBusy}
                onChangeText={setPassword}
                onSubmitEditing={handleEmailLogin}
                returnKeyType="done"
                secureTextEntry={!passwordVisible}
                style={styles.input}
                value={password}
              />
              <Pressable
                accessibilityLabel={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                disabled={isBusy}
                hitSlop={12}
                onPress={() => setPasswordVisible((current) => !current)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#151b18"
                />
              </Pressable>
            </View>

            <Pressable
              disabled={isBusy}
              hitSlop={8}
              onPress={() => setForgotOpen(true)}
              style={styles.forgotButton}
            >
              <Text style={styles.forgotText}>ESQUECI MINHA SENHA</Text>
            </Pressable>

            {shownError ? <Text style={styles.errorText}>{shownError}</Text> : null}

            <Pressable
              accessibilityRole="button"
              disabled={isBusy}
              onPress={handleEmailLogin}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && !isBusy ? styles.buttonPressed : null,
                isBusy ? styles.buttonDisabled : null,
              ]}
            >
              {isBusy ? (
                <ActivityIndicator color="#f4ecdc" />
              ) : (
                <Text style={styles.primaryButtonText}>ENTRAR</Text>
              )}
            </Pressable>

            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>OU</Text>
              <View style={styles.separatorLine} />
            </View>

            <Pressable
              accessibilityRole="button"
              disabled={isBusy}
              onPress={handleGoogleLogin}
              style={({ pressed }) => [
                styles.googleButton,
                pressed && !isBusy ? styles.buttonPressed : null,
                isBusy ? styles.buttonDisabled : null,
              ]}
            >
              <FontAwesome5 name="google" size={18} color="#151b18" style={styles.googleMark} />
              <Text style={styles.googleButtonText}>CONTINUAR COM GOOGLE</Text>
            </Pressable>

            <View style={styles.createAccountRow}>
              <Text style={styles.accountQuestion}>AINDA NÃO TEM CONTA?</Text>
              <Pressable disabled={isBusy} hitSlop={8} onPress={onNavigateRegister}>
                <Text style={styles.createAccountText}>CRIAR CONTA</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
