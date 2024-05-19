import {z} from "zod";

export const FormSchema = z.object({
    name: z.string({
        required_error: "Nama wajib diisi.",
    }).max(50, {
        message: "Username maksimal 50 karakter."
    }),
})