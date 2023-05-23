import { createEffect, createEvent, createStore, sample } from "effector";
import { createForm } from "effector-react-form";
import api from "../../scripts/api";

export const $user = createStore({});

export const loginForm = createForm();

export const loginFormSubmit = createEvent<any>();

const loginFx = createEffect((values: any) => location.hash = "/rooms-filters");

sample({
    clock: loginFormSubmit,
    source: loginForm.$values,
    fn: (source, clock) => source,
    target: loginFx
});

sample({
    clock: loginFx.doneData,
    // fn: data => data
    target: $user
});