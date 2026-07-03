// lib/firebase-hooks.js
// Hooks úteis para trabalhar com Firebase no Next.js

import { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Hook para buscar dados de um usuário no Firestore
 * @param {string} userId - ID do usuário (Discord ID)
 */
export const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          setError('Usuário não encontrado');
        }
      } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

/**
 * Hook para listar todos os usuários (apenas de leitura pública)
 */
export const useAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);

        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setUsers(usersList);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

/**
 * Função para salvar dados personalizados do usuário
 * @param {string} userId - ID do usuário
 * @param {object} data - Dados a salvar
 */
export const saveUserData = async (userId, data) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (err) {
    console.error('Erro ao salvar dados:', err);
    return { success: false, error: err.message };
  }
};
