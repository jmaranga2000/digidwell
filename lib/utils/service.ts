// lib/utils/service.ts
import prisma from "../prisma";

export async function createService(data: {
  title: string;
  description?: string;
  price?: number;
  createdById: string;
}) {
  return prisma.service.create({
    data,
  });
}

export async function listServices() {
  return prisma.service.findMany({
    include: {
      createdBy: true,
      subservices: true, // Include all linked subservices
    },
  });
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({
    where: { id },
    include: {
      createdBy: true,
      subservices: true, // Include subservices for detailed view
    },
  });
}

export async function updateService(
  serviceId: string,
  data: { title?: string; description?: string; price?: number }
) {
  return prisma.service.update({
    where: { id: serviceId },
    data,
  });
}

export async function deleteService(serviceId: string) {
  return prisma.service.delete({
    where: { id: serviceId },
  });
}