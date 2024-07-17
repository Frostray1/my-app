import axios from 'axios';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const logout = async () => {
  try {
    await axios.post('http://localhost:5000/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (error) {
    throw new Error('Logout failed');
  }
};
