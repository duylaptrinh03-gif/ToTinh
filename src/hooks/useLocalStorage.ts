"use client";

import { useState, useEffect, useCallback } from "react";
import { localStorageService } from "../services/localStorageService";
import { DefaultData } from "../data/defaultData";

export function useLocalStorage() {
  const [data, setDataState] = useState<DefaultData | null>(null);

  useEffect(() => {
    localStorageService.initialize();
    setDataState(localStorageService.get());
  }, []);

  const setData = useCallback((newData: Partial<DefaultData>) => {
    localStorageService.set(newData);
    setDataState(localStorageService.get());
  }, []);

  const getCustomKey = useCallback((key: string) => {
      if (typeof window === "undefined") return null;
      return window.localStorage.getItem(key);
  }, []);
  
  const setCustomKey = useCallback((key: string, value: string) => {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(key, value);
  }, []);

  return { data, setData, getCustomKey, setCustomKey };
}
