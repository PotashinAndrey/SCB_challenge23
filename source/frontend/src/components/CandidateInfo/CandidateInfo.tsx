import React from "react";
import { Divider } from 'antd';

import "./CandidateInfo.css";

const CONTACT_TYPES = {
    email: "Почта",
    phone: "Телефон",
    telegram: "Телеграм",
    vk: "ВКонтакте",
}

type CandidateContact = "email" | "phone" | "telegram" | "vk";

interface CandidateInfoProps {
    className?: string;
    name: string;
    role: string;
    img?: string;
    description: {
        birthDate: string;
        sex: string;
        text?: string;
    }
    salary?: number;
    contacts?: {
        email?: string;
        phone?: string;
        telegram?: string;
        vk?: string;
    },
    notes?: string;
}

const candidate = {
  name: "Андрей Поташин",
  role: "middle frontend developer",
  description: {
      birthDate: "29.04.2000",
      sex: "Муж.",
      text: "Работать умею - работать люблю, бизнес ставит задачу - я её делаю."
  },
  salary: 300000,
  contacts: {
      email: "test@test.test",
      phone: "+55555555555",
      telegram: "@potaqqshinAndrey",
      vk: "vk.com",
  },
  notes: "Хороший чел, позитивный, надо брать!"
}

const ContactItem: React.FC<{ value: string, type: CandidateContact }> = props => {
    const {value, type} = props;

    return (
        <div>
            <span className="ContactItemType">{`${CONTACT_TYPES[type]}: `}</span>
            <span>{value}</span>
        </div>
    );
}

const CandidateInfo: React.FC<CandidateInfoProps> = props => {
    const { name, role, description, salary, contacts, notes, className } = props;
    const { email, phone, telegram, vk} = contacts || {};

    return (
        <div className={`candidateInfoComponent ${className}`}>
            <h2 className="candidateInfoName">{name}</h2>
            <div className="candidateInfoRoleAndSalary">
                <span>{role}</span>
                <span>{salary} Руб.</span>
            </div>
            <Divider />
            <div className="candidateInfoDescription">
                <div className="candidateInfoBirthAndSex">
                    <span>Дата рождения: {description.birthDate}</span>
                    <span>Пол: {description.sex}</span>
                </div>
                <Divider />
                <div className="candidateInfoDescriptionText">
                    <h4>Описание:</h4>
                    <span>{description.text}</span>
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
            <div className="candidateInfoNotes">
                <h4>Заметки:</h4>
                <span>{notes}</span>
            </div>
        </div>
    );
}

export default CandidateInfo;
