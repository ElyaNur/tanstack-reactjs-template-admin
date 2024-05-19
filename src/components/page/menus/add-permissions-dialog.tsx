import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Plus} from "lucide-react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Nama permission harus diisi",
    }).max(20, {message: "Nama permission maksimal 20 karakter"}),
})

const AddPermissionsDialog = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    })

    const queryClient = useQueryClient()

    const {mutate: savePermission} = useMutation({
        mutationFn: (data: z.infer<typeof FormSchema>) => client.post('/permissions', data, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['permissions-menu']})
            toast({
                title: 'Success',
                description: 'Data has been saved',
            })
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to save data',
                variant: 'destructive'
            })
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        savePermission(data)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" type="button">
                    <Plus className="w-4 h-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <div className="flex flex-col gap-5">
                        <DialogHeader>
                            <DialogTitle>Tambah Permission</DialogTitle>
                            <DialogDescription>
                                Menambah permission untuk menu
                            </DialogDescription>
                        </DialogHeader>

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

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Batal
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="button" onClick={form.handleSubmit(onSubmit)}>Simpan</Button>
                            </DialogClose>
                        </DialogFooter>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddPermissionsDialog;