import { ExperienceLevel } from "./AssOfferCandidate";
import { Question } from "./Question";

export interface QuestionCategory{
    id ?:number;
    name ?: string;
    questions ?:Question[] ;
    level ?: ExperienceLevel;
    questionTypeNum: number;
}

export enum QuestionnaireType{
    FOR_EMPLOYEES="FOR_EMPLOYEES",
    FOR_CANDIDATES="FOR_CANDIDATES"
}