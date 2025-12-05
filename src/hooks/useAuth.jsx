import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // -------------------------------------
  // SIMULATED FRONT-END AUTH (TEMPORARY)
  // Replace with real backend later
  // -------------------------------------
  useEffect(() => {
    const savedSession = localStorage.getItem("session");
    const savedUser = localStorage.getItem("user");

    if (savedSession && savedUser) {
      setSession(JSON.parse(savedSession));
      const u = JSON.parse(savedUser);
      setUser(u);

      // Check admin role (temp)
      setIsAdmin(u.role === "admin");
    }

    setIsLoading(false);
  }, []);

  const signIn = async (email, password) => {
    // TODO: Replace with backend API
    if (!email || !password) {
      return { error: new Error("Email and password required") };
    }

    // Mock user
    const fakeUser = {
      id: "123",
      email,
      role: email.includes("admin") ? "admin" : "user",
      fullName: "Temp User",
    };

    const fakeSession = {
      access_token: "mock_token_123",
      user: fakeUser,
    };

    localStorage.setItem("user", JSON.stringify(fakeUser));
    localStorage.setItem("session", JSON.stringify(fakeSession));

    setUser(fakeUser);
    setSession(fakeSession);
    setIsAdmin(fakeUser.role === "admin");

    return { error: null };
  };

  const signUp = async (email, password, fullName) => {
    // TODO: Replace with backend API
    if (!email || !password || !fullName) {
      return { error: new Error("All fields are required") };
    }

    // No actual account creation (frontend only)
    return { error: null };
  };

  const signOut = async () => {
    localStorage.removeItem("user"); 
    localStorage.removeItem("session");

    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        isLoading,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
