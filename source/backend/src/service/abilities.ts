import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { AbilityModel } from "@app/types/model/ability";
import { candidateByID }from './candidates';
import { skillById } from "./skills";

export const abilityById = async (id: UUID, db: DB) => {
    const result = await db.selectRow<AbilityModel>({
        fields: "*",
        tables: "service.abilities",
        where: "id = $1",
        values: [id]
    });
    return result;
};

export const abilitiesByCandidate = async (candidate: UUID, db: DB) => {
    const result = await db.select<AbilityModel>({
        fields: '*',
        tables: 'service.abilities',
        where: 'applicant = $1',
        values: [candidate]
    });
    for (let i = 0; i < result.length; i++) {
        const ability = result[i];
        const extAbility = {
            ...ability,
            applicant: await candidateByID(ability.applicant, db),
            skill: await skillById(ability.skill, db)
        }
        result[i] = extAbility as unknown as AbilityModel;
    }
    return result;
};

export const createAbility = async (values: AbilityModel, db: DB) => {
    const { applicant, skill, level, description } = values;
    console.log('Создание способоности');
    const newAbility = await db.insert({
        fields: "applicant, skill, level, description",
        tables: "service.abilities",
        values: [applicant, skill, level, description],
        returning: "id"
    });
    console.log('Способность создана');
    return newAbility;
};
