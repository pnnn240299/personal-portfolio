'use client'

import { useEffect, useState } from "react";
import restApiProvider from "../providers/restApiProvider";

const useDataCRUD = (tableName) => {
  const provider = restApiProvider(tableName);

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
      const result = await provider.getItem(id);
      return result;
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
      return newItem;
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
      return updated;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id, field) => {
    setLoading(true);
    try {
      await provider.deleteItem(id, field);
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
