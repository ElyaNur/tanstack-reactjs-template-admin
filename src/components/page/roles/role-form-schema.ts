import {z} from "zod";

export const FormSchema = z.object({
    name: z.string({
        required_error: "Nama wajib diisi.",
    }).max(50, {
        message: "Username maksimal 50 karakter."
    }),
    permission_ids: z.array(z.number().optional()).optional(),
})