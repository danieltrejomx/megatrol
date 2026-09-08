import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface UserAddress {
  calle: string;
  colonia: string;
  ciudad: string;
  estado: string;
  cp: string;
}

export interface OrderItemRecord {
  name: string;
  qty: number;
  price: number;
  variant?: string;
}

export interface OrderRecord {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  total: number;
  shipping: number;
  paymentMethod: 'card' | 'oxxo' | 'transfer';
  items: OrderItemRecord[];
  date: string;
  address?: UserAddress;
  status: 'Confirmado' | 'En preparación' | 'En camino' | 'Entregado';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  provider?: 'email' | 'whatsapp' | 'local';
  address?: UserAddress;
  orders: OrderRecord[];
  createdAt: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  isAccountModalOpen: boolean;
  authModalTab: 'login' | 'register';
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  openAccountModal: () => void;
  closeAccountModal: () => void;
  login: (identifier: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, 'name' | 'phone' | 'address'>>) => void;
  addOrder: (order: OrderRecord) => void;
}

const STORAGE_KEY_AUTH = 'megatrol_auth_user';
const STORAGE_KEY_USERS = 'megatrol_registered_users';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  // Load registered users array from localStorage
  const getUsersDb = (): User[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  };

  const saveUsersDb = (users: User[]) => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users in localStorage', e);
    }
  };

  // Sync currentUser with localStorage
  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(currentUser));
        // Also update inside users DB
        const users = getUsersDb();
        const idx = users.findIndex(u => u.id === currentUser.id);
        if (idx >= 0) {
          users[idx] = currentUser;
        } else {
          users.push(currentUser);
        }
        saveUsersDb(users);
      } catch (err) {
        console.error('Error saving user session', err);
      }
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    }
  }, [currentUser]);

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openAccountModal = () => {
    setIsAccountModalOpen(true);
  };

  const closeAccountModal = () => {
    setIsAccountModalOpen(false);
  };

  const login = async (identifier: string, _password?: string): Promise<{ success: boolean; error?: string }> => {
    const raw = identifier.trim();
    if (!raw) {
      return { success: false, error: 'Por favor ingresa tu correo electrónico o número de WhatsApp' };
    }

    const cleanEmail = raw.toLowerCase();
    const cleanDigits = raw.replace(/\D/g, '');
    const users = getUsersDb();

    // Match by email OR by phone number (comparing digits)
    const found = users.find(u => {
      const emailMatch = u.email && u.email.toLowerCase() === cleanEmail;
      const phoneDigits = u.phone ? u.phone.replace(/\D/g, '') : '';
      const phoneMatch = cleanDigits.length >= 7 && phoneDigits.length >= 7 && (phoneDigits === cleanDigits || phoneDigits.endsWith(cleanDigits) || cleanDigits.endsWith(phoneDigits));
      return emailMatch || phoneMatch;
    });

    if (found) {
      setCurrentUser(found);
      setIsAuthModalOpen(false);
      setIsAccountModalOpen(true);
      return { success: true };
    }

    // If not registered yet, create seamless account so user can access immediately
    const isEmail = raw.includes('@');
    const namePart = isEmail ? raw.split('@')[0] : `Cliente ${raw.slice(-4)}`;
    const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: capitalizedName,
      email: isEmail ? cleanEmail : `${cleanDigits}@whatsapp.megatrol`,
      phone: !isEmail ? raw : undefined,
      provider: !isEmail ? 'whatsapp' : 'email',
      orders: [],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsersDb(users);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    setIsAccountModalOpen(true);
    return { success: true };
  };

  const register = async (name: string, email: string, phone: string, _password?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      return { success: false, error: 'Por favor ingresa tu nombre completo' };
    }

    if (!cleanEmail && !cleanPhone) {
      return { success: false, error: 'Por favor ingresa tu correo electrónico o tu número de WhatsApp' };
    }

    if (cleanEmail && !cleanEmail.includes('@')) {
      return { success: false, error: 'Por favor ingresa un correo electrónico válido' };
    }

    const users = getUsersDb();
    const cleanDigits = cleanPhone.replace(/\D/g, '');

    // Check if user already exists
    const existingIndex = users.findIndex(u => {
      const emailMatch = cleanEmail && u.email && u.email.toLowerCase() === cleanEmail;
      const phoneDigits = u.phone ? u.phone.replace(/\D/g, '') : '';
      const phoneMatch = cleanDigits.length >= 7 && phoneDigits.length >= 7 && phoneDigits === cleanDigits;
      return emailMatch || phoneMatch;
    });

    if (existingIndex >= 0) {
      users[existingIndex].name = cleanName;
      if (cleanEmail) users[existingIndex].email = cleanEmail;
      if (cleanPhone) users[existingIndex].phone = cleanPhone;
      saveUsersDb(users);
      setCurrentUser(users[existingIndex]);
      setIsAuthModalOpen(false);
      setIsAccountModalOpen(true);
      return { success: true };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: cleanName,
      email: cleanEmail || `${cleanDigits}@whatsapp.megatrol`,
      phone: cleanPhone || undefined,
      provider: cleanPhone ? 'whatsapp' : 'email',
      orders: [],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsersDb(users);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    setIsAccountModalOpen(true);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAccountModalOpen(false);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  };

  const updateProfile = (data: Partial<Pick<User, 'name' | 'phone' | 'address'>>) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      ...data,
      address: data.address ? { ...currentUser.address, ...data.address } as UserAddress : currentUser.address
    };
    setCurrentUser(updated);
  };

  const addOrder = (order: OrderRecord) => {
    if (!currentUser) return;
    const updatedOrders = [order, ...(currentUser.orders || [])];
    const updated = {
      ...currentUser,
      orders: updatedOrders
    };
    setCurrentUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAuthModalOpen,
        isAccountModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        openAccountModal,
        closeAccountModal,
        login,
        register,
        logout,
        updateProfile,
        addOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
