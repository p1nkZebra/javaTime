import {Transform, Type} from "class-transformer";

export class RawEvent {
    id: number;
    contributionId: number;
    @Type(() => Date)
        @Transform (value => value != null ? value.toISOString().substring(0, 10) : null , {toPlainOnly: true})
    eventDate: Date;
    comment: string;
    name: string;
    cronPeriod: string;
    userValue: number;

}