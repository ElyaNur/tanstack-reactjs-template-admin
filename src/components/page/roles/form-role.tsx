import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {z} from "zod";
import {FormSchema} from "@/components/page/roles/role-form-schema.ts";
import {ControllerRenderProps, UseFormReturn} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {useAuthStore} from "@/store/store.ts";
import {client} from "@/common/client.ts";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDown, ChevronUp, Maximize, Minimize} from "lucide-react";
import {Switch} from "@/components/ui/switch.tsx";
import {Label} from "@/components/ui/label.tsx";
import {SyncLoader} from "react-spinners";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useEffect, useMemo, useState} from "react";
import {cn} from "@/lib/utils.ts";

type MenuType = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    permissions: { [key: string]: string | number }[];
    [key: string]: string | number;
};

const FormRole = ({form}: {
    form: UseFormReturn<z.infer<typeof FormSchema>>,
}) => {
    const [pilihSemua, setPilihSemua] = useState(false)
    const [expandAll, setExpandAll] = useState(true)

    const {data: menus, isLoading} = useQuery({
        queryKey: ['menus-all'],
        queryFn: () => client.get('/menus/all', {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }).then(res => res.data),
    })

    const allPermissionIds = useMemo(
        () => menus?.data.map((menu: MenuType) => menu.permissions.map(permission => parseInt(String(permission.id)))).flat(),
        [menus]
    )

    return (
        <div className="flex flex-col gap-4">
            <Card className="p-4 bg-primary-foreground grid grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nama Role</FormLabel>
                            <FormControl>
                                <Input placeholder="Nama Role" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="flex flex-col mt-7">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="pilih-semua"
                            checked={pilihSemua}
                            onCheckedChange={(checked) => setPilihSemua(checked)}
                        />
                        <Label htmlFor="pilih-semua">Pilih Semua</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Aktifkan semua permissions yang Tersedia untuk Role ini.
                    </p>
                </div>
            </Card>

            <div className="flex justify-end">
                <Button type="button" onClick={() => setExpandAll(!expandAll)}>
                    {expandAll ? (
                        <>
                            <Minimize size={16} className="mr-2"/>
                            Collapse
                        </>
                    ) : (
                        <>
                            <Maximize size={16} className="mr-2"/>
                            Expand
                        </>
                    )}
                </Button>
            </div>

            {isLoading ? (
                <div className="text-center">
                    <SyncLoader
                        color="#adadad"
                        loading
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {menus && menus.data.map((menu: MenuType) => (
                        <ListMenuPermissions
                            key={menu.id}
                            form={form}
                            data={menu}
                            pilihSemua={pilihSemua}
                            expandAll={expandAll}
                            allPermissionIds={allPermissionIds}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FormRole;

const ListMenuPermissions = ({form, data, pilihSemua, expandAll, allPermissionIds}: {
    form: UseFormReturn<z.infer<typeof FormSchema>>,
    data: MenuType,
    pilihSemua: boolean,
    expandAll: boolean,
    allPermissionIds: number[]
}) => {
    const [expand, setExpand] = useState(true)
    const [checkedAll, setCheckedAll] = useState(false)

    useEffect(() => {
        setCheckedAll(pilihSemua)
        if (pilihSemua) {
            setTimeout(() => form.reset({
                ...form.getValues(),
                permission_ids: allPermissionIds
            }))
        } else {
            form.reset({
                ...form.getValues(),
                permission_ids: []
            })
        }
    }, [pilihSemua]);

    useEffect(() => {
        setExpand(expandAll)
    }, [expandAll]);

    return (
        <Card className="bg-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{data.name}</CardTitle>
                <Button size="icon" onClick={() => setExpand(!expand)} type="button">
                    {expand ? <ChevronUp/> : <ChevronDown/>}
                </Button>
            </CardHeader>
            <CardContent>
                <div
                    className={cn("transition-all ease-in-out overflow-hidden max-h-screen flex flex-col gap-2", !expand && "max-h-0")}
                >
                    <Button
                        variant="link"
                        className={cn("p-0 font-bold", checkedAll && "text-destructive")}
                        type="button"
                        onClick={() => setCheckedAll(!checkedAll)}
                    >
                        {checkedAll ? 'Batal Pilih Semua' : 'Pilih Semua'}
                    </Button>

                    <FormField
                        control={form.control}
                        name="permission_ids"
                        render={({field: props}) => (
                            <FormFieldComponent
                                form={form}
                                data={data}
                                props={props}
                                checkedAll={checkedAll}
                            />
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

const FormFieldComponent = ({form, data, props, checkedAll}: {
    form: UseFormReturn<z.infer<typeof FormSchema>>,
    data: MenuType,
    props: ControllerRenderProps<z.infer<typeof FormSchema>, `permission_ids`>,
    checkedAll: boolean
}) => {
    useEffect(() => {
        if (checkedAll) {
            props.onChange(data.permissions.map(permission => permission.id))
        } else {
            props.onChange([])
        }
    }, [checkedAll]);
    return (
        <>
            {data.permissions.map((permission) => (
                <FormField
                    key={permission.id}
                    control={form.control}
                    name="permission_ids"
                    render={({field}) => (
                        <FormItemComponent
                            permission={permission}
                            field={field}
                        />
                    )}
                />
            ))}
        </>
    )
}

const FormItemComponent = ({permission, field}: {
    permission: { [key: string]: string | number },
    field: ControllerRenderProps<z.infer<typeof FormSchema>, `permission_ids`>,
}) => {
    return (
        <FormItem
            key={permission.id}
            className="flex flex-row items-start space-x-3 space-y-0"
        >
            <FormControl>
                <Checkbox
                    checked={field.value?.includes(parseInt(String(permission.id)))}
                    onCheckedChange={(checked) => {
                        return checked
                            ? field.onChange([...(field.value || []), permission.id])
                            : field.onChange(
                                field.value?.filter(
                                    (value) => value !== permission.id
                                )
                            )
                    }}
                />
            </FormControl>
            <FormLabel className="font-normal">
                {permission.name}
            </FormLabel>
        </FormItem>
    )
}