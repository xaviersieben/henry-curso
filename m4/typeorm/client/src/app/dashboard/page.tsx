'use client';

import React, { useEffect, useState } from 'react';
import { userSession } from '@/types';
import Image from 'next/image';

// Componente principal del Dashboard
const Dashboard = () => {
  const [userData, setUserData] = useState<userSession | null>(null);

  // Cargar datos de usuario desde localStorage
  useEffect(() => {
    const fetchUserData = () => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const storedUserData = localStorage.getItem('userSession');
          if (storedUserData) {
            setUserData(JSON.parse(storedUserData) as userSession);
          }
        }
      } catch (error) {
        console.error('Error reading user data from localStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-300 border-2 border-black py-10 md:py-20 px-3">
      <div className="max-w-lg mx-auto">
        <UserProfile user={userData?.userData} />
      </div>
    </div>
  );
};

// Componente para el perfil del usuario
const UserProfile: React.FC<{ user?: userSession['userData'] }> = ({ user }) => {
  if (!user) {
    return (
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <p className="text-gray-600">No user data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex justify-center">
        <Image
          className="rounded-full"
          src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
          alt="User avatar"
          width="100"
          height="100"
        />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-2xl mt-2">Welcome {user.name}</h1>
        <UserDetails user={user} />
      </div>
    </div>
  );
};

// Componente para los detalles del usuario
const UserDetails: React.FC<{ user: userSession['userData'] }> = ({ user }) => (
  <div className="flex flex-col md:flex-row justify-between mt-6 px-4 space-y-4 md:space-y-0">
    <UserDetail label="Address" value={user.address} />
    <UserDetail label="Email" value={user.email} />
    <UserDetail label="Phone" value={user.phone} />
  </div>
);

// Componente para un solo detalle del usuario
const UserDetail: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="font-bold text-lg">{value || 'N/A'}</span>
    <span className="text-sm text-blue-800">{label}</span>
  </div>
);

export default Dashboard;
