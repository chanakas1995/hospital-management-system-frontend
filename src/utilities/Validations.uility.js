import moment from "moment";

// eslint-disable-next-line max-len
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^0\d{9}$/;
const newNicRegex = /^\d{9}[vVxX]$/;
const oldNicRegex = /^\d{12}$/;

export default {
  email: (v, name) =>
    !v ||
    emailRegex.test(String(v).toLowerCase()) ||
    `${name} is not a valid email`,
  nic: (v, name) =>
    !v ||
    newNicRegex.test(String(v).toLowerCase()) ||
    oldNicRegex.test(String(v).toLowerCase()) ||
    `${name} is not a valid nic number`,
  pastOrEqualDate: (v, name) =>
    !v ||
    moment(v).isBefore(moment().add(1, "days").startOf("day")) ||
    `${name} should be a past date`,
  phoneNumber: (v, name) =>
    !v ||
    phoneRegex.test(String(v).toLowerCase()) ||
    `${name} is not a valid phone number`,
  required: (v, name) =>
    (v instanceof Array ? v.length > 0 : !!v) || `${name} field is required`,
};
