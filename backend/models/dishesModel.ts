import mongoose, { Document, Schema } from "mongoose";

interface IDishes extends Document {
  theme: string;
  title: string;
  time: string;
  rating: number;
  price: number;
  image: string;
}

const DishesSchema = new Schema<IDishes>({
  theme: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true },
  time: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const DishesCard = mongoose.model<IDishes>(
  "DishesCard",
  DishesSchema,
  "dishes"
);
export default DishesCard;
