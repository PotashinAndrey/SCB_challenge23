import { createEffect, createEvent, createStore, sample } from "effector";
import { createForm } from "effector-react-form";
import api from "../../scripts/api";

export const $user = createStore({});

export const registrationForm = createForm();

export const registrationFormSubmit = createEvent<any>();

const registrationFx = createEffect((values: any) => location.hash = "/rooms-filters");

sample({
    clock: registrationFormSubmit,
    source: registrationForm.$values,
    fn: (source, clock) => source,
    target: registrationFx
});

sample({
    clock: registrationFx.doneData,
    // fn: data => data
    target: $user
});