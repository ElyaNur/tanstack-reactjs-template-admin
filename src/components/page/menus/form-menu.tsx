import {useMemo} from 'react';
import {Card} from "@/components/ui/card.tsx";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import MultipleSelector, {Option} from "@/components/ui/multiple-selector.tsx";
import AddPermissionsDialog from "@/components/page/menus/add-permissions-dialog.tsx";
import {z} from "zod";
import {FormSchema} from "@/components/page/menus/menu-form-schema.ts";
import {UseFormReturn} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";

const FormMenu = ({form}: {
    form: UseFormReturn<z.infer<typeof FormSchema>>,
}) => {
    const {data: permissions} = useQuery({
        queryKey: ['permissions-menu'],
        queryFn: () => client.get('/permissions/all', {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        })
    })

    const multiSelectPermission: Option[] = useMemo(
        () => permissions?.data.data.map((permission: { [key: string]: string }) => ({
            label: permission.name,
            value: permission.id.toString(),
        })),
        [permissions?.data.data]
    )

    const {data: parentMenus} = useQuery({
        queryKey: ["parent-menus"],
        queryFn: () => client.get("/menus/parent", {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }).then((res) => res.data),
    })

    return (
        <Card className="p-4 bg-primary-foreground grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                            <Input placeholder="Nama" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="icon"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                            <Input placeholder="TrashIcon" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="sort"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Sort</FormLabel>
                        <FormControl>
                            <Input placeholder="1" type="number" {...field} />
                        </FormControl>
                        <FormDescription>Untuk menentukan letak menu</FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="path"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Path</FormLabel>
                        <FormControl>
                            <Input placeholder="/lokasi/menu" {...field} />
                        </FormControl>
                        <FormDescription>Path menu untuk http web</FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="parent_id"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Parent Menu</FormLabel>
                        <Select onValueChange={field.onChange} value={String(field.value)}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih parent menu"/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {parentMenus?.data.map((menu: { [key: string]: string }) => (
                                    <SelectItem value={menu.id.toString()}
                                                key={menu.id}>{menu.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>Diisi jika menu adalah sub menu</FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            {permissions?.data.data && (
                <FormField
                    control={form.control}
                    name="permission_ids"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Permissions</FormLabel>
                            <FormControl>
                                <div className="flex">
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={multiSelectPermission}
                                        placeholder="Pilih permission untuk dikatikan ke menu..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }
                                    />
                                    <AddPermissionsDialog/>
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

export default FormMenu;
