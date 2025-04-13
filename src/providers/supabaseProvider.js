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
            // console.log(data, 'nhan');
            if (error) throw error;
            return data;
        },

        getItem: async (id) => {
            const { data, error } = await supabase.from(tableName).select("*").eq("id", id).single();
            if (error) throw error;
            return data;
        },

        createItem: async (item) => {
            const { data, error } = await supabase.from(tableName).insert([item]);
            if (error) throw error;
            return data[0];
        },

        updateItem: async (id, newItem) => {
            const { data, error } = await supabase.from(tableName).update(newItem).eq("id", id);
            if (error) throw error;
            return data[0];
        },

        deleteItem: async (id) => {
            const { error } = await supabase.from(tableName).delete().eq("id", id);
            if (error) throw error;
            return true;
        },
    };
};
