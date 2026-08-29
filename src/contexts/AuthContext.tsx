import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { AppState, AppStateStatus } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

WebBrowser.maybeCompleteAuthSession();

const redirectTo = makeRedirectUri();

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  initializing: boolean;
  loading: boolean;
  error: string | null;
  signUp: (fullName: string, email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<boolean>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getErrorMessage(message: string | undefined): string {
  const text = (message ?? '').toLowerCase();
  if (text.includes('invalid login credentials')) {
    return 'E-mail ou senha incorretos. Verifique os dados e tente novamente.';
  }
  if (text.includes('user already registered')) {
    return 'Este e-mail já está cadastrado. Tente fazer login.';
  }
  if (text.includes('email not confirmed')) {
    return 'Confirme seu e-mail antes de fazer login.';
  }
  if (text.includes('password should be at least')) {
    return 'A senha deve ter pelo menos 6 caracteres.';
  }
  if (text.includes('invalid email')) {
    return 'Informe um e-mail válido.';
  }
  if (text.includes('network')) {
    return 'Falha de conexão. Verifique sua internet e tente novamente.';
  }
  return 'Ocorreu um erro inesperado. Tente novamente.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const appStateStatusRef = useRef<AppStateStatus>(AppState.currentState);

  const clearError = useCallback(() => setError(null), []);

  const signUp = useCallback(
    async (fullName: string, email: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (err) {
          setError(getErrorMessage(err.message));
          return false;
        }
        return true;
      } catch {
        setError('Ocorreu um erro inesperado. Tente novamente.');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) {
          setError(getErrorMessage(err.message));
          return false;
        }
        return true;
      } catch {
        setError('Ocorreu um erro inesperado. Tente novamente.');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const signInWithGoogle = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      });
      if (err) {
        setError(getErrorMessage(err.message));
        return false;
      }

      const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo);
      if (res.type === 'success') {
        const { params, errorCode } = QueryParams.getQueryParams(res.url);
        if (errorCode) {
          setError('Não foi possível concluir o login com o Google.');
          return false;
        }
        const { access_token, refresh_token } = params;
        if (!access_token || !refresh_token) {
          setError('Não foi possível concluir o login com o Google.');
          return false;
        }
        const { error: sessionErr } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (sessionErr) {
          setError(getErrorMessage(sessionErr.message));
          return false;
        }
      }
      return true;
    } catch {
      setError('Ocorreu um erro ao entrar com o Google. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    await supabase.auth.signOut();
  }, []);

  const resetPasswordForEmail = useCallback(
    async (email: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo,
        });
        if (err) {
          setError(getErrorMessage(err.message));
          return false;
        }
        return true;
      } catch {
        setError('Ocorreu um erro inesperado ao recuperar a senha. Tente novamente.');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [redirectTo],
  );

  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (mounted) {
          setSession(data.session);
        }
      })
      .finally(() => {
        if (mounted) {
          setInitializing(false);
        }
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (mounted) {
        setSession(newSession);
      }
    });

    const sub = AppState.addEventListener('change', (nextState) => {
      const curState = appStateStatusRef.current;
      const nowActive = nextState === 'active';
      const wasInactive = curState !== 'active';
      appStateStatusRef.current = nextState;

      if (nowActive && wasInactive) {
        supabase.auth.startAutoRefresh();
      } else if (!nowActive) {
        supabase.auth.stopAutoRefresh();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      sub.remove();
    };
  }, []);

  const value: AuthContextValue = {
    session,
    user: session?.user ?? null,
    initializing,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPasswordForEmail,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return ctx;
}
