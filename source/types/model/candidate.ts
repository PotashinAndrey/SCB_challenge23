import type { UUID } from "node:crypto";

export type CandidateModel = {
    name: string;
    photo: string; // путь до фотки
    sex: string;
    birthdate: string;
    position: string;
    grade: string;
    salary: string;
    experience: string;
    tags: UUID[]; // Заполняется не напрямую
    skills: UUID[]; // Заполняется не напрямую
    link: string; // ссылка на страницу где-нибудь в хедхантере и тд
    file: string, // путь до файла с резюме
    email: string;
    phone: string;
    telegram: string;
    vk: string;
    notes: string;
    description: string;
    vacancy: UUID; // id вакансии по которой создали кандидата
}
