// src/services/auth.service.ts
import { apiFetch } from './api';

export const authService = {
  /**
   * Envía los datos de registro corporativo al Backend Core
   */
  registerVendor: async (vendorData: Object) => {
    return await apiFetch('/auth/register-vendedor', {
      method: 'POST',
      body: JSON.stringify(vendorData),
    });
  },
};
