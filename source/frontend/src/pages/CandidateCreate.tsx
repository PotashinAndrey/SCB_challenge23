import type { FC } from "react";
import { useForm } from 'effector-react-form';
import { useUnit } from "effector-react";
import { Button } from "antd";

import { candidateCreateForm, candidateCreateFormSubmit, $newCandidate } from '../context/candidate';
import { InputField, TextAreaField } from '../form/input';
import { SelectField } from '../form/select';
import { RadioField } from '../form/radio';
import { DatePickerField } from "../form/datePicker";

import "../style/CandidateCreate.css";
import { InputTagField } from "src/form/inputTag";

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

const CandidateCreate: React.FC = () => {
    const { controller, handleSubmit } = useForm({ form: candidateCreateForm });
    const values = useUnit(candidateCreateForm.$values)

    const handleCreate = () => {
        console.log(JSON.stringify(values, null, 2))
    }

    return (
        <div className="candidateCreatePage boxAndRadius">
            <InputField controller={controller({ name: "name" })} label={"Имя"} />
            <InputField controller={controller({ name: "position" })} label={"Позиция"} />
            <InputField controller={controller({ name: "salary" })} label={"Зарплата"} />
            <InputField controller={controller({ name: "experience" })} label={"Опыт"} />

            <InputTagField controller={controller({ name: "tags" })} label={"Теги"} />
            <InputTagField controller={controller({ name: "skills" })} label={"Навыки"} />

            <RadioField controller={controller({ name: "sex" })} label={"Пол"} options={SEX} />
            <DatePickerField controller={controller({ name: "birthDate" })} label={"День Рожденья"} placeholder="Выберете дату" />
            <TextAreaField controller={controller({ name: "descriptionText" })} label={"Описание"} />

            <div className="boxAndRadius candidateCreatePageContacts" >
                <h5>Контакты</h5>
                <InputField controller={controller({ name: "email" })} label={"Почта"} />
                <InputField controller={controller({ name: "phone" })} label={"Телефон"} />
                <InputField controller={controller({ name: "telegram" })} label={"Телеграм"} />
                <InputField controller={controller({ name: "vk" })} label={"ВКонтакте"} />
            </div>

            <TextAreaField controller={controller({ name: "notes" })} label={"Заметки"} />
            <SelectField controller={controller({ name: "department" })} label={"Департамент"} options={DEPARTMENTS} />

            <Button onClick={candidateCreateFormSubmit}>Создать</Button>
        </div>
    );
}

export default CandidateCreate;
