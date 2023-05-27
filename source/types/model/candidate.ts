import type { UUID } from "node:crypto";

export type CandidateModel = {
    name: string;
    vacancy: UUID; // id вакансии по которой создали кандидата
    position: string;
    salary: string;
    experience: string;
    tags: string[];
    skills: string[];
    sex: string;
    birthDate: string;
    descriptionText: string;
    email: string;
    phone: string;
    telegram: string;
    link: string; // ссылка на страницу где-нибудь в хедхантере и тд
    file: string, // путь до файла с резюме
    photo: string; // путь до фотки
    vk: string;
    notes: string;
    department: string;
}