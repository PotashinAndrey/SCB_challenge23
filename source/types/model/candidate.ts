export type CreateCandidateModel = {
    name: string;
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