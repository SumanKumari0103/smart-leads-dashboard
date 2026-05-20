import { Request, Response } from "express";
import Lead from "../models/Lead";

// CREATE LEAD
export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, status, source } =
      req.body;

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
    });

    res.status(201).json(lead);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// GET ALL LEADS
export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit = 10;

    const skip = (page - 1) * limit;

    const search =
      req.query.search as string;

    const status =
      req.query.status as string;

    const source =
      req.query.source as string;

    const sort =
      req.query.sort as string;

    let query: any = {};

    // SEARCH
    if (search) {
      query.$or = [
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
      ];
    }

    // FILTER STATUS
    if (status) {
      query.status = status;
    }

    // FILTER SOURCE
    if (source) {
      query.source = source;
    }

    // SORTING
    let sortOption = {};

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    } else {
      sortOption = {
        createdAt: -1,
      };
    }

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total =
      await Lead.countDocuments(query);

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(
        total / limit
      ),
      leads,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// UPDATE LEAD
export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedLead =
      await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(updatedLead);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// DELETE LEAD
export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    await Lead.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Lead deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};