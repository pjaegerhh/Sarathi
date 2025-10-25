import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Helper function to get user from Supabase and KV store
async function getUserWithRole(userId: string) {
  const userData = await kv.get(`user:${userId}`);
  return userData;
}

// Auth routes
app.post('/make-server-0bbbe2a5/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // Auto-confirm since email server not configured
    });

    if (authError) {
      console.error('Supabase auth error during signup:', authError);
      return c.json({ message: authError.message }, 400);
    }

    // Store user data in KV store with Guest role (pending approval)
    const user = {
      id: authData.user.id,
      email: authData.user.email,
      name,
      role: 'Guest' as const,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`user:${authData.user.id}`, user);

    // Generate access token
    const { data: { session }, error: sessionError } = await supabase.auth.admin.createSession({
      user_id: authData.user.id,
    });

    if (sessionError) {
      console.error('Session creation error during signup:', sessionError);
      return c.json({ message: sessionError.message }, 400);
    }

    return c.json({
      user,
      accessToken: session?.access_token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ message: 'Signup failed' }, 500);
  }
});

app.post('/make-server-0bbbe2a5/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Supabase auth error during login:', error);
      return c.json({ message: error.message }, 400);
    }

    // Get user data from KV store
    const user = await getUserWithRole(data.user.id);

    if (!user) {
      return c.json({ message: 'User data not found' }, 404);
    }

    return c.json({
      user,
      accessToken: data.session.access_token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ message: 'Login failed' }, 500);
  }
});

app.post('/make-server-0bbbe2a5/auth/magic-link', async (c) => {
  try {
    const { phone } = await c.req.json();

    // Note: Magic link via phone requires phone auth to be configured in Supabase
    // This is a placeholder implementation
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) {
      console.error('Magic link error:', error);
      return c.json({ message: error.message }, 400);
    }

    return c.json({ message: 'Magic link sent successfully' });
  } catch (error) {
    console.error('Magic link error:', error);
    return c.json({ message: 'Failed to send magic link' }, 500);
  }
});

app.get('/make-server-0bbbe2a5/auth/me', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ message: 'Unauthorized' }, 401);
    }

    const { data: { user: authUser }, error } = await supabase.auth.getUser(accessToken);

    if (error || !authUser) {
      console.error('Get user error:', error);
      return c.json({ message: 'Unauthorized' }, 401);
    }

    const user = await getUserWithRole(authUser.id);

    if (!user) {
      return c.json({ message: 'User data not found' }, 404);
    }

    return c.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ message: 'Failed to get user' }, 500);
  }
});

// Admin routes
app.get('/make-server-0bbbe2a5/admin/users', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ message: 'Unauthorized' }, 401);
    }

    const { data: { user: authUser }, error } = await supabase.auth.getUser(accessToken);
    if (error || !authUser) {
      return c.json({ message: 'Unauthorized' }, 401);
    }

    const currentUser = await getUserWithRole(authUser.id);
    if (!currentUser || (currentUser.role !== 'Admin' && currentUser.role !== 'ContentModerator')) {
      return c.json({ message: 'Forbidden: Admin or Content Moderator access required' }, 403);
    }

    // Get all users from KV store
    const allUsers = await kv.getByPrefix('user:');
    return c.json({ users: allUsers });
  } catch (error) {
    console.error('Get users error:', error);
    return c.json({ message: 'Failed to get users' }, 500);
  }
});

app.post('/make-server-0bbbe2a5/admin/users/:userId/activate', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ message: 'Unauthorized' }, 401);
    }

    const { data: { user: authUser }, error } = await supabase.auth.getUser(accessToken);
    if (error || !authUser) {
      return c.json({ message: 'Unauthorized' }, 401);
    }

    const currentUser = await getUserWithRole(authUser.id);
    if (!currentUser || (currentUser.role !== 'Admin' && currentUser.role !== 'ContentModerator')) {
      return c.json({ message: 'Forbidden: Admin or Content Moderator access required' }, 403);
    }

    const userId = c.req.param('userId');
    const user = await kv.get(`user:${userId}`);

    if (!user) {
      return c.json({ message: 'User not found' }, 404);
    }

    // Update user status and role
    const updatedUser = {
      ...user,
      role: 'User' as const,
      status: 'active' as const,
    };

    await kv.set(`user:${userId}`, updatedUser);

    return c.json({ user: updatedUser });
  } catch (error) {
    console.error('Activate user error:', error);
    return c.json({ message: 'Failed to activate user' }, 500);
  }
});

app.post('/make-server-0bbbe2a5/admin/users/:userId/deactivate', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ message: 'Unauthorized' }, 401);
    }

    const { data: { user: authUser }, error } = await supabase.auth.getUser(accessToken);
    if (error || !authUser) {
      return c.json({ message: 'Unauthorized' }, 401);
    }

    const currentUser = await getUserWithRole(authUser.id);
    if (!currentUser || (currentUser.role !== 'Admin' && currentUser.role !== 'ContentModerator')) {
      return c.json({ message: 'Forbidden: Admin or Content Moderator access required' }, 403);
    }

    const userId = c.req.param('userId');
    const user = await kv.get(`user:${userId}`);

    if (!user) {
      return c.json({ message: 'User not found' }, 404);
    }

    // Update user status
    const updatedUser = {
      ...user,
      status: 'inactive' as const,
    };

    await kv.set(`user:${userId}`, updatedUser);

    return c.json({ user: updatedUser });
  } catch (error) {
    console.error('Deactivate user error:', error);
    return c.json({ message: 'Failed to deactivate user' }, 500);
  }
});

app.post('/make-server-0bbbe2a5/admin/users/:userId/role', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ message: 'Unauthorized' }, 401);
    }

    const { data: { user: authUser }, error } = await supabase.auth.getUser(accessToken);
    if (error || !authUser) {
      return c.json({ message: 'Unauthorized' }, 401);
    }

    const currentUser = await getUserWithRole(authUser.id);
    if (!currentUser || currentUser.role !== 'Admin') {
      return c.json({ message: 'Forbidden: Admin access required' }, 403);
    }

    const userId = c.req.param('userId');
    const { role } = await c.req.json();

    if (!['Admin', 'ContentModerator', 'User', 'Guest'].includes(role)) {
      return c.json({ message: 'Invalid role' }, 400);
    }

    const user = await kv.get(`user:${userId}`);

    if (!user) {
      return c.json({ message: 'User not found' }, 404);
    }

    // Update user role
    const updatedUser = {
      ...user,
      role,
    };

    await kv.set(`user:${userId}`, updatedUser);

    return c.json({ user: updatedUser });
  } catch (error) {
    console.error('Update user role error:', error);
    return c.json({ message: 'Failed to update user role' }, 500);
  }
});

// Health check
app.get('/make-server-0bbbe2a5/health', (c) => {
  return c.json({ status: 'ok' });
});

Deno.serve(app.fetch);
