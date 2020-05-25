import {Rota} from "./Rota";

export type OnUploadSuccess = (rota: Rota) => void;
export type OnUploadError = (reason?: string) => void;
