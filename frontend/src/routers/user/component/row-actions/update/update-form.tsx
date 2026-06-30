import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldText, FormFieldSelect } from '@/components/FormFieldWrapper';
import { Mail, User, Lock, Building } from 'lucide-react';
import { UserUpdate } from '../../../interface';
import { useCompanyEntityOptions } from '../../../../company-entity/hooks/useCompanyEntityOptions';


const UserForm = memo(() => {
	const form = useFormContext<UserUpdate>();


	const { data : entityIds, isLoading : isLoadingEntityIds } = useCompanyEntityOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
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
			</div>
		</Form>
	);
});
UserForm.displayName = 'UserForm';

export default UserForm;