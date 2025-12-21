// lib/utils/service.ts
import prisma from "../prisma";
import { z } from "zod";

// Service schema validation
export const serviceSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be a positive number").optional(),
  createdById: z.string(),
});

// Subservice schema validation
export const subserviceSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  serviceId: z.string(),
  createdById: z.string(),
});

export async function createService(data: z.infer<typeof serviceSchema>) {
  const validated = serviceSchema.parse(data);
  return prisma.service.create({
    data: validated,
  });
}

export async function listServices() {
  return prisma.service.findMany({
    include: {
      createdBy: true,
      subservices: true,
    },
  });
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({
    where: { id },
    include: {
      createdBy: true,
      subservices: true,
    },
  });
}

export async function updateService(
  serviceId: string,
  data: Partial<z.infer<typeof serviceSchema>>
) {
  const validated = serviceSchema.partial().parse(data);
  return prisma.service.update({
    where: { id: serviceId },
    data: validated,
  });
}

export async function deleteService(serviceId: string) {
  return prisma.service.delete({
    where: { id: serviceId },
  });
}

// Subservice utilities
export async function createSubservice(data: z.infer<typeof subserviceSchema>) {
  const validated = subserviceSchema.parse(data);
  return prisma.subservice.create({
    data: validated,
  });
}

export async function listSubservices(serviceId: string) {
  return prisma.subservice.findMany({
    where: { serviceId },
    include: { createdBy: true },
  });
}

export async function getSubserviceById(id: string) {
  return prisma.subservice.findUnique({
    where: { id },
    include: { createdBy: true, service: true },
  });
}

export async function updateSubservice(
  subserviceId: string,
  data: Partial<z.infer<typeof subserviceSchema>>
) {
  const validated = subserviceSchema.partial().parse(data);
  return prisma.subservice.update({
    where: { id: subserviceId },
    data: validated,
  });
}

export async function deleteSubservice(subserviceId: string) {
  return prisma.subservice.delete({
    where: { id: subserviceId },
  });
}