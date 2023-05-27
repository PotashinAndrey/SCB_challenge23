import { FC, useEffect, useState } from "react";
import { useForm } from 'effector-react-form';
import { useUnit } from "effector-react";
import { Button, Divider, Typography  } from "antd";

import { candidateCreateForm, candidateCreateFormSubmit, $newCandidate } from '../context/candidate';
import { DocsUploadField, InputField, TextAreaField } from '../form/input';
import { SelectField } from '../form/select';
import { RadioField } from '../form/radio';
import { DatePickerField } from "../form/datePicker";

import "../style/CandidateCreate.css";
import { InputTagField } from "../form/inputTag";
import api from "../scripts/api";

const SEX = [{
    name: "Муж.",
    value: "male"
}, {
    name: "Жен.",
    value: "female"
}]

const DEPARTMENTS = [{
    label: "Разработка",
    value: "development"
}, {
    label: "Менеджмент",
    value: "managmet"
}, {
    label: "Саппорт",
    value: "support"
}, {
    label: "Розница",
    value: "retail"
}, {
    label: "Тестирование",
    value: "testing"
}, {
    label: "Анализ данных",
    value: "dataAnalysis"
}];

const { Title } = Typography;

type TSkill = {
    id: string;
    name: string;
    tag: boolean;
}

type TTagItem = {
    label: string, value: string
};
const CandidateCreate: React.FC = () => {
    const { controller, handleSubmit } = useForm({ form: candidateCreateForm });
    const [skillsList, setSkillsList] = useState<Array<TTagItem>>([]);
    const [tagsList, setTagsList] = useState<Array<TTagItem>>([]);

    useEffect(() => {
        api('skills/list').then((result) => {
            // @ts-ignore
            const items: TSkill[] = result.items;
            console.log('skills: ', items);
            const tags = (items as TSkill[])
                .filter((skill) => skill.tag)
                .map((item: TSkill) => { return {value: item.id, label: item.name }});
            setTagsList(tags as TTagItem[]);
            const skills = (items as TSkill[])
                .filter((skill) => !skill.tag)
                .map((item: TSkill) => { return {value: item.id, label: item.name }});
            setSkillsList(skills as TTagItem[]);
        });
    }, []);
    return (
        <div className="candidateCreatePage boxAndRadius">
            <Title level={4}>Основная информация</Title>
            <InputField controller={controller({ name: "name" })} label={"Имя"} />
            <DocsUploadField controller={controller({ name: "photo" })} label={"Фото кандидата"} />

            <RadioField controller={controller({ name: "sex" })} label={"Пол"} options={SEX} />
            <DatePickerField controller={controller({ name: "birthdate" })} label={"День Рожденья"} placeholder="Выберете дату" />

            <Divider />
            <Title level={4}>Профессиональные навыки</Title>

            <InputField controller={controller({ name: "position" })} label={"Позиция"} />
            <InputField controller={controller({ name: "salary" })} label={"Зарплата"} />
            <InputField controller={controller({ name: "experience" })} label={"Опыт"} />

            <InputTagField controller={controller({ name: "tags" })} label={"Теги"} data={tagsList as any} />
            <InputTagField controller={controller({ name: "skills" })} label={"Навыки"} data={skillsList as any} />

            <Divider />
            <Title level={4}>Стороние резюме</Title>
            <InputField controller={controller({ name: "link" })} label={"Ссылка на сторонее резюме"} />
            <DocsUploadField controller={controller({ name: "file" })} label={"Файл с резюме"} />

            <Divider />

            <Title level={4}>Контактые кандидата</Title>
            <div className="boxAndRadius candidateCreatePageContacts" >
                <h5>Контакты</h5>
                <InputField controller={controller({ name: "email" })} label={"Почта"} />
                <InputField controller={controller({ name: "phone" })} label={"Телефон"} />
                <InputField controller={controller({ name: "telegram" })} label={"Телеграм"} />
                <InputField controller={controller({ name: "vk" })} label={"ВКонтакте"} />
            </div>

            <Divider />

            <TextAreaField controller={controller({ name: "notes" })} label={"Заметки"} />
            <TextAreaField controller={controller({ name: "description" })} label={"Описание"} />

            <Button onClick={candidateCreateFormSubmit}>Создать</Button>
        </div>
    );
}

export default CandidateCreate;
