import IFormStatusProps from "../models/FormStatus.model";

export const formStatusProps: IFormStatusProps = {
  success: {
    message: "Signed up successfully",
    type: "success",
  },
  duplicate: {
    message: "Email already exist. Please login",
    type: "error",
  },
  wrongPassword: {
    message: "Wrong password. Please try again",
    type: "error",
  },
  userNotFound: {
    message: "User not found. Please try again",
    type: "error",
  },
  error: {
    message: "Something went wrong. Please try again",
    type: "error",
  },
};
