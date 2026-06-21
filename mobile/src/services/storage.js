import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token) => {
  await AsyncStorage.setItem('authToken', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const clearToken = async () => {
  await AsyncStorage.removeItem('authToken');
};

export const saveUser = async (user) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async () => {
  const userStr = await AsyncStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const clearUser = async () => {
  await AsyncStorage.removeItem('user');
};
