import {Rota} from "./Rota";

export type OnScheduleUploaded = (schedule: Rota) => void;
export type OnUploadError = (reason?: string) => void;
