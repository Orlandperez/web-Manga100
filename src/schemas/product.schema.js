import { z } from "zod";

export const productSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido"
  }).min(2, "El nombre debe tener al menos 2 caracteres"),
  price: z.coerce.number({
  required_error: "El precio es requerido"
}).positive("El precio debe ser positivo"),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  category: z.string({
    required_error: "La categoría es requerida"
  })
});