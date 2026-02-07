import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { Shield, Users, CheckCircle, XCircle } from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  userType: string;
  status: 'active' | 'inactive' | 'pending';
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('sarathi_user')
        .select('uuid, email, name, user_type')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Map to AdminUser format
      const mappedUsers: AdminUser[] = (data || []).map(u => ({
        id: u.uuid,
        email: u.email,
        name: u.name,
        userType: u.user_type,
        status: 'active', // For now, all users are active. You can add a status field later
      }));

      setUsers(mappedUsers);
    } catch (error: unknown) {
      console.error('Error fetching users:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Check if user has admin or superadmin access (after all hooks)
  if (!user || (user.userType !== 'admin' && user.userType !== 'superadmin')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-destructive">
              {t.common.error}
            </CardTitle>
            <CardDescription className="text-center">
              Forbidden: Admin or Superadmin access required
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

  const changeUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('sarathi_user')
        .update({ user_type: newRole })
        .eq('uuid', userId);

      if (error) {
        throw error;
      }

      toast.success('Role updated successfully');
      fetchUsers();
    } catch (error: unknown) {
      console.error('Error updating user role:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update user role');
    }
  };

  const activeUsers = users.filter(u => u.status === 'active');
  const pendingUsers = users.filter(u => u.status === 'pending');

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
                {user.userType}
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
                      <TableCell>{u.name || 'N/A'}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        {user.userType === 'admin' || user.userType === 'superadmin' ? (
                          <Select
                            value={u.userType}
                            onValueChange={(value) => changeUserRole(u.id, value)}
                            disabled={u.id === user.id}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="amputee">Amputee</SelectItem>
                              <SelectItem value="caregiver">Caregiver</SelectItem>
                              <SelectItem value="doctor">Doctor</SelectItem>
                              <SelectItem value="practitioner">Practitioner</SelectItem>
                              <SelectItem value="volunteer">Volunteer</SelectItem>
                              <SelectItem value="moderator">Moderator</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              {user.userType === 'superadmin' && (
                                <SelectItem value="superadmin">Superadmin</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge>{u.userType}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={u.status === 'active' ? 'default' : 'outline'}>
                          {u.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        {/* Future: Add activate/deactivate functionality */}
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
