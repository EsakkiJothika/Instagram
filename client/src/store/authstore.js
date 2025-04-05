import { create } from 'zustand';

const useAuthstore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user-info")) || null,
    login: (userData) => set({ user: userData }),
    logout: () => {
      localStorage.removeItem("user-info");
      set({ user: null });
    },
    setUser: (user) => set({ user }),
  }));
  

export default useAuthstore;