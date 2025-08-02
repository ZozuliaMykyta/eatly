import mongoose, { Document, Schema } from "mongoose";

interface IArticles extends Document {
  _id: string;
  article: string;
  img: string;
}

const ArticlesSchema = new Schema<IArticles>({
  _id: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const ArticlesCard = mongoose.model<IArticles>(
  "ArticlesCard",
  ArticlesSchema,
  "articles"
);
export default ArticlesCard;
