import {z} from "zod";

export const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
});

export const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Username tidak boleh kosong.",
    }).max(50, {
        message: "Username maksimal 50 karakter."
    }),
    icon: z.string().min(1, {
        message: "Icon tidak boleh kosong.",
    }).max(50, {
        message: "Icon maksimal 50 karakter."
    }),
    sort: z.coerce.number({
        required_error: "Sort tidak boleh kosong.",
        invalid_type_error: "Sort harus berupa angka."
    }).positive(),
    path: z.string().max(50, {
        message: "Path maksimal 50 karakter."
    }).optional(),
    parent_id: z.coerce.number().optional(),
    permission_ids: z.array(optionSchema).optional(),
})