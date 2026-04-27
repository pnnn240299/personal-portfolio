export default function baseProvider() {
  return {
    fetchData: async () => {},
    getItem: async (id) => {},
    createItem: async (data) => {},
    updateItem: async (id, data) => {},
    deleteItem: async (id) => {},
  };
}