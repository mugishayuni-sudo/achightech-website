// API Helper Functions

// Generic fetch handler with error handling
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: API_CONFIG.TIMEOUT,
        };

        // Add authorization token if it exists
        const token = getAuthToken();
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        // Add body for non-GET requests
        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(getApiUrl(endpoint), options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'API request failed');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ============= AUTHENTICATION APIs =============

async function adminLogin(email, password) {
    try {
        const response = await apiCall('/auth/login', 'POST', {
            email,
            password,
        });

        if (response.success) {
            setAuthToken(response.token);
            setCurrentUser(response.user);
            return response;
        }
        throw new Error(response.message);
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

async function adminLogout() {
    clearAuthToken();
    clearCurrentUser();
}

async function getAdminProfile() {
    try {
        const response = await apiCall('/auth/profile', 'GET');
        return response.user;
    } catch (error) {
        console.error('Profile fetch error:', error);
        throw error;
    }
}

// ============= CONTACT APIs =============

async function submitContactForm(contactData) {
    try {
        const response = await apiCall('/contacts/submit', 'POST', contactData);
        return response;
    } catch (error) {
        console.error('Contact form submission error:', error);
        throw error;
    }
}

async function getContacts(limit = 50, offset = 0) {
    try {
        const response = await apiCall(`/contacts?limit=${limit}&offset=${offset}`, 'GET');
        return response.contacts;
    } catch (error) {
        console.error('Get contacts error:', error);
        throw error;
    }
}

async function getContactById(id) {
    try {
        const response = await apiCall(`/contacts/${id}`, 'GET');
        return response.contact;
    } catch (error) {
        console.error('Get contact error:', error);
        throw error;
    }
}

async function updateContactStatus(id, status) {
    try {
        const response = await apiCall(`/contacts/${id}/status`, 'PATCH', { status });
        return response;
    } catch (error) {
        console.error('Update contact status error:', error);
        throw error;
    }
}

async function deleteContact(id) {
    try {
        const response = await apiCall(`/contacts/${id}`, 'DELETE');
        return response;
    } catch (error) {
        console.error('Delete contact error:', error);
        throw error;
    }
}

// ============= BOOKING APIs =============

async function createBooking(bookingData) {
    try {
        const response = await apiCall('/bookings', 'POST', bookingData);
        return response;
    } catch (error) {
        console.error('Booking creation error:', error);
        throw error;
    }
}

async function getBookings(limit = 50, offset = 0, status = null) {
    try {
        let endpoint = `/bookings?limit=${limit}&offset=${offset}`;
        if (status) {
            endpoint += `&status=${status}`;
        }
        const response = await apiCall(endpoint, 'GET');
        return response.bookings;
    } catch (error) {
        console.error('Get bookings error:', error);
        throw error;
    }
}

async function getBookingById(id) {
    try {
        const response = await apiCall(`/bookings/${id}`, 'GET');
        return response.booking;
    } catch (error) {
        console.error('Get booking error:', error);
        throw error;
    }
}

async function updateBooking(id, bookingData) {
    try {
        const response = await apiCall(`/bookings/${id}`, 'PUT', bookingData);
        return response;
    } catch (error) {
        console.error('Update booking error:', error);
        throw error;
    }
}

async function updateBookingStatus(id, status) {
    try {
        const response = await apiCall(`/bookings/${id}/status`, 'PATCH', { status });
        return response;
    } catch (error) {
        console.error('Update booking status error:', error);
        throw error;
    }
}

async function deleteBooking(id) {
    try {
        const response = await apiCall(`/bookings/${id}`, 'DELETE');
        return response;
    } catch (error) {
        console.error('Delete booking error:', error);
        throw error;
    }
}

async function getCustomerBookings(customerId, limit = 50, offset = 0) {
    try {
        const response = await apiCall(`/bookings/customer/${customerId}?limit=${limit}&offset=${offset}`, 'GET');
        return response.bookings;
    } catch (error) {
        console.error('Get customer bookings error:', error);
        throw error;
    }
}

// ============= CUSTOMER APIs =============

async function getCustomers(limit = 50, offset = 0) {
    try {
        const response = await apiCall(`/customers?limit=${limit}&offset=${offset}`, 'GET');
        return response.customers;
    } catch (error) {
        console.error('Get customers error:', error);
        throw error;
    }
}

async function getCustomerById(id) {
    try {
        const response = await apiCall(`/customers/${id}`, 'GET');
        return response.customer;
    } catch (error) {
        console.error('Get customer error:', error);
        throw error;
    }
}

async function updateCustomer(id, customerData) {
    try {
        const response = await apiCall(`/customers/${id}`, 'PUT', customerData);
        return response;
    } catch (error) {
        console.error('Update customer error:', error);
        throw error;
    }
}

async function deleteCustomer(id) {
    try {
        const response = await apiCall(`/customers/${id}`, 'DELETE');
        return response;
    } catch (error) {
        console.error('Delete customer error:', error);
        throw error;
    }
}
