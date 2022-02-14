export const name_RegExp = new RegExp(/^[A-Za-z ]{3,}$/);
export const username_RegExp = new RegExp(/^[A-Za-z0-9]{3,30}$/);
export const email_RegExp = new RegExp(/^[A-Za-z0-9\.\_]+\@[A-Za-z]+\.[A-Za-z]{2,4}$/);
export const password_RegExp = new RegExp(/^.{5,}$/);

// createGame
export const word_RegExp = new RegExp(/^[A-Za-z]{0,45}$/);
export const trys_RegExp = new RegExp(/^[0-9]{0,2}$/)