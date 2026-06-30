import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { RootState, useAppSelector } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { getUserProfile } from '../service';

import MCPTokenModal from './components/mcp-token-model';
import { Link } from 'lucide-react';
import { formatDate } from '@/util/formatDate';


const UserProfilePage: React.FC = () => {
  const session = useAppSelector((state: RootState) => state.session);
  const { isLoggedIn } = session;
  const navigate = useNavigate();
  const [showMCPTokenModal, setShowMCPTokenModal] = useState(false);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['userProfile', session.token],
    queryFn: () => getUserProfile(session.token),
    enabled: isLoggedIn,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <CardTitle className="text-xl">Profile</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowMCPTokenModal(true)}>
              <Link className="mr-2 h-4 w-4" />
              MCP Configuration
            </Button>
           
            <Button onClick={() => navigate('/userProfile/edit')}>
              Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
               <div className="grid grid-cols-3 py-3 border-b">
          <Label>User Id</Label>
          <div className="col-span-2 text-sm">{(Array.isArray(profileData?.data?.userId)
    ? (profileData?.data?.userId as unknown[]).join(', ')
    : (typeof profileData?.data?.userId === 'object' && profileData?.data?.userId !== null
        ? JSON.stringify(profileData?.data?.userId)
        : (profileData?.data?.userId as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <Label>Email</Label>
          <div className="col-span-2 text-sm">{(Array.isArray(profileData?.data?.email)
    ? (profileData?.data?.email as unknown[]).join(', ')
    : (typeof profileData?.data?.email === 'object' && profileData?.data?.email !== null
        ? JSON.stringify(profileData?.data?.email)
        : (profileData?.data?.email as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <Label>Username</Label>
          <div className="col-span-2 text-sm">{(Array.isArray(profileData?.data?.username)
    ? (profileData?.data?.username as unknown[]).join(', ')
    : (typeof profileData?.data?.username === 'object' && profileData?.data?.username !== null
        ? JSON.stringify(profileData?.data?.username)
        : (profileData?.data?.username as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <Label>Role</Label>
          <div className="col-span-2 text-sm">{(Array.isArray(profileData?.data?.role)
    ? (profileData?.data?.role as unknown[]).join(', ')
    : (typeof profileData?.data?.role === 'object' && profileData?.data?.role !== null
        ? JSON.stringify(profileData?.data?.role)
        : (profileData?.data?.role as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <Label>Department</Label>
          <div className="col-span-2 text-sm">{(Array.isArray(profileData?.data?.department)
    ? (profileData?.data?.department as unknown[]).join(', ')
    : (typeof profileData?.data?.department === 'object' && profileData?.data?.department !== null
        ? JSON.stringify(profileData?.data?.department)
        : (profileData?.data?.department as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <Label>Entity Id</Label>
          <div className="col-span-2 text-sm">{profileData?.data?.usersLabel || profileData?.data?.entityId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <Label>Created At</Label>
          <div className="col-span-2 text-sm">{profileData?.data?.createdAt ? formatDate(profileData?.data?.createdAt, 'TIMESTAMP') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <Label>Updated At</Label>
          <div className="col-span-2 text-sm">{profileData?.data?.updatedAt ? formatDate(profileData?.data?.updatedAt, 'TIMESTAMP') : '-'}</div>
        </div>
          </div>
        </CardContent>
      </Card>

      
            <MCPTokenModal
        open={showMCPTokenModal}
        onOpenChange={setShowMCPTokenModal}
      />
    </div>
  );
};

export default UserProfilePage;
