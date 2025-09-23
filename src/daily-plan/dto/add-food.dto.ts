import { IsInt, Min } from 'class-validator';

export class AddFoodToDailyPlanDto {
    @IsInt()
    foodId: number;

    @IsInt()
    @Min(1)
    quantity: number; // opcional si querés soportar más de 1 porción
}