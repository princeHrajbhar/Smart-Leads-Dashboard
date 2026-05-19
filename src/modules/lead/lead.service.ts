import { Lead } from "./lead.model";
import { SortOrder } from "mongoose";

export const createLeadService =
  async (body: any) => {
    return await Lead.create(
      body
    );
  };

export const getLeadsService =
  async (query: any) => {
    const {
      page = 1,
      limit = 10,
      status,
      source,
      search,
      sort = "latest",
    } = query;

    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (source) {
      filter.source = source;
    }

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },

        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },

        {
          company: {
            $regex: search,
            $options: "i",
          },
        },

        {
          note: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const sortOption: {
      createdAt: SortOrder;
    } =
      sort === "oldest"
        ? {
            createdAt: 1,
          }
        : {
            createdAt: -1,
          };

    const skip =
      (Number(page) - 1) *
      Number(limit);

    const leads =
      await Lead.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

    const total =
      await Lead.countDocuments(
        filter
      );

    return {
      leads,

      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages:
          Math.ceil(
            total /
              Number(limit)
          ),
      },
    };
  };

export const getSingleLeadService =
  async (id: string) => {
    return await Lead.findById(
      id
    );
  };

export const updateLeadService =
  async (
    id: string,
    body: any
  ) => {
    return await Lead.findByIdAndUpdate(
  id,
  body,
  {
    returnDocument: "after",
    runValidators: true,
  }
);
  };

export const deleteLeadService =
  async (id: string) => {
    return await Lead.findByIdAndDelete(
      id
    );
  };