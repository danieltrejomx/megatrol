import { useState, useEffect, type FormEvent } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  MessageCircle
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
    register 
  } = useAuth();

  const [tab, setTab] = useState<'login' | 'register'>(authModalTab);
  const [identifier, setIdentifier] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordView, setForgotPasswordView] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Sync tab with context when modal opens or tab prop changes
  useEffect(() => {
    setTab(authModalTab);
  }, [authModalTab]);

  // Reset error/success when modal opens
  useEffect(() => {
    if (isAuthModalOpen) {
      setErrorMsg('');
      setSuccessMsg('');
      setForgotPasswordView(false);
      setResetSent(false);
    }
  }, [isAuthModalOpen]);

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
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (forgotPasswordView) {
      const cleanIdent = identifier.trim();
      if (!cleanIdent) {
        setErrorMsg('Por favor ingresa tu correo electrónico o WhatsApp');
        return;
      }
      setResetSent(true);
      setSuccessMsg(`Te hemos enviado las instrucciones de recuperación para ${cleanIdent}`);
      return;
    }

    if (tab === 'login') {
      const cleanIdent = identifier.trim();
      if (!cleanIdent) {
        setErrorMsg('Por favor ingresa tu correo o número de WhatsApp');
        return;
      }
      if (!password.trim()) {
        setErrorMsg('Por favor ingresa tu contraseña');
        return;
      }

      setLoading(true);
      try {
        const res = await login(cleanIdent, password.trim());
        if (!res.success) {
          if (res.notRegistered) {
            // Mandar directo a Crear Cuenta
            setTab('register');
            if (cleanIdent.includes('@')) {
              setEmail(cleanIdent);
            } else {
              setPhone(cleanIdent);
            }
            setErrorMsg(res.error || 'Este correo aún no está registrado. Crea tu cuenta para continuar.');
          } else {
            setErrorMsg(res.error || 'No se pudo iniciar sesión');
          }
        }
      } catch {
        setErrorMsg('Ocurrió un error al procesar tu solicitud');
      } finally {
        setLoading(false);
      }
    } else {
      // Register
      const cleanName = name.trim();
      const cleanEmail = email.trim();
      const cleanPhone = phone.trim();
      const cleanPassword = password.trim();

      if (!cleanName) {
        setErrorMsg('Por favor ingresa tu nombre completo');
        return;
      }
      if (!cleanEmail && !cleanPhone) {
        setErrorMsg('Ingresa al menos tu correo o tu número de WhatsApp para contactarte');
        return;
      }
      if (cleanEmail && !cleanEmail.includes('@')) {
        setErrorMsg('Por favor ingresa un correo electrónico válido');
        return;
      }
      if (!cleanPassword || cleanPassword.length < 3) {
        setErrorMsg('Por favor asigna una contraseña de al menos 3 caracteres');
        return;
      }

      setLoading(true);
      try {
        const res = await register(cleanName, cleanEmail, cleanPhone, cleanPassword);
        if (!res.success) {
          setErrorMsg(res.error || 'No se pudo crear la cuenta');
        }
      } catch {
        setErrorMsg('Ocurrió un error al procesar tu solicitud');
      } finally {
        setLoading(false);
      }
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
            {forgotPasswordView
              ? 'Recuperar Acceso'
              : tab === 'login'
              ? '¡Bienvenido de vuelta!'
              : 'Crea tu Cuenta'}
          </h2>
          <p className="auth-subtitle">
            {forgotPasswordView
              ? 'Ingresa tu correo o WhatsApp para recibir tu enlace'
              : tab === 'login'
              ? 'Ingresa con tu correo o número de WhatsApp'
              : 'Regístrate con tu correo o WhatsApp para guardar tu carrito y pedidos'}
          </p>
        </div>

        {/* Tab Switcher */}
        {!forgotPasswordView && (
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

        {/* Alerts */}
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

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          
          {/* LOGIN VIEW */}
          {tab === 'login' && !forgotPasswordView && (
            <>
              <div className="auth-input-group">
                <label htmlFor="login-identifier">Correo Electrónico o WhatsApp *</label>
                <div className="auth-input-wrapper">
                  <Mail size={18} className="auth-input-icon" />
                  <input
                    id="login-identifier"
                    type="text"
                    autoComplete="username"
                    placeholder="tu@correo.com o 55 1234 5678"
                    value={identifier}
                    onChange={e => { setErrorMsg(''); setIdentifier(e.target.value); }}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label htmlFor="login-password">Contraseña *</label>
                  <button 
                    type="button" 
                    className="auth-forgot-btn" 
                    onClick={() => setForgotPasswordView(true)}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="auth-input-wrapper">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
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
            </>
          )}

          {/* REGISTER VIEW */}
          {tab === 'register' && !forgotPasswordView && (
            <>
              <div className="auth-input-group">
                <label htmlFor="register-name">Nombre y Apellido *</label>
                <div className="auth-input-wrapper">
                  <User size={18} className="auth-input-icon" />
                  <input
                    id="register-name"
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
                <label htmlFor="register-email">Correo Electrónico</label>
                <div className="auth-input-wrapper">
                  <Mail size={18} className="auth-input-icon" />
                  <input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={e => { setErrorMsg(''); setEmail(e.target.value); }}
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label htmlFor="register-phone">WhatsApp / Celular *</label>
                  <span className="auth-hint-tag">Recomendado</span>
                </div>
                <div className="auth-input-wrapper">
                  <MessageCircle size={18} className="auth-input-icon" style={{ color: '#16a34a' }} />
                  <input
                    id="register-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Ej. 55 1234 5678"
                    value={phone}
                    onChange={e => { setErrorMsg(''); setPhone(e.target.value); }}
                    required
                  />
                </div>
                <span className="auth-input-help">
                  Te permitirá dar seguimiento a tus compras directamente por WhatsApp.
                </span>
              </div>

              <div className="auth-input-group">
                <label htmlFor="register-password">Crea una Contraseña *</label>
                <div className="auth-input-wrapper">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
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
            </>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {forgotPasswordView && (
            <div className="auth-input-group">
              <label htmlFor="forgot-identifier">Ingresa tu Correo o WhatsApp *</label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input
                  id="forgot-identifier"
                  type="text"
                  placeholder="tu@correo.com o 55 1234 5678"
                  value={identifier}
                  onChange={e => { setErrorMsg(''); setIdentifier(e.target.value); }}
                  required
                />
              </div>
            </div>
          )}

          {resetSent ? (
            <div className="auth-reset-done">
              <p>Hemos procesado tu solicitud. Si el usuario existe, recibirás un mensaje con las instrucciones de restablecimiento.</p>
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

        {/* Footer switch */}
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
      </div>
    </div>
  );
};
