import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { skillById } from "./skills";
import { CandidateModel } from "@app/types/model/candidate";

export const candidatesList = async (db: DB): Promise<Array<any>> => {
    return db.select<any>({
        fields: "*",
        tables: "service.applicants"
    });
}

export const createCandidate = async (values: CandidateModel, db: DB): Promise<UUID> => {
    const { name, birthdate, description, email, experience, file, link, notes, phone, photo, position, salary, sex, skills, tags, telegram, vacancy, vk, grade } = values;
    const result = await db.insert({
        fields: "vacancy, name, birthDate, description, email, experience, file, link, notes, phone, photo, position, salary, sex, telegram, vk, grade",
        tables: "service.applicants",
        values: [vacancy, name, birthdate, description, email, experience, file, link, notes, phone, photo, position, salary, sex, telegram, vk, grade],
        returning: "id"
    });
    const candidateId = result.rows[0].id;
    console.log(candidateId)
    for (const skillId of values.skills) {
        await db.insert({
            fields: "applicant, skill",
            tables: "service.abilities",
            values: [candidateId, skillId]
        });
    }
    for (const tagId of values.tags) {
        await db.insert({
            fields: "applicant, skill, tag",
            tables: "service.abilities",
            values: [candidateId, tagId, true]
        });
    }
    return candidateId;
}

export const candidateByID = async (id: UUID, db: DB): Promise<CandidateModel> => {
    const candidate = await db.selectRow<CandidateModel>({
        fields: "*",
        tables: "service.applicants",
        where: "id = $1",
        values: [id]
    });
    let extCandidateSkills = [];
    let extCandidateTags = [];
    for (const skillId of candidate.skills) {
        extCandidateSkills.push(await skillById(skillId, db));
    }
    for (const tagId of candidate.tags) {
        extCandidateTags.push(await skillById(tagId, db));
    }
    return {
        ...candidate,
        skills: extCandidateSkills,
        tags: extCandidateTags
    } as unknown as CandidateModel;
}
