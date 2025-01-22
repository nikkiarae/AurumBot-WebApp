import { Schema, Document, model, models } from "mongoose";

export interface ISubscriber extends Document {
  chatId: string;
  isActive: boolean;
  subscriptionEnd: Date;
  autoRenew: boolean;
  role: string
  stripeSubscriptionId: string;
}

const SubscriberSchema: Schema = new Schema({
  chatId: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
  subscriptionEnd: { type: Date },
  autoRenew: { type: Boolean, default: false },
  stripeSubscriptionId: { type: String },
});

const Subscriber = models.Subscriber || model<ISubscriber>("Subscriber", SubscriberSchema);
export default Subscriber;