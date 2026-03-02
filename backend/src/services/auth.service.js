import bcrypt from 'bcryptjs';
import { runSupabaseOperation } from '../config/supabaseClient.js';
import { AppError } from '../utils/AppError.js';
import { generateToken } from '../utils/jwt.js';

const USERS_TABLE = 'users';

const createAuthPayload = (user) => {
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = generateToken(safeUser);

  return {
    token,
    user: safeUser,
  };
};

export const registerAdmin = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = name.trim();

  const { data: existingUser } = await runSupabaseOperation(
    (supabase) =>
      supabase
        .from(USERS_TABLE)
        .select('id')
        .eq('email', normalizedEmail)
        .maybeSingle(),
    'Check user by email',
  );

  if (existingUser) {
    throw new AppError('Email already in use', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const { data: createdUser } = await runSupabaseOperation(
    (supabase) =>
      supabase
        .from(USERS_TABLE)
        .insert([
          {
            name: normalizedName,
            email: normalizedEmail,
            password: hashedPassword,
            role: 'admin',
          },
        ])
        .select('id, name, email, role')
        .single(),
    'Create admin account',
  );

  return createAuthPayload(createdUser);
};

export const loginAdmin = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const { data: user } = await runSupabaseOperation(
    (supabase) =>
      supabase
        .from(USERS_TABLE)
        .select('id, name, email, password, role')
        .eq('email', normalizedEmail)
        .maybeSingle(),
    'Fetch user by email',
  );

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  if (user.role !== 'admin') {
    throw new AppError('Admin access required', 403);
  }

  return createAuthPayload(user);
};
