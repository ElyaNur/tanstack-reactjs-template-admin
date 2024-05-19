import {Card} from "@/components/ui/card.tsx";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {z} from "zod";
import {FormSchema} from "@/components/page/users/user-form-schema.ts";
import {UseFormReturn} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import MultipleSelector, {Option} from "@/components/ui/multiple-selector.tsx";
import {useMemo} from "react";

const FormUser = ({form}: {
    form: UseFormReturn<z.infer<typeof FormSchema>>,
}) => {
    const {data: roles} = useQuery({
        queryKey: ['roles-menu'],
        queryFn: () => client.get('/roles/all', {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        })
    })

    const multiSelectRole: Option[] = useMemo(
        () => roles?.data.data.map((role: { [key: string]: string }) => ({
            label: role.name,
            value: role.id.toString(),
        })),
        [roles?.data.data]
    )

    return (
        <Card className="p-4 bg-primary-foreground grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="username"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="Nama" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            {multiSelectRole && (
                <FormField
                    control={form.control}
                    name="role_ids"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Roles</FormLabel>
                            <FormControl>
                                <div className="flex">
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={multiSelectRole}
                                        placeholder="Pilih Role untuk dikatikan ke user..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }
                                        onSearch={(value) => {
                                            return new Promise((resolve) => {
                                                setTimeout(() => {
                                                    resolve(
                                                        multiSelectRole.filter((option) =>
                                                            option.label.toLowerCase().includes(value.toLowerCase())
                                                        )
                                                    );
                                                });
                                            });
                                        }}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            )}
        </Card>
    );
};

export default FormUser;
