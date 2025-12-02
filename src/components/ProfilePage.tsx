import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { User as UserIcon, Mail, Shield, Calendar, Edit, X, Plus, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { t } = useLanguage();
  const { user, logout, updateProfile } = useAuth();

  // Challenge and Activity label mappings using translations
  const getChallengeLabel = (id: string): string => {
    const challengeMap: Record<string, string> = {
      'fit_comfort': t.onboarding?.fitAndComfort || 'Fit and Comfort',
      'mobility': t.onboarding?.mobility || 'Mobility',
      'community': t.onboarding?.community || 'Community',
      'cost_access': t.onboarding?.costAndAccess || 'Cost and Access',
      'training': t.onboarding?.training || 'Training',
      'emotional': t.onboarding?.emotionalWellbeing || 'Emotional Well-being',
    };
    return challengeMap[id] || id;
  };

  const getActivityLabel = (id: string): string => {
    const activityMap: Record<string, string> = {
      'rehabilitation': t.onboarding?.rehabilitation || 'Rehabilitation',
      'social_life': t.onboarding?.socialLife || 'Social Life',
      'emotions': t.onboarding?.emotions || 'Emotions',
      'pain_relief': t.onboarding?.painRelief || 'Pain Relief',
      'work': t.onboarding?.work || 'Work',
      'independence': t.onboarding?.independence || 'Independence',
      'education': t.onboarding?.education || 'Education',
      'confidence': t.onboarding?.confidence || 'Confidence',
      'training': t.onboarding?.training || 'Training',
      'sports': t.onboarding?.sports || 'Sports',
      'guidance': t.onboarding?.guidance || 'Guidance',
      'community': t.onboarding?.community || 'Community',
      'maintenance': t.onboarding?.maintenance || 'Maintenance',
    };
    return activityMap[id] || id;
  };

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    firstName: user?.firstName || '',
    telephone: user?.telephone || '',
    age: user?.age?.toString() || '',
    prosthesisType: user?.prosthesisType || '',
    lengthUsage: user?.lengthUsage || '',
    mainChallenge: user?.mainChallenge || [],
    activities: user?.activities || [],
  });

  // Challenge/Activity input state
  const [newChallenge, setNewChallenge] = useState('');
  const [newActivity, setNewActivity] = useState('');

  // Password change state
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  // Unsaved changes dialog
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  // Loading states
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        firstName: user.firstName || '',
        telephone: user.telephone || '',
        age: user.age?.toString() || '',
        prosthesisType: user.prosthesisType || '',
        lengthUsage: user.lengthUsage || '',
        mainChallenge: Array.isArray(user.mainChallenge) ? user.mainChallenge : [],
        activities: Array.isArray(user.activities) ? user.activities : [],
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleAddChallenge = () => {
    if (newChallenge.trim() && !formData.mainChallenge.includes(newChallenge.trim())) {
      handleInputChange('mainChallenge', [...formData.mainChallenge, newChallenge.trim()]);
      setNewChallenge('');
    }
  };

  const handleRemoveChallenge = (challenge: string) => {
    handleInputChange(
      'mainChallenge',
      formData.mainChallenge.filter((c) => c !== challenge)
    );
  };

  const handleAddActivity = () => {
    if (newActivity.trim() && !formData.activities.includes(newActivity.trim())) {
      handleInputChange('activities', [...formData.activities, newActivity.trim()]);
      setNewActivity('');
    }
  };

  const handleRemoveActivity = (activity: string) => {
    handleInputChange(
      'activities',
      formData.activities.filter((a) => a !== activity)
    );
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      await updateProfile({
        name: formData.name,
        first_name: formData.firstName,
        telephone: formData.telephone,
        age: formData.age ? parseInt(formData.age, 10) : null,
        prosthesis_type: formData.prosthesisType as any,
        length_usage: formData.lengthUsage as any,
        main_challenge: formData.mainChallenge,
        activities: formData.activities,
      });
      setIsEditing(false);
      setHasChanges(false);
      alert(t.profile.profileUpdated);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(t.common.error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (hasChanges) {
      setShowUnsavedDialog(true);
      setPendingNavigation('cancel');
    } else {
      setIsEditing(false);
    }
  };

  const handleNavigateWithCheck = (page: string) => {
    if (hasChanges && isEditing) {
      setShowUnsavedDialog(true);
      setPendingNavigation(page);
    } else {
      onNavigate(page);
    }
  };

  const handleConfirmLeave = () => {
    setHasChanges(false);
    setShowUnsavedDialog(false);
    if (pendingNavigation === 'cancel') {
      setIsEditing(false);
      // Reset form data
      if (user) {
        setFormData({
          name: user.name || '',
          firstName: user.firstName || '',
          telephone: user.telephone || '',
          age: user.age?.toString() || '',
          prosthesisType: user.prosthesisType || '',
          lengthUsage: user.lengthUsage || '',
          mainChallenge: Array.isArray(user.mainChallenge) ? user.mainChallenge : [],
          activities: Array.isArray(user.activities) ? user.activities : [],
        });
      }
    } else if (pendingNavigation) {
      onNavigate(pendingNavigation);
    }
    setPendingNavigation(null);
  };

  const handlePasswordChange = async () => {
    setPasswordError('');

    // Validation
    if (!passwordData.oldPassword) {
      setPasswordError(t.profile.oldPasswordRequired);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError(t.profile.passwordTooShort);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError(t.profile.passwordMismatch);
      return;
    }

    try {
      setIsChangingPassword(true);

      // Verify old password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user!.email,
        password: passwordData.oldPassword,
      });

      if (signInError) {
        setPasswordError('Current password is incorrect');
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (updateError) {
        setPasswordError(updateError.message);
        return;
      }

      alert(t.profile.passwordChanged);
      setShowPasswordDialog(false);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Password change error:', error);
      setPasswordError(t.common.error);
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 pt-24 pb-24">
        <div className="w-full max-w-[1280px] mx-auto px-4 flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>{t.nav.profile}</CardTitle>
              <CardDescription>Please login to view your profile</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
              <Button onClick={() => onNavigate('auth')}>{t.auth.login}</Button>
              <Button variant="outline" onClick={() => onNavigate('home')}>
                {t.nav.home}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-24 pb-24">
      <div className="w-full max-w-[1280px] mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserIcon className="text-primary" size={32} />
              <div>
                <h1 className="text-3xl font-bold">{t.profile.title}</h1>
                <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
              </div>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="mr-2" size={16} />
                {t.profile.editProfile}
              </Button>
            )}
          </div>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t.profile.accountInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">{t.auth.email}</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="text-muted-foreground" size={16} />
                    <p className="text-sm">{user.email}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">{t.profile.userType}</Label>
                  <div className="flex items-center gap-2">
                    <Shield className="text-muted-foreground" size={16} />
                    <Badge variant="default" className="capitalize">
                      {user.userType}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={() => setShowPasswordDialog(true)} variant="outline" size="sm">
                  <Lock className="mr-2" size={16} />
                  {t.profile.changePassword}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t.profile.personalInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.auth.name}</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-sm py-2">{formData.name || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstName">{t.auth.firstName}</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                    />
                  ) : (
                    <p className="text-sm py-2">{formData.firstName || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  {isEditing ? (
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Enter your age"
                      min="0"
                      max="120"
                    />
                  ) : (
                    <p className="text-sm py-2">{formData.age || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">{t.auth.telephone}</Label>
                  {isEditing ? (
                    <Input
                      id="telephone"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="text-sm py-2">{formData.telephone || 'Not set'}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prosthesis Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t.profile.prosthesisInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prosthesisType">{t.profile.prosthesisType}</Label>
                  {isEditing ? (
                    <Select
                      value={formData.prosthesisType}
                      onValueChange={(value) => handleInputChange('prosthesisType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="above_knee">{t.profile.aboveKnee}</SelectItem>
                        <SelectItem value="below_knee">{t.profile.belowKnee}</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm py-2 capitalize">
                      {formData.prosthesisType
                        ? formData.prosthesisType === 'above_knee'
                          ? t.profile.aboveKnee
                          : t.profile.belowKnee
                        : 'Not set'}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lengthUsage">{t.profile.lengthUsage}</Label>
                  {isEditing ? (
                    <Select
                      value={formData.lengthUsage}
                      onValueChange={(value) => handleInputChange('lengthUsage', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less_than_6_month">{t.profile.lessThan6Months}</SelectItem>
                        <SelectItem value="more_than_1_year">{t.profile.moreThan1Year}</SelectItem>
                        <SelectItem value="more_than_5_years">{t.profile.moreThan5Years}</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm py-2">
                      {formData.lengthUsage
                        ? formData.lengthUsage === 'less_than_6_month'
                          ? t.profile.lessThan6Months
                          : formData.lengthUsage === 'more_than_1_year'
                          ? t.profile.moreThan1Year
                          : t.profile.moreThan5Years
                        : 'Not set'}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Challenges & Activities */}
          <Card>
            <CardHeader>
              <CardTitle>{t.profile.challengesActivities}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Challenges */}
              <div className="space-y-3">
                <Label>{t.profile.mainChallenge}</Label>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(formData.mainChallenge) && formData.mainChallenge.length > 0 ? (
                    formData.mainChallenge.map((challenge) => (
                      <Badge
                        key={challenge}
                        variant="secondary"
                        className="px-3 py-1 flex items-center gap-2"
                      >
                        {getChallengeLabel(challenge)}
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveChallenge(challenge)}
                            className="hover:text-destructive"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </Badge>
                    ))
                  ) : !isEditing ? (
                    <p className="text-sm text-muted-foreground">No challenges added</p>
                  ) : null}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      value={newChallenge}
                      onChange={(e) => setNewChallenge(e.target.value)}
                      placeholder="Type a challenge..."
                      onKeyPress={(e) => e.key === 'Enter' && handleAddChallenge()}
                    />
                    <Button onClick={handleAddChallenge} variant="outline" size="sm">
                      <Plus size={16} />
                    </Button>
                  </div>
                )}
              </div>

              {/* Activities */}
              <div className="space-y-3">
                <Label>{t.profile.activities}</Label>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(formData.activities) && formData.activities.length > 0 ? (
                    formData.activities.map((activity) => (
                      <Badge
                        key={activity}
                        variant="secondary"
                        className="px-3 py-1 flex items-center gap-2"
                      >
                        {getActivityLabel(activity)}
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveActivity(activity)}
                            className="hover:text-destructive"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </Badge>
                    ))
                  ) : !isEditing ? (
                    <p className="text-sm text-muted-foreground">No activities added</p>
                  ) : null}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      placeholder="Type an activity..."
                      onKeyPress={(e) => e.key === 'Enter' && handleAddActivity()}
                    />
                    <Button onClick={handleAddActivity} variant="outline" size="sm">
                      <Plus size={16} />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4">
              <Button onClick={handleSaveChanges} disabled={isSaving || !hasChanges}>
                {isSaving ? t.common.loading : t.profile.saveChanges}
              </Button>
              <Button onClick={handleCancelEdit} variant="outline">
                {t.profile.cancelEdit}
              </Button>
            </div>
          )}

          {/* Logout & Admin Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Button
              variant="destructive"
              onClick={async () => {
                await logout();
                onNavigate('home');
              }}
            >
              {t.auth.logout}
            </Button>
            {(user.userType === 'admin' || user.userType === 'superadmin') && (
              <Button variant="outline" onClick={() => handleNavigateWithCheck('admin')}>
                {t.admin.title}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.profile.changePassword}</DialogTitle>
            <DialogDescription>Enter your current password and choose a new password.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="oldPassword">{t.profile.oldPassword}</Label>
              <Input
                id="oldPassword"
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">{t.profile.newPassword}</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.profile.confirmPassword}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
            </div>
            {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordDialog(false);
                setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
                setPasswordError('');
              }}
            >
              {t.common.cancel}
            </Button>
            <Button onClick={handlePasswordChange} disabled={isChangingPassword}>
              {isChangingPassword ? t.common.loading : t.common.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unsaved Changes Dialog */}
      <Dialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.profile.unsavedChanges}</DialogTitle>
            <DialogDescription>{t.profile.unsavedChangesMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowUnsavedDialog(false);
                setPendingNavigation(null);
              }}
            >
              {t.profile.stayOnPage}
            </Button>
            <Button variant="destructive" onClick={handleConfirmLeave}>
              {t.profile.leaveWithoutSaving}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
