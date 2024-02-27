import { Course } from "../types";

export const emptyCourse = {
  _id: "",
  name: "",
  number: "",
  startDate: "",
  endDate: "",
  term: "",
  image: "",
};

const isValidFormField = (key: string, value: string) => {
  return value === "" ? key === "_id" || key === "image" : true;
};

export const validateForm = (course: Course) => {
  const invalidFields = Object.entries(course).filter(
    ([key, value]) => !isValidFormField(key, value),
  );
  return invalidFields.length === 0;
};
