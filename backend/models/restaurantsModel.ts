import mongoose, { Document, Schema } from "mongoose";
interface IRestaurants extends Document {
  theme: string;
  title: string;
  delivery_time: string;
  rating: number;
  img: string;
}

const RestaurantsSchema = new Schema<IRestaurants>({
  theme: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  delivery_time: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const RestaurantsCard = mongoose.model<IRestaurants>(
  "RestaurantsCard",
  RestaurantsSchema,
  "restaurants"
);
export default RestaurantsCard;
