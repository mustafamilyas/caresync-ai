"use server";
import { patientSchema } from "@/data/schema";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

// Simulate a database read for patients.
export async function getPatients() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src//data/patients.json")
  );

  const patients = JSON.parse(data.toString());

  return z.array(patientSchema).parse(patients);
}
