import { IStore } from "../reducers";
import { Server } from "../server";

export const requestOTP = (state: IStore): Server<string> => state.profile.forgotPassword.forgotPasswordRequest;

export const newPasswordChangeStatus = (state: IStore): Server<string> => state.profile.forgotPassword.forgotPassword;

export const newTemporaryPasswordRequest = (state: IStore): Server<string> => state.profile.reSendTemporaryPassword;