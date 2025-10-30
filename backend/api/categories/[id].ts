import type { VercelRequest, VercelResponse } from "@vercel/node";
import { authUser } from "../../middleware/authUser";
import { getDb } from "../../lib/db";
import { ObjectId } from "mongodb";
import { count } from "console";

interface CategoryBody {
  name: string;
  emoji: string;
  color?: string;
  subcategories?: string[];
}

async function handler(req: VercelRequest, res: VercelResponse) {
  const { userId } = req.body;
  const { id } = req.query;

  if (req.method === "GET") {
    const db = await getDb();
    const expensesCollection = db.collection("expenses");
    const usersCollection = db.collection("users");

    const foundUser = await usersCollection.findOne({
      _id: ObjectId.createFromHexString(userId),
    });

    if (!foundUser) throw new Error("User not found");

    const userExpenses = await expensesCollection
      .find({
        userId,
      })
      .toArray();

    const foundExpenses = userExpenses.filter(
      (expense) => expense.categoryId === id
    );

    return res
      .status(200)
      .json({ used: foundExpenses.length > 0, count: foundExpenses.length });
  }

  if (req.method === "DELETE") {
    const used = req.query.used === "true";

    try {
      const db = await getDb();
      const categoriesCollection = db.collection("categories");
      const subcategoriesCollection = db.collection("subcategories");
      const usersCollection = db.collection("users");

      const foundUser = await usersCollection.findOne({
        _id: ObjectId.createFromHexString(userId),
      });

      if (!foundUser) throw new Error("User not found");

      if (!used) {
        await categoriesCollection.deleteOne({
          _id: ObjectId.createFromHexString(id as string),
        });

        await subcategoriesCollection.deleteMany({
          categoryId: id,
        });

        return res.status(200).json({ message: "Category removed" });
      }

      await categoriesCollection.updateOne(
        { _id: ObjectId.createFromHexString(id as string) },
        {
          $set: {
            deleted: true,
          },
        }
      );

      await subcategoriesCollection.updateMany(
        { categoryId: id },
        {
          $set: {
            deleted: true,
          },
        }
      );

      return res.status(200).json({ message: "Category deleted" });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    const { name, emoji, color, subcategories } = req.body as CategoryBody;

    try {
      const db = await getDb();
      const categoriesCollection = db.collection("categories");
      const subcategoriesCollection = db.collection("subcategories");
      const usersCollection = db.collection("users");

      const foundUser = await usersCollection.findOne({
        _id: ObjectId.createFromHexString(userId),
      });

      if (!foundUser) throw new Error("User not found");

      await categoriesCollection.updateOne(
        {
          _id: ObjectId.createFromHexString(id as string),
        },
        {
          $set: {
            name,
            emoji,
            color,
          },
        }
      );

      if (subcategories) {
        const currentSubcategories = await subcategoriesCollection
          .find({
            categoryId: id,
          })
          .toArray();

        const currentSubcategoryNames = currentSubcategories.map(
          (subcategory) => subcategory.name
        );

        const newSubcategories = subcategories.filter(
          (subcategory) => !currentSubcategoryNames.includes(subcategory)
        );

        const removedSubcategories = currentSubcategoryNames.filter(
          (subcategory) => !subcategories.includes(subcategory)
        );

        if (newSubcategories.length > 0) {
          const subcategoryDocuments = newSubcategories.map((subcategory) => ({
            name: subcategory,
            categoryId: id,
          }));
          await subcategoriesCollection.insertMany(subcategoryDocuments);
        }

        if (removedSubcategories.length > 0) {
          await subcategoriesCollection.deleteMany({
            name: { $in: removedSubcategories },
          });
        }
      }

      return res.status(200).json({ message: "Category updated" });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.end();
}

export default authUser(handler);
