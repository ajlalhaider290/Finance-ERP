import React, { useCallback, useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { Spinner } from '@/components/ui/spinner';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setArea, setSession } from '@/store/slice/sessionSlice';
import { CleanError } from '@/util/CleanError';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from 'sonner';
import { getAreaDashboardPath } from '@/config/areas/areaConfig';
import { z } from 'zod';
import { userRegister } from './service';
import { registerUserPayloadValidator } from './validation';
import { Form } from '@/components/ui/form';
import { FormFieldText, FormFieldSelect } from '@/components/FormFieldWrapper';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Mail, User, Lock, Building } from 'lucide-react';

import { useCompanyEntityOptions } from '../company-entity/hooks/useCompanyEntityOptions';


type RegistrationFormData = z.infer<typeof registerUserPayloadValidator>;

const UserRegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state: RootState) => state.session);
  const { isLoggedIn } = session;
    
	const { data : entityIds, isLoading : isLoadingEntityIds } = useCompanyEntityOptions();



  const { mutateAsync: userRegisterAsync, isPending: userRegisterPending } = useMutation({ mutationFn: userRegister });
  

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const redirectTarget = redirect && redirect.startsWith('/') ? redirect : null;


  const form = useForm<RegistrationFormData, unknown, RegistrationFormData>({
    resolver: zodResolver(registerUserPayloadValidator) as Resolver<RegistrationFormData>,
    defaultValues: getDefaultFormValues(registerUserPayloadValidator),
  });


  const handleFinish = useCallback(
    async (values: RegistrationFormData) => {
      try {
        const response = await userRegisterAsync(values);
        if (response) {
          const result = response.data;
          dispatch(
            setSession({
              ...session,
              token: result.token,
              user: result.user,
              isLoggedIn: true,
            }),
          );

          if(result.user.areaScope && result.user.areaScope.length > 0){
            dispatch(setArea(result.user.areaScope[0]));
            navigate(redirectTarget ?? getAreaDashboardPath(result.user.areaScope[0]), { replace: true });
          }else{
            dispatch(setArea('default'));
            navigate(redirectTarget ?? getAreaDashboardPath('default'), { replace: true });
          }
        }
      } catch (error) {
        toast.error(CleanError(error));
        handleApiFormErrors(error, form);
      }
    },
    [userRegisterAsync, dispatch, session, navigate, redirectTarget, form],
  );


  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectTarget ?? getAreaDashboardPath(session.area), { replace: true });
    }
  }, [isLoggedIn, navigate, redirectTarget, session.area]);


  return (
    <div className="flex items-center justify-center py-12 px-5">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col gap-1">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription className="">Join thousands of developers building amazing applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFinish)} className="flex flex-col gap-4">
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
			<FormFieldText
			                    name="password"
			                    label="Password"
			                    required
			                    icon={<Lock className="h-4 w-4" />}
			                    type="password"
			                    placeholder="Enter Password"
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

              <Button type="submit" className="w-full" disabled={userRegisterPending}>
                {userRegisterPending && <Spinner />}
                Register
              </Button>

              
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/userLogin" className="text-primary hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default UserRegisterPage;