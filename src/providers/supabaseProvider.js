import supabase from "../lib/supabaseClient";

export const supabaseProvider = (tableName, options = {}) => {
    const { select = "*", filters = [], order = {} } = options;

    return {
        fetchData: async () => {
            let query = supabase.from(tableName).select(select);
            filters.forEach((f) => {
                query = query.eq(f.column, f.value);
            });
            if (order?.column) {
                query = query.order(order.column, { ascending: order.ascending });
            }
            const { data, error } = await query;
            if (error) throw error;
            return data;
        },

        getItem: async (id) => {
            const { data, error } = await supabase.from(tableName).select(select).eq("id", id).single();
            if (error) throw error;
            return data;
        },

        createItem: async (items) => {
            const isArray = Array.isArray(items);
            const payload = isArray ? items : [items];
            const { data, error } = await supabase.from(tableName).insert(payload).select();
            if (error) throw error;

            return isArray ? data : data[0]; // Trả về mảng nếu truyền mảng, ngược lại thì 1 object
        },

        updateItem: async (id, newItem) => {
            const { data, error } = await supabase.from(tableName).update(newItem).eq("id", id).select();
            if (error) throw error;
            return data[0];
        },

        deleteItem: async (id, field) => {
            const { error } = await supabase.from(tableName).delete().eq(field, id);
            if (error) throw error;
            return true;
        },
    };
};
