const API_BASE = import.meta.env.VITE_API_URL || '';

function getToken() {
  return localStorage.getItem('scoremax_token');
}

export async function api(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/api${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const authApi = {
  login: (body) => api('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => api('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  me: () => api('/auth/me'),
};

export const coursesApi = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return api(`/courses${q ? `?${q}` : ''}`);
  },
  get: (slug) => api(`/courses/${slug}`),
};

export const tutorsApi = { list: () => api('/tutors') };

export const bookingsApi = {
  createDemo: (body) => api('/bookings/demo', { method: 'POST', body: JSON.stringify(body) }),
  listDemo: () => api('/bookings/demo'),
  updateDemo: (id, body) => api(`/bookings/demo/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
};

export const studentsApi = {
  progress: (id) => api(`/students/${id}/progress`),
};

export const adminApi = {
  analytics: () => api('/admin/analytics'),
  users: () => api('/admin/users'),
  deleteUser: (id) => api(`/admin/users/${id}`, { method: 'DELETE' }),
  createCourse: (body) => api('/courses', { method: 'POST', body: JSON.stringify(body) }),
  updateCourse: (id, body) => api(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteCourse: (id) => api(`/courses/${id}`, { method: 'DELETE' }),
};
