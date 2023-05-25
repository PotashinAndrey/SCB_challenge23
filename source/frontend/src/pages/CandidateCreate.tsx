import type { FC } from "react";
import { useForm } from 'effector-react-form';
import { Button } from "antd";

import { candidateCreateForm, candidateCreateFormSubmit, $newCandidate } from '../context/candidate';
import { InputField, TextAreaField } from '../form/input';
import { SelectField } from '../form/select';
import { RadioField } from '../form/radio';
import { DatePickerField } from "../form/datePicker";

import "../style/CandidateCreate.css";

const SEX = [{
    name: "Муж.",
    value: "male"
}, {
    name: "Жен.",
    value: "female"
}]

const DEPARTMENTS = [{
    name: "Разработка",
    value: "development"
}, {
    name: "Менеджмент",
    value: "managmet"
}, {
    name: "Саппорт",
    value: "support"
}];

const CandidateCreate: React.FC = () => {
    const { controller, handleSubmit } = useForm({ form: candidateCreateForm });

    const handleCreate = () => {
        console.log(candidateCreateForm)
    }

    return (
        <div className="candidateCreatePage boxAndRadius">
            <InputField controller={controller({ name: "name" })} label={"Имя"} />
            <InputField controller={controller({ name: "position" })} label={"Позиция"} />
            <InputField controller={controller({ name: "salary" })} label={"Зарплата"} />

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

            <Button onClick={handleCreate}>Создать</Button>
        </div>
    );
}

export default CandidateCreate;
