import { IsDateString, IsInt, Min } from 'class-validator';

export class CreateDailyPlanDto {
    @IsDateString()
    date: string;

    @IsInt()
    @Min(0)
    caloriesMax: number;
}
