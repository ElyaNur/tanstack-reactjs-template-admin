import {Card} from "@/components/ui/card.tsx";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {z} from "zod";
import {FormSchema} from "@/components/page/roles/role-form-schema.ts";
import {UseFormReturn} from "react-hook-form";

const FormPermission = ({form}: {
    form: UseFormReturn<z.infer<typeof FormSchema>>,
}) => {
    return (
        <Card className="p-4 bg-primary-foreground grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Nama Permission</FormLabel>
                        <FormControl>
                            <Input placeholder="Nama Permission" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </Card>
    );
};

export default FormPermission;
