import prisma from "../prisma";
import { generateCoverLetter, analyzeResume } from "./ai";

/* ---------------------------- Service Helpers ---------------------------- */

export async function createService(data: {
  title: string;
  description?: string;
  price?: number;
  categoryId?: string;
  createdById: string;
}) {
  return prisma.service.create({ data });
}

export async function listServices() {
  return prisma.service.findMany({
    include: { category: true, createdBy: true },
  });
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({ where: { id }, include: { subservices: true } });
}

/* ---------------------------- Subservice Helpers ---------------------------- */

export async function createSubService(data: {
  title: string;
  description?: string;
  price?: number;
  serviceId: string;
  createdById: string;
}) {
  return prisma.subService.create({ data });
}

export async function listSubServices(serviceId: string) {
  return prisma.subService.findMany({ where: { serviceId } });
}

export async function getSubServiceById(id: string) {
  return prisma.subService.findUnique({ where: { id } });
}

/* ------------------------ Resume & Cover Letter ------------------------- */

export async function createResumeBooking(data: {
  userId: string;
  subServiceId: string;
  resumeData: any; // Resume form JSON
  fileUrl?: string;
}) {
  return prisma.booking.create({
    data: {
      userId: data.userId,
      subServiceId: data.subServiceId,
      status: "PENDING",
      resumeData: data.resumeData,
      fileUrl: data.fileUrl,
    },
  });
}

export async function markResumeReady(bookingId: string) {
  return prisma.booking.update({
    where: { id: bookingId },
    data: { status: "READY" },
  });
}

export async function payAndUnlockResume(bookingId: string) {
  return prisma.booking.update({
    where: { id: bookingId },
    data: { canDownload: true },
  });
}

/* ------------------------ Cover Letter ------------------------- */

export async function createCoverLetter(
  bookingId: string,
  input: {
    jobTitle: string;
    companyName: string;
    jobDescription: string;
    applicantName: string;
    applicantAddress: string;
    applicantEmail: string;
    applicantPhone: string;
  }
) {
  // Get resume text from booking
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking || !booking.resumeData) throw new Error("Resume not found");

  const resumeText = JSON.stringify(booking.resumeData);

  // Generate cover letter using AI
  const coverLetterContent = await generateCoverLetter({
    resumeText,
    ...input,
  });

  // Save to database
  return prisma.coverLetter.create({
    data: {
      bookingId,
      content: coverLetterContent,
      status: "PENDING_PAYMENT", // Locked until customer pays
    },
  });
}

export async function payAndUnlockCoverLetter(coverLetterId: string) {
  return prisma.coverLetter.update({
    where: { id: coverLetterId },
    data: { canDownload: true, status: "PAID" },
  });
}

/* ------------------------ Resume Analysis ------------------------- */

export async function analyzeBookingResume(bookingId: string, jobDescription: string) {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking || !booking.resumeData) throw new Error("Resume not found");

  const resumeText = JSON.stringify(booking.resumeData);
  return analyzeResume(resumeText, jobDescription);
}