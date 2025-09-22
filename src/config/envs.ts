import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
    PORT: number;

}

const envSchema = joi.object({
    PORT: joi.number().required(),
})
    .unknown(true);


const { error, value } = envSchema.validate({
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
});

const envVars: EnvVars = value;


export const envs = {
    port: envVars.PORT,

};