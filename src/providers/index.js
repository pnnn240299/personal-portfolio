// Tự động import toàn bộ provider trong thư mục này (tương thích với Vite)
const modules = import.meta.glob("./*Provider.js", { eager: true });

const providers = {};

for (const path in modules) {
  const module = modules[path];
  // Lấy tên file, ví dụ "./supabaseProvider.js" => "supabase"
  const providerName = path
    .replace("./", "")
    .replace("Provider.js", "")
    .toLowerCase();
  providers[providerName] = module.default || module[Object.keys(module)[0]];
}

export default providers;
