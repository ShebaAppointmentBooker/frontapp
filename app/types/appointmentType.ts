export interface appointmentType {
  appointmentId: string;
  date: string;
  doctor: { doctorId: string; name: string; email: string };
  specialization: string;
  appointmentType: string;
  resolution?: string;
}
