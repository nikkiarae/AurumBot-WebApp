import { Context } from "telegraf";
import { ForceReply, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove } from "telegraf/typings/core/types/typegram";

export interface CustomContext extends Context {
    startPayload?: string; // Add the startPayload property
}

export interface Feature {
    number: number
    title: string,
    description: string
}

export interface ReplyMarkup {
    parse_mode: string
    inlineKeyboard: string[]
}
export interface TgMessage {
    message: string
    replyMarkup: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply | undefined
    photo: string 
}