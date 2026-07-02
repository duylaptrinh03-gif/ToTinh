import { defaultData, DefaultData } from "../data/defaultData";

const STORAGE_KEY = "proposal_website_data_v126";

export const localStorageService = {
  get: (): DefaultData => {
    if (typeof window === "undefined") return defaultData;
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (item) {
        const parsed = JSON.parse(item);
        // Merge with defaultData to ensure new fields (like videos) exist
        return { ...defaultData, ...parsed } as DefaultData;
      }
      return defaultData;
    } catch (error) {
      console.warn("Error reading from localStorage", error);
      return defaultData;
    }
  },
  
  set: (data: Partial<DefaultData>) => {
    if (typeof window === "undefined") return;
    try {
      const currentData = localStorageService.get();
      const newData = { ...currentData, ...data };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (error) {
      console.warn("Error writing to localStorage", error);
    }
  },

  remove: () => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Error removing from localStorage", error);
    }
  },

  clear: () => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.clear();
    } catch (error) {
      console.warn("Error clearing localStorage", error);
    }
  },

  initialize: () => {
    if (typeof window === "undefined") return;
    const item = window.localStorage.getItem(STORAGE_KEY);
    if (!item) {
      localStorageService.set(defaultData);
    }
  },

  migrate: () => {
    // Implement any future data migrations here
    localStorageService.initialize();
  }
};
