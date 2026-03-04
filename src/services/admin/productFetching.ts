"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import z from "zod";

const createProductZodSchema = z.object({
   name: z.string().min(1, "Name is required"),
   category: z.string().min(1, "Category is required"),
   price: z.number().min(1, "Price is required"),
   stock: z.number().min(1, "Stock is required"),
   brand: z.string().min(1, "Brand is required"), // Add brand field
   description: z.string().min(1, "Description is required"), // Add description
   note: z.string(), // Make note optional
   // Remove sku if it's not in your form
});

export async function CreateProductFetching(prevState: any, fromData: FormData) {
   const getFormValue = (key: string): string => {
      const value = fromData.get(key);
      return value === null ? "" : value.toString();
   };
   const payload = {
      name: getFormValue("name"),
      category: getFormValue("category"),
      price: parseFloat(getFormValue("price")), // Convert to number
      stock: parseInt(getFormValue("stock"), 10), // Convert to number
      brand: getFormValue("brand"),
      description: getFormValue("description"),
      note: getFormValue("note") || "", // Default to empty string if note is not provided
   };

   // console.log(payload, "Payload in CreateProductFetching", payload.note);

   const validatedPayload = zodValidator(payload, createProductZodSchema);
   console.log(validatedPayload, "validation check");

   if (!validatedPayload.success && validatedPayload.errors) {
      return {
         success: false,
         message: "Validation failed",
         formData: payload,
         errors: validatedPayload.errors,
      };
   }

   if (!validatedPayload.data) {
      return {
         success: false,
         message: "Validation failed",
         formData: payload,
      };
   }

   const ProductValidation = createProductZodSchema.safeParse(payload);

   const newFromData = new FormData();
   newFromData.append("data", JSON.stringify(ProductValidation.data));
   // console.log(newFromData)

   if (fromData.get("file")) {
      newFromData.append("file", fromData.get("file") as Blob);
   }
   try {
      const res = await serverFetch.post("/product/create", {
         body: newFromData,
      });

      const result = await res.json();

      console.log(result, "Result from CreateProductFetching","note value", payload.note);

      return result;
   } catch (error: any) {
      console.log(error);

      return {
         success: false,
         message: error.message || "An error occurred while fetching products",
      };
   }
}
