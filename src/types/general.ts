import { Context } from "telegraf";
import { ForceReply, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove } from "telegraf/typings/core/types/typegram";

export interface SessionData {
    state: string | null | undefined;
    chatId: number | null | undefined;
  }
export interface CustomContext extends Context {
    startPayload?: string; // Add the startPayload property
    session: SessionData;
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

export interface PaymentLinkResponse { success: boolean; data?: string; error?: string }

export interface App {
    icon: string
    name: string
    description: string
    steps: string[]
    link: string,
    androidLink: string,
    iosLink: string
}