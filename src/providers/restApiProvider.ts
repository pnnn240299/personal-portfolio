export default function restApiProvider(table) {
  const baseUrl = `/api/${table}`;

  const request = async (url, init) => {
    const res = await fetch(url, init);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API request failed: ${res.status} ${res.statusText} - ${errorText}`);
    }
    return res.status === 204 ? null : res.json();
  };

  return {
    fetchData: async () => request(baseUrl),

    getItem: async (id) => request(`${baseUrl}/${id}`),

    createItem: async (data) =>
      request(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),

    updateItem: async (id, data) =>
      request(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),

    deleteItem: async (id) =>
      request(`${baseUrl}/${id}`, {
        method: 'DELETE',
      }),
  };
}