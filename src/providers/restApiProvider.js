const API_URL = import.meta.env.REACT_APP_API_URL || "";

export const restApiProvider = (tableName) => {
    return {
        fetchData: async () => {
            const res = await fetch(`${API_URL}/${tableName}`);
            if (!res.ok) throw new Error("Failed to fetch");
            return await res.json();
        },

        getItem: async (id) => {
            const res = await fetch(`${API_URL}/${tableName}/${id}`);
            if (!res.ok) throw new Error("Failed to fetch item");
            return await res.json();
        },

        createItem: async (item) => {
            const res = await fetch(`${API_URL}/${tableName}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            });
            if (!res.ok) throw new Error("Failed to create item");
            return await res.json();
        },

        updateItem: async (id, newItem) => {
            const res = await fetch(`${API_URL}/${tableName}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
            });
            if (!res.ok) throw new Error("Failed to update item");
            return await res.json();
        },

        deleteItem: async (id) => {
            const res = await fetch(`${API_URL}/${tableName}/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete item");
            return true;
        },
    };
};
