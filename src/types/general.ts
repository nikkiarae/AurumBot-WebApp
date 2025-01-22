import { Context } from "telegraf";

export interface CustomContext extends Context {
    startPayload?: string; // Add the startPayload property
}

export interface Feature {
    number: number
    title: string,
    description: string
}