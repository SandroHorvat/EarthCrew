import { atom } from 'recoil';

// State for showing the user with which account he/she is logged in
export const userIdState = atom({
    key: 'userIdKey',
    default: [],
});

export const switchState = atom({
    key: 'switchKey',
    default: false
});

export const valueItemsState = atom({
    key: 'value',
    default: null
});