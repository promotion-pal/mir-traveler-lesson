import z from "zod";

const addressSchema = z.object({
  full_address: z.string(),
});

const businessInfoSchema = z.object({
  contact_person_phone: z.string(),
  organization_type: z.enum(["ip", "ooo", "other"]),
  full_legal_name: z.string(),
  manager_full_name: z.string(),
  manager_post: z.enum(["general_manager", "director", "other"]),
  inn: z.string(),
  kpp: z.string().optional(),
  current_account: z.string(),
  correspondent_account: z.string(),
  bic: z.string(),
  ogrn_ip: z.string(),
  contact_person_name: z.string(),
  contact_person_surname: z.string(),
  contact_person_middle_name: z.string(),
  contact_person_email: z.string().email(),
});

const individualSchema = z.object({
  email: z.string().email(),
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  change_email: z.boolean(),
  physical_address: addressSchema,
});

const businessSchema = z.object({
  email: z.string().email(),
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  change_email: z.boolean(),
  physical_address: addressSchema,
  legal_address: addressSchema,
  business_info: businessInfoSchema,
});

export { individualSchema, businessSchema };
