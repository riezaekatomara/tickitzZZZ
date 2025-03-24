// localStorageUtils.js

/**
 * Menyimpan data pengguna ke Local Storage.
 * @param {Object} userData - Data pengguna yang akan disimpan.
 */
export const saveUserDataToLocalStorage = (userData) => {
  try {
    const serializedUserData = JSON.stringify(userData);
    localStorage.setItem("userData", serializedUserData);
  } catch (error) {
    console.error("Gagal menyimpan data ke Local Storage:", error);
  }
};

/**
 * Mengambil data pengguna dari Local Storage.
 * @returns {Object|null} Data pengguna yang diambil, atau null jika tidak ada.
 */
export const getUserDataFromLocalStorage = () => {
  try {
    const serializedUserData = localStorage.getItem("userData");
    if (serializedUserData === null) {
      return null;
    }
    return JSON.parse(serializedUserData);
  } catch (error) {
    console.error("Gagal mengambil data dari Local Storage:", error);
    return null;
  }
};

/**
 * Menghapus data pengguna dari Local Storage.
 */
export const clearUserDataFromLocalStorage = () => {
  try {
    localStorage.removeItem("userData");
  } catch (error) {
    console.error("Gagal menghapus data dari Local Storage:", error);
  }
};