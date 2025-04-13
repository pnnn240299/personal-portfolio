import { useEffect, useState } from "react";
import providers from "../providers";

const useDataCRUD = (tableName, optionsOrModel = {}) => {
  const providerKey = optionsOrModel?.provider || import.meta.env.REACT_APP_DATA_PROVIDER || "supabase";
  const providerFn = providers[providerKey];

  if (!providerFn) {
    throw new Error(`Unknown provider: ${providerKey}`);
  }

  // Nếu là supabase thì dùng projectModel (full config), còn provider khác thì bỏ qua các field như select, filters...
  let providerOptions = {};
  if (providerKey === "supabase") {
    providerOptions = optionsOrModel; // full config từ model
  }

  const provider = providerFn(tableName, providerOptions);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await provider.fetchData();
      setData(result);
    } catch (err) {
      setError(err.message || err.toString());
    } finally {
      setLoading(false);
    }
  };

  const getItem = async (id) => {
    try {
      return await provider.getItem(id);
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const createItem = async (item) => {
    setLoading(true);
    try {
      const newItem = await provider.createItem(item);
      setData((prev) => [...prev, newItem]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, newItem) => {
    setLoading(true);
    try {
      const updated = await provider.updateItem(id, newItem);
      setData((prev) => prev.map((item) => (item.id === id ? updated : item)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      await provider.deleteItem(id);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, fetchData, getItem, createItem, updateItem, deleteItem };
};

export default useDataCRUD; 
