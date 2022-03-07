import { atom } from 'recoil';

// State for showing the user with which account he/she is logged in
export const userIdState = atom({
    key: 'userIdKey',
    default: [],
});

// State for update the switcher in upload set to not picked up when new photo is taken
export const switchState = atom({
    key: 'switchKey',
    default: false
});

// State for update the dropwdown category picker in upload set to (Select an item) when new photo is taken
export const valueItemsState = atom({
    key: 'value',
    default: null
});