// src/app/auth/register/page.tsx
'use client'; // Le dice a Next.js que este componente maneja estados del cliente (React)

import { useState } from 'react';
import { authService } from '@/services/auth.service';

export default function RegisterVendorPage() {
  // Estado estructurado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    documentoIdentidad: '', // Requisito del comprador/dueño
    nombreComercial: '',
    documentoFiscal: '',    // NIT / RUT de la empresa
    telefono: '',
  });

  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await authService.registerVendor(formData);
      setStatus({ success: true, message: response.message });
    } catch (error: any) {
      setStatus({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Crea tu cuenta corporativa
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Comienza a vender tus productos en nuestro Marketplace
        </p>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* SECCIÓN 1: DATOS PERSONALES DEL ADMINISTRADOR */}
            <h3 className="text-lg font-medium text-blue-600 border-b pb-2">1. Datos del Representante</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" name="nombre" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 border focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Apellido</label>
                <input type="text" name="apellido" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 border" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input type="email" name="email" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Documento de Identidad</label>
                <input type="text" name="documentoIdentidad" placeholder="Cédula o Pasaporte" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 border" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña de acceso</label>
              <input type="password" name="password" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 border" />
            </div>

            {/* SECCIÓN 2: DATOS DE LA EMPRESA */}
            <h3 className="text-lg font-medium text-blue-600 border-b pb-2 mt-4">2. Información de la Tienda</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre Comercial de la Empresa</label>
              <input type="text" name="nombreComercial" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 border" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Documento Fiscal (NIT / RUT)</label>
                <input type="text" name="documentoFiscal" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono Corporativo</label>
                <input type="text" name="telefono" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 border" />
              </div>
            </div>

            {/* FEEDBACK DE ESTADO */}
            {status && (
              <div className={`p-4 rounded-md text-sm font-medium ${status.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {status.message}
              </div>
            )}

            <div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                {loading ? 'Procesando registro...' : 'Registrar Empresa'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
