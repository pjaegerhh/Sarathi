import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth, User } from '../contexts/AuthContext';
import { projectId } from '../utils/supabase/info';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { Shield, Users, CheckCircle, XCircle } from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { t } = useLanguage();
  const { user, accessToken, refreshUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if user has admin or content moderator access
  if (!user || (user.role !== 'Admin' && user.role !== 'ContentModerator')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-destructive">
              {t.common.error}
            </CardTitle>
            <CardDescription className="text-center">
              Forbidden: Admin or Content Moderator access required
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => onNavigate('home')}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0bbbe2a5/admin/users`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error(error.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const activateUser = async (userId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0bbbe2a5/admin/users/${userId}/activate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to activate user');
      }

      toast.success(t.admin.activateUser);
      fetchUsers();
      
      // Refresh current user data if they activated themselves
      if (userId === user.id) {
        await refreshUser();
      }
    } catch (error: any) {
      console.error('Error activating user:', error);
      toast.error(error.message || 'Failed to activate user');
    }
  };

  const deactivateUser = async (userId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0bbbe2a5/admin/users/${userId}/deactivate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to deactivate user');
      }

      toast.success(t.admin.deactivateUser);
      fetchUsers();
    } catch (error: any) {
      console.error('Error deactivating user:', error);
      toast.error(error.message || 'Failed to deactivate user');
    }
  };

  const changeUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0bbbe2a5/admin/users/${userId}/role`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      toast.success('Role updated successfully');
      fetchUsers();
    } catch (error: any) {
      console.error('Error updating user role:', error);
      toast.error(error.message || 'Failed to update user role');
    }
  };

  const pendingUsers = users.filter(u => u.status === 'pending');
  const activeUsers = users.filter(u => u.status === 'active');

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="text-primary" size={32} />
            <div>
              <h1 className="text-3xl">{t.admin.title}</h1>
              <p className="text-sm text-muted-foreground">
                {t.roles[user.role.toLowerCase() as keyof typeof t.roles]}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={() => onNavigate('home')}>
            {t.nav.home}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Users</CardTitle>
              <Users className="text-muted-foreground" size={16} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">{t.admin.pendingApprovals}</CardTitle>
              <XCircle className="text-destructive" size={16} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{pendingUsers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Active Users</CardTitle>
              <CheckCircle className="text-secondary" size={16} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{activeUsers.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals */}
        {pendingUsers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t.admin.pendingApprovals}</CardTitle>
              <CardDescription>
                Users waiting for approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>{t.admin.status}</TableHead>
                    <TableHead>{t.admin.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{u.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => activateUser(u.id)}
                        >
                          {t.admin.activateUser}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>{t.admin.userManagement}</CardTitle>
            <CardDescription>
              Manage all users and their roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">{t.common.loading}</div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No users found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>{t.admin.status}</TableHead>
                    <TableHead>{t.admin.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        {user.role === 'Admin' ? (
                          <Select
                            value={u.role}
                            onValueChange={(value) => changeUserRole(u.id, value)}
                            disabled={u.id === user.id}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Guest">Guest</SelectItem>
                              <SelectItem value="User">User</SelectItem>
                              <SelectItem value="ContentModerator">Content Moderator</SelectItem>
                              <SelectItem value="Admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge>{u.role}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={u.status === 'active' ? 'default' : 'outline'}>
                          {u.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        {u.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => activateUser(u.id)}
                          >
                            Activate
                          </Button>
                        )}
                        {u.status === 'active' && u.id !== user.id && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deactivateUser(u.id)}
                          >
                            Deactivate
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
