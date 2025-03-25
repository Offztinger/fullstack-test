/**
 *
 * @param {KEY} key
 * @param {VALUE} value
 */

export const setDataLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const CATEGORY = {
  WORK: "Laboral",
  STUDY: "Academico",
  PERSONAL: "Personal",
  HEALTH: "Salud",
  OTHER: "Otro",
};

export const STATUS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  COMPLETED: "Completada",
};

export const DAYS = {
  Sunday: "Domingo",
  Monday: "Lunes",
  Tuesday: "Martes",
  Wednesday: "Miércoles",
  Thursday: "Jueves",
  Friday: "Viernes",
  Saturday: "Sábado",
};
