import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  user: mongoose.Types.ObjectId;
}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model<ITodo>(
  "Todo",
  todoSchema
);

export const createTodoService = async (
  body: any,
  userId: string
) => {
  return await Todo.create({
    ...body,
    user: userId,
  });
};

export const getTodosService = async (
  userId: string,
  role: string
) => {
  if (role === "ADMIN") {
    return await Todo.find().populate(
      "user"
    );
  }

  return await Todo.find({
    user: userId,
  });
};

export const updateTodoService = async (
  id: string,
  body: any,
  userId: string,
  role: string
) => {
  const query =
    role === "ADMIN"
      ? { _id: id }
      : { _id: id, user: userId };

  return await Todo.findOneAndUpdate(
    query,
    body,
    {
      new: true,
    }
  );
};

export const deleteTodoService = async (
  id: string,
  userId: string,
  role: string
) => {
  const query =
    role === "ADMIN"
      ? { _id: id }
      : { _id: id, user: userId };

  return await Todo.findOneAndDelete(
    query
  );
};