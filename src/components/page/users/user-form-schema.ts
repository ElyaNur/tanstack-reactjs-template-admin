import {z} from "zod";

export const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
});

export const FormSchema = z.object({
    username: z.string({
        required_error: "Username wajib diisi.",
    }).max(70, {
        message: "Username maksimal 70 karakter."
    }),
    email: z.string({
        required_error: "Email wajib diisi."
    }).email({
        message: "Email tidak valid."
    }),
    role_ids: z.array(optionSchema).nonempty({
        message: "Role wajib dipilih."
    })
})