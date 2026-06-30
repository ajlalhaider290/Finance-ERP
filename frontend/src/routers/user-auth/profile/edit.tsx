import React, { useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { RootState, useAppSelector } from '@/store';
import { useNavigate } from "react-router";
import { CleanError } from '@/util/CleanError';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { getUserProfile, updateUserProfile } from '../service';
import { profileUserPayloadValidator } from '../validation';
import { Form } from '@/components/ui/form';
import { FormFieldText, FormFieldSelect } from '@/components/FormFieldWrapper';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Mail, User, Building } from 'lucide-react';

import { useCompanyEntityOptions } from '../../company-entity/hooks/useCompanyEntityOptions';


type ProfileFormData = z.infer<typeof profileUserPayloadValidator>;

const UserProfileEditPage: React.FC = () => {
  const session = useAppSelector((state: RootState) => state.session);
  const { isLoggedIn } = session;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

    

  const { data: profileData } = useQuery({
    queryKey: ['userProfile', session.token],
    queryFn: () => getUserProfile(session.token),
    enabled: isLoggedIn,
  });

  const updateProfileMutation = useMutation({
    mutationFn: ({ profileData }: { profileData: ProfileFormData }) => updateUserProfile(profileData),
  });

  const form = useForm<ProfileFormData, unknown, ProfileFormData>({
    resolver: zodResolver(profileUserPayloadValidator) as Resolver<ProfileFormData>,
    defaultValues: profileData?.data || {},
  });

	const { data : entityIds, isLoading : isLoadingEntityIds } = useCompanyEntityOptions();





  useEffect(() => {
    if (profileData) {form.reset(profileData?.data);
    }
  }, [profileData, form]);

  const handleFormSubmit = async (values: ProfileFormData) => {
    try {
      await updateProfileMutation.mutateAsync({ profileData: values });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast.success('Profile updated successfully');
      navigate('/userProfile');
    } catch (error) {
      toast.error(CleanError(error));
    }
  };

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <CardTitle className="text-xl">Profile</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2"></div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-5 items-start">
                			<FormFieldText
			                    name="email"
			                    label="Email"
			                    required
			                    icon={<Mail className="h-4 w-4" />}
			                    type="email"
			                    placeholder="Enter Email"
			                />
			<FormFieldText
			                    name="username"
			                    label="Username"
			                    required
			                    icon={<User className="h-4 w-4" />}
			                    placeholder="Enter Username"
			                />
			<FormFieldSelect
			                    name="role"
			                    label="Role"
			                    required
			                    placeholder="Select Role"
			                    options={[{"value":"superAdmin","label":"superAdmin"},{"value":"accountsManager","label":"accountsManager"},{"value":"accountant","label":"accountant"},{"value":"approver","label":"approver"},{"value":"employee","label":"employee"}]}
			                />
			<FormFieldText
			                    name="department"
			                    label="Department"
			                    icon={<Building className="h-4 w-4" />}
			                    placeholder="Enter Department"
			                />
			<FormFieldSelect
			                    name="entityId"
			                    label="Entity"
			                    placeholder="Select Entity"
			                    options={entityIds}
			                    loading={isLoadingEntityIds}
			                />

              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={(e) => { e.preventDefault(); navigate('/userProfile'); }}>
                  Cancel
                </Button>
                <Button className="flex items-center gap-2" disabled={updateProfileMutation.isPending}>
                  {updateProfileMutation.isPending && <Spinner />}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileEditPage;
