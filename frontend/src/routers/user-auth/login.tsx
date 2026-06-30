import React, { useEffect, useCallback } from 'react';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setArea, setSession } from '@/store/slice/sessionSlice';
import { userLogin } from './service';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link, useSearchParams } from "react-router";
import { CleanError } from '@/util/CleanError';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { loginUserPayloadValidator } from './validation';
import { PasswordInput } from '@/components/PasswordInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { getAreaDashboardPath } from '@/config/areas/areaConfig';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Mail } from 'lucide-react';

type LoginFormData = z.infer<typeof loginUserPayloadValidator>;

const UserLoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state: RootState) => state.session);
  const { isLoggedIn } = session;
  const { mutateAsync: userLoginAsync, isPending } = useMutation({ mutationFn: userLogin });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const redirectTarget = redirect && redirect.startsWith('/') ? redirect : null;

  const form = useForm<LoginFormData, unknown, LoginFormData>({
    resolver: zodResolver(loginUserPayloadValidator) as Resolver<LoginFormData>,
    defaultValues: getDefaultFormValues(loginUserPayloadValidator),
  });

  const handleFinish = useCallback(
    async (values: LoginFormData) => {
      try {
        const response = await userLoginAsync(values);
        if (response) {
          const result = response.data;
          dispatch(
            setSession({
              ...session,
              token: result.token,
              user: result.user,
              isLoggedIn: true,
              refreshToken: result.refreshToken,
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
      }
    },
    [userLoginAsync, dispatch, session, navigate, redirectTarget],
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectTarget ?? getAreaDashboardPath(session.area), { replace: true });
    }
  }, [isLoggedIn, navigate, redirectTarget, session.area]);

  return (
    <div className="flex items-center justify-center py-12 px-5">
      <Card className="w-full max-w-sm">
        <CardHeader className="">
          <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
          <p className="text-sm text-muted-foreground">Enter your email below to login to your account</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFinish)} className="flex flex-col gap-4">
              <Controller control={form.control} name="email"
                render={({ field, fieldState  }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Email<span className="text-destructive">*</span>
                    </FieldLabel>
                      <InputGroup>
                        <InputGroupAddon><Mail className="h-4 w-4" /></InputGroupAddon>
                        <InputGroupInput placeholder="Enter Email" autoComplete="username" {...field} value={field.value ?? ''} />
                      </InputGroup>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller control={form.control} name="password"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between">
                      <FieldLabel htmlFor={field.name}>
                        Password <span className="text-destructive">*</span>
                      </FieldLabel>
                    </div>
                    <PasswordInput placeholder="Enter Password" autoComplete="current-password" value={field.value?.toString() || ''} onChange={field.onChange} />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Spinner />}
                Login
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/userRegister" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserLoginPage;