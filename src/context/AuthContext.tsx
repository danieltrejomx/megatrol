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
  provider?: 'local' | 'google';
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
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: () => Promise<{ success: boolean }>;
  register: (name: string, email: string, password?: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, 'name' | 'phone' | 'address'>>) => void;
  addOrder: (order: OrderRecord) => void;
}

const DEMO_USER: User = {
  id: 'usr_demo_101',
  name: 'Carlos Mendoza',
  email: 'carlos.mendoza@ejemplo.com',
  phone: '55 1234 5678',
  provider: 'local',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  address: {
    calle: 'Av. Insurgentes Sur 1602, Int. 4B',
    colonia: 'Crédito Constructor',
    ciudad: 'Benito Juárez',
    estado: 'Ciudad de México',
    cp: '03940'
  },
  orders: [
    {
      orderNumber: 'MEG-849201',
      customerName: 'Carlos Mendoza',
      email: 'carlos.mendoza@ejemplo.com',
      phone: '55 1234 5678',
      total: 320,
      shipping: 0,
      paymentMethod: 'card',
      status: 'Confirmado',
      date: '5 de septiembre de 2026',
      items: [
        {
          name: 'Megatrol Ungüento 100g',
          qty: 1,
          price: 320,
          variant: 'Tubo 100g'
        }
      ],
      address: {
        calle: 'Av. Insurgentes Sur 1602, Int. 4B',
        colonia: 'Crédito Constructor',
        ciudad: 'Benito Juárez',
        estado: 'Ciudad de México',
        cp: '03940'
      }
    }
  ],
  createdAt: '2026-08-15T10:00:00.000Z'
};

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

  // Load registered users array from localStorage or initialize with demo user
  const getUsersDb = (): User[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    const initial = [DEMO_USER];
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(initial));
    return initial;
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

  const login = async (email: string, _password?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Por favor ingresa un correo electrónico válido' };
    }

    const users = getUsersDb();
    const found = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (found) {
      setCurrentUser(found);
      setIsAuthModalOpen(false);
      setIsAccountModalOpen(true);
      return { success: true };
    }

    // If not found in DB, seamlessly create an account for them so they are never blocked
    const namePart = cleanEmail.split('@')[0];
    const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: capitalizedName,
      email: cleanEmail,
      provider: 'local',
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

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    // Simulated Google OAuth login with high-fidelity experience
    const googleUser: User = {
      id: 'usr_google_772',
      name: 'Dr. Alejandro Morales',
      email: 'alejandro.morales.vet@gmail.com',
      phone: '55 9876 5432',
      provider: 'google',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      address: {
        calle: 'Av. Paseo de las Palmas 745',
        colonia: 'Lomas de Chapultepec',
        ciudad: 'Miguel Hidalgo',
        estado: 'Ciudad de México',
        cp: '11000'
      },
      orders: [
        {
          orderNumber: 'MEG-618490',
          customerName: 'Dr. Alejandro Morales',
          email: 'alejandro.morales.vet@gmail.com',
          phone: '55 9876 5432',
          total: 1280,
          shipping: 0,
          paymentMethod: 'card',
          status: 'Entregado',
          date: '28 de agosto de 2026',
          items: [
            {
              name: 'Megatrol Jabón Barra 100g',
              qty: 4,
              price: 180,
              variant: 'Aroma Original'
            },
            {
              name: 'Megatrol Ungüento 250g',
              qty: 1,
              price: 560,
              variant: 'Tarro 250g'
            }
          ],
          address: {
            calle: 'Av. Paseo de las Palmas 745',
            colonia: 'Lomas de Chapultepec',
            ciudad: 'Miguel Hidalgo',
            estado: 'Ciudad de México',
            cp: '11000'
          }
        }
      ],
      createdAt: '2026-08-01T12:00:00.000Z'
    };

    const users = getUsersDb();
    const existing = users.find(u => u.email === googleUser.email);
    if (existing) {
      setCurrentUser(existing);
    } else {
      users.push(googleUser);
      saveUsersDb(users);
      setCurrentUser(googleUser);
    }

    setIsAuthModalOpen(false);
    setIsAccountModalOpen(true);
    return { success: true };
  };

  const loginAsDemo = async (): Promise<{ success: boolean }> => {
    setCurrentUser(DEMO_USER);
    setIsAuthModalOpen(false);
    setIsAccountModalOpen(true);
    return { success: true };
  };

  const register = async (name: string, email: string, _password?: string, phone?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName) {
      return { success: false, error: 'Por favor ingresa tu nombre completo' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Por favor ingresa un correo electrónico válido' };
    }

    const users = getUsersDb();
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === cleanEmail);

    // If an account already exists with this email, seamlessly update with the new name and log in
    if (existingIndex >= 0) {
      users[existingIndex].name = cleanName;
      if (phone?.trim()) {
        users[existingIndex].phone = phone.trim();
      }
      saveUsersDb(users);
      setCurrentUser(users[existingIndex]);
      setIsAuthModalOpen(false);
      setIsAccountModalOpen(true);
      return { success: true };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: phone?.trim(),
      provider: 'local',
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
        loginWithGoogle,
        loginAsDemo,
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
