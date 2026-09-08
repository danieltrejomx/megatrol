import { useState, useEffect, type FormEvent } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AuthModal.css';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalTab, 
    openAuthModal, 
    login, 
    loginWithGoogle, 
    loginAsDemo, 
    register 
  } = useAuth();

  const [tab, setTab] = useState<'login' | 'register'>(authModalTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordView, setForgotPasswordView] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Google account dialog view
  const [googlePromptView, setGooglePromptView] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  // Sync tab with context when modal opens or tab prop changes
  useEffect(() => {
    setTab(authModalTab);
  }, [authModalTab]);

  // Reset error/success when modal opens or tab changes
  useEffect(() => {
    if (isAuthModalOpen) {
      setErrorMsg('');
      setSuccessMsg('');
      setForgotPasswordView(false);
      setResetSent(false);
      setGooglePromptView(false);
    }
  }, [isAuthModalOpen, tab]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleTabChange = (newTab: 'login' | 'register') => {
    setTab(newTab);
    openAuthModal(newTab);
    setErrorMsg('');
    setSuccessMsg('');
    setForgotPasswordView(false);
    setGooglePromptView(false);
  };

  const handleStartGoogle = () => {
    setErrorMsg('');
    if (email && email.includes('@')) {
      setGoogleEmail(email);
    }
    if (name) {
      setGoogleName(name);
    }
    setGooglePromptView(true);
  };

  const handleConfirmGoogle = async (e: FormEvent) => {
    e.preventDefault();
    const cleanG = googleEmail.trim().toLowerCase();
    if (!cleanG || !cleanG.includes('@')) {
      setErrorMsg('Por favor ingresa tu correo de Gmail');
      return;
    }
    const cleanN = googleName.trim() || (cleanG.split('@')[0].charAt(0).toUpperCase() + cleanG.split('@')[0].slice(1));
    setLoading(true);
    try {
      const res = await loginWithGoogle(cleanG, cleanN);
      if (!res.success) {
        setErrorMsg(res.error || 'Error al conectar con Google');
      }
    } catch {
      setErrorMsg('Error al procesar acceso con Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPassword = password.trim();

    if (forgotPasswordView) {
      if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
        setErrorMsg('Por favor ingresa un correo electrónico válido');
        return;
      }
      setResetSent(true);
      setSuccessMsg(`Te hemos enviado un enlace de recuperación a ${cleanEmail}`);
      return;
    }

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Por favor ingresa un correo electrónico válido');
      return;
    }

    if (tab === 'register') {
      if (!cleanName) {
        setErrorMsg('Por favor ingresa tu nombre completo');
        return;
      }
      if (!cleanPassword || cleanPassword.length < 3) {
        setErrorMsg('Por favor crea una contraseña de al menos 3 caracteres');
        return;
      }

      setLoading(true);
      try {
        const res = await register(cleanName, cleanEmail, cleanPassword, phone.trim());
        if (!res.success) {
          setErrorMsg(res.error || 'No se pudo crear la cuenta');
        }
      } catch {
        setErrorMsg('Ocurrió un error al procesar tu solicitud');
      } finally {
        setLoading(false);
      }
    } else {
      // Login
      if (!cleanPassword) {
        setErrorMsg('Por favor ingresa tu contraseña');
        return;
      }
      setLoading(true);
      try {
        const res = await login(cleanEmail, cleanPassword);
        if (!res.success) {
          setErrorMsg(res.error || 'No se pudo iniciar sesión');
        }
      } catch {
        setErrorMsg('Ocurrió un error al procesar tu solicitud');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await loginAsDemo();
    } catch {
      setErrorMsg('Error al entrar como demo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={closeAuthModal} role="dialog" aria-modal="true">
      <div className="auth-modal-card" onClick={e => e.stopPropagation()}>
        <button 
          className="auth-modal-close" 
          onClick={closeAuthModal} 
          aria-label="Cerrar ventana de autenticación"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="auth-modal-header">
          <div className="auth-brand-badge">
            <span className="auth-badge-letter">M</span>
            <span className="auth-badge-text">Megatrol Cuenta</span>
          </div>
          <h2 className="auth-title">
            {googlePromptView
              ? 'Acceder con Google'
              : forgotPasswordView
              ? 'Recuperar Contraseña'
              : tab === 'login'
              ? '¡Bienvenido de vuelta!'
              : 'Crea tu Cuenta'}
          </h2>
          <p className="auth-subtitle">
            {googlePromptView
              ? 'Ingresa tu Gmail y tu nombre para vincular tu cuenta'
              : forgotPasswordView
              ? 'Ingresa tu correo para recibir instrucciones'
              : tab === 'login'
              ? 'Guarda tu carrito, revisa tus pedidos y gestiona tus direcciones'
              : 'Accede a tus pedidos, autocompleta tus compras y guarda tu carrito'}
          </p>
        </div>

        {/* Tab Switcher (if not in forgot password or google view) */}
        {!forgotPasswordView && !googlePromptView && (
          <div className="auth-tabs">
            <button 
              type="button"
              className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              Iniciar Sesión
            </button>
            <button 
              type="button"
              className={`auth-tab-btn ${tab === 'register' ? 'active' : ''}`}
              onClick={() => handleTabChange('register')}
            >
              Crear Cuenta
            </button>
          </div>
        )}

        {/* Error / Success Alerts */}
        {errorMsg && (
          <div className="auth-alert auth-alert-error">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="auth-alert auth-alert-success">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* GOOGLE CUSTOM PROMPT VIEW */}
        {googlePromptView ? (
          <form className="auth-form" onSubmit={handleConfirmGoogle} noValidate>
            <div className="auth-input-group">
              <label htmlFor="google-email">Tu Correo de Gmail *</label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input
                  id="google-email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu.cuenta@gmail.com"
                  value={googleEmail}
                  onChange={e => { setErrorMsg(''); setGoogleEmail(e.target.value); }}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="google-name">Tu Nombre Completo *</label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" />
                <input
                  id="google-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ej. Juan Pérez"
                  value={googleName}
                  onChange={e => { setErrorMsg(''); setGoogleName(e.target.value); }}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="google-auth-btn"
              style={{ marginTop: '8px', background: '#0084c7', color: '#ffffff', borderColor: '#0084c7' }}
              disabled={loading}
            >
              <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{loading ? 'Conectando...' : 'Continuar con mi Cuenta de Google'}</span>
            </button>

            <button 
              type="button" 
              className="auth-cancel-forgot"
              onClick={() => { setGooglePromptView(false); setErrorMsg(''); }}
            >
              Cancelar y volver
            </button>
          </form>
        ) : (
          <>
            {!forgotPasswordView && (
              <>
                {/* Google Fast Login */}
                <button 
                  type="button" 
                  className="google-auth-btn" 
                  onClick={handleStartGoogle}
                  disabled={loading}
                >
                  <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continuar con Google</span>
                </button>

                {/* Quick Demo Login */}
                <button 
                  type="button" 
                  className="demo-auth-btn" 
                  onClick={handleDemoLogin}
                  disabled={loading}
                  title="Prueba el sistema con una cuenta demo pre-cargada con pedidos y direcciones"
                >
                  <Sparkles size={16} className="sparkle-icon" />
                  <span>Entrar rápido como <strong>Cliente Demo</strong></span>
                </button>

                <div className="auth-divider">
                  <span>o ingresa con tus datos</span>
                </div>
              </>
            )}

            {/* Email & Password Form */}
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {tab === 'register' && !forgotPasswordView && (
                <>
                  <div className="auth-input-group">
                    <label htmlFor="auth-name">Nombre y Apellido *</label>
                    <div className="auth-input-wrapper">
                      <User size={18} className="auth-input-icon" />
                      <input
                        id="auth-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Ej. Dra. Mariana Sánchez"
                        value={name}
                        onChange={e => { setErrorMsg(''); setName(e.target.value); }}
                        required
                      />
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label htmlFor="auth-phone">Teléfono / WhatsApp (Opcional)</label>
                    <div className="auth-input-wrapper">
                      <Phone size={18} className="auth-input-icon" />
                      <input
                        id="auth-phone"
                        name="tel"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Ej. 55 1234 5678"
                        value={phone}
                        onChange={e => { setErrorMsg(''); setPhone(e.target.value); }}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="auth-input-group">
                <label htmlFor="auth-email">Correo Electrónico *</label>
                <div className="auth-input-wrapper">
                  <Mail size={18} className="auth-input-icon" />
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={e => { setErrorMsg(''); setEmail(e.target.value); }}
                    required
                  />
                </div>
              </div>

              {!forgotPasswordView && (
                <div className="auth-input-group">
                  <div className="auth-label-row">
                    <label htmlFor="auth-password">
                      {tab === 'register' ? 'Crea una Contraseña *' : 'Contraseña *'}
                    </label>
                    {tab === 'login' && (
                      <button 
                        type="button" 
                        className="auth-forgot-btn" 
                        onClick={() => setForgotPasswordView(true)}
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    )}
                  </div>
                  <div className="auth-input-wrapper">
                    <Lock size={18} className="auth-input-icon" />
                    <input
                      id="auth-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={tab === 'register' ? 'new-password' : 'current-password'}
                      placeholder="Mínimo 3 caracteres"
                      value={password}
                      onChange={e => { setErrorMsg(''); setPassword(e.target.value); }}
                      required
                    />
                    <button
                      type="button"
                      className="auth-pw-toggle"
                      onClick={() => setShowPassword(p => !p)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {resetSent ? (
                <div className="auth-reset-done">
                  <p>Revisa tu bandeja de entrada o spam. Hemos enviado las instrucciones para restablecer tu contraseña.</p>
                  <button 
                    type="button" 
                    className="auth-back-btn" 
                    onClick={() => { setForgotPasswordView(false); setResetSent(false); }}
                  >
                    Volver a Iniciar Sesión
                  </button>
                </div>
              ) : (
                <button 
                  type="submit" 
                  className="auth-submit-btn" 
                  disabled={loading}
                >
                  {loading ? (
                    'Procesando...'
                  ) : forgotPasswordView ? (
                    'Enviar Enlace de Recuperación'
                  ) : tab === 'login' ? (
                    <>
                      <span>Iniciar Sesión</span>
                      <ArrowRight size={18} />
                    </>
                  ) : (
                    <>
                      <span>Crear Mi Cuenta</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              )}

              {forgotPasswordView && !resetSent && (
                <button 
                  type="button" 
                  className="auth-cancel-forgot"
                  onClick={() => setForgotPasswordView(false)}
                >
                  Cancelar y volver
                </button>
              )}

              {tab === 'register' && !forgotPasswordView && (
                <p className="auth-terms-note">
                  Al registrarte aceptas los <a href="/nosotros" onClick={e => e.preventDefault()}>Términos de Servicio</a> y el <a href="/nosotros" onClick={e => e.preventDefault()}>Aviso de Privacidad</a> de Megatrol.
                </p>
              )}
            </form>

            {/* Footer note for switching */}
            {!forgotPasswordView && (
              <div className="auth-modal-footer">
                {tab === 'login' ? (
                  <p>
                    ¿Aún no tienes cuenta?{' '}
                    <button type="button" className="auth-switch-link" onClick={() => handleTabChange('register')}>
                      Regístrate aquí
                    </button>
                  </p>
                ) : (
                  <p>
                    ¿Ya tienes cuenta?{' '}
                    <button type="button" className="auth-switch-link" onClick={() => handleTabChange('login')}>
                      Inicia sesión
                    </button>
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
