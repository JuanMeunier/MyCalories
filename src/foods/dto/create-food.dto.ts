import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateFoodDto {
    @IsNotEmpty()
    name: string;

    @IsInt()
    @Min(0)
    calories: number;

    @IsInt()
    @Min(0)
    proteins: number;

    @IsInt()
    @Min(0)
    carbs: number;

    @IsInt()
    @Min(0)
    fats: number;

    @IsNotEmpty()
    isPublic: boolean;

    @IsInt()
    @Min(1)

    userId: number;


}
