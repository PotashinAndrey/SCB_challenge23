import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { CandidateModel } from "@app/types/model/candidate";

export const candidatesList = async (db: DB): Promise<Array<any>> => {
    return db.select<any>({
        fields: "*",
        tables: "service.applicants"
    });
}

export const createCandidate = async (values: CandidateModel, db: DB): Promise<UUID> => {
    const { name, birthDate, description, email, experience, file, link, notes, phone, photo, position, salary, sex, skills, tags, telegram, vacancy, vk } = values;
    return await db.insert({
        fields: "vacancy, name, birthDate, description, email, experience, file, link, notes, phone, photo, position, salary, sex, skills, tags, telegram, vk",
        tables: "service.applicants",
        values: [vacancy, name, birthDate, description, email, experience, file, link, notes, phone, photo, position, salary, sex, skills, tags, telegram, vk],
        returning: "id"
    });
}