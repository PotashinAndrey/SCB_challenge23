import type { FC } from "react";
import { Divider } from 'antd';

import "../style/CandidateInfo.css";
import Amount from "src/ui/Amount";
import { CandidateModel } from "@app/types/model/candidate";

const CONTACT_TYPES = {
    email: "Почта",
    phone: "Телефон",
    telegram: "Телеграм",
    vk: "ВКонтакте",
}

type CandidateContact = "email" | "phone" | "telegram" | "vk";


const ContactItem: FC<{ value: string, type: CandidateContact }> = props => {
    const { value, type } = props;

    return (
        <div>
            <span className="ContactItemType">{`${CONTACT_TYPES[type]}: `}</span>
            <span>{value}</span>
        </div>
    );
}

const CandidateInfo: FC<CandidateModel & { className: string }> = props => {
    console.log(props)
    const { name, position, description, birthdate, salary, sex, email, telegram, vk, phone, notes, className } = props;

    const contacts = phone || email || vk || telegram;

    return (
        <div className={`candidateInfoComponent ${className}`}>
            <h2 className="candidateInfoName">{name}</h2>
            <div className="candidateInfoRoleAndSalary flex">
                <span>{position}</span>
                {/* <span>{salary} Руб.</span> */}
                <Amount value={Number(salary) || 0} />
            </div>
            <Divider />
            <div className="candidateInfoDescription">
                <div className="candidateInfoBirthAndSex">
                    <span>Дата рождения: {new Date(birthdate).toDateString()}</span>
                    <span>Пол: {sex === "male" ? "Мужской" : "Женский"}</span>
                </div>
                <Divider />
                <div className="candidateInfoDescriptionText">
                    <h4>Описание:</h4>
                    <span>{description}</span>
                </div>
            </div>
            {contacts && (<>
                <Divider />
                <div className="candidateInfoContacts">
                    <h4>Контакты:</h4>
                    {email && (<ContactItem type="email" value={email} />)}
                    {phone && (<ContactItem type="email" value={phone} />)}
                    {telegram && (<ContactItem type="email" value={telegram} />)}
                    {vk && (<ContactItem type="email" value={vk} />)}
                </div>
            </>)}
            <Divider />
            {notes && <div className="candidateInfoNotes">
                <h4>Заметки:</h4>
                <span>{notes}</span>
            </div>}
        </div>
    );
}

export default CandidateInfo;
