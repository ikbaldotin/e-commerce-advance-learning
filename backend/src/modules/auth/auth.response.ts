export type userResponseDTO = {
  id: string;
  firstname: string;
  lastname: string | null;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};
