const API_URL = 'http://localhost:5000/api';


export async function signup(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({ email, password }), 
  });

  const data = await response.json(); 

  
  if (!response.ok) {
    throw new Error(data.message || 'Signup failed'); 
  }

  return data; 
}


export async function login(email: string, password: string) {
  
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data; 
}