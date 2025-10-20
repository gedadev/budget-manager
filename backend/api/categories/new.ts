import type { VercelRequest, VercelResponse } from "@vercel/node";
import { authUser } from "../../middleware/authUser";
import { getDb } from "../../lib/db";
import { ObjectId } from "mongodb";

interface CategoryBody {
  name: string;
  emoji: string;
  color?: string;
  subcategories?: string[];
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, emoji, color, subcategories } = req.body as CategoryBody;
  const { userId } = req.body;

  try {
    const db = await getDb();
    const categoriesCollection = db.collection("categories");
    const subcategoriesCollection = db.collection("subcategories");
    const usersCollection = db.collection("users");

    const foundUser = await usersCollection.findOne({
      _id: ObjectId.createFromHexString(userId),
    });

    if (!foundUser) throw new Error("User not found");

    const newCategory = await categoriesCollection.insertOne({
      name,
      emoji,
      color,
      userId,
    });

    if (subcategories && subcategories.length > 0) {
      const subcategoryDocuments = subcategories.map((subcategory) => ({
        name: subcategory,
        categoryId: newCategory.insertedId.toString(),
      }));

      subcategoriesCollection.insertMany(subcategoryDocuments);
    }

    return res.status(201).json(newCategory);
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    res.status(500).json({ error: "Internal server error" });
  }
}

export default authUser(handler);
