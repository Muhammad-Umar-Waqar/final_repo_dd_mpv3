import { connectToDatabase } from "../../../../lib/mongodb";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: req.query.locale === "es" ? "Método no permitido." : "Method Not Allowed."
    });
  }

  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Environment variable for admin emails
    const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];

    if (!token || !token.email) {
      return res.status(401).json({
        message: req.query.locale === "es" ? "No autorizado." : "Unauthorized."
      });
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Fetch user from database
    const user = await db.collection("users").findOne({ email: token.email });

    if (!user) {
      return res.status(404).json({
        message: req.query.locale === "es" ? "Usuario no encontrado." : "User not found."
      });
    }

    // Ensure user is an admin either by email or role in DB
    if (!adminEmails.includes(user.email) || user.role !== "admin") {
      return res.status(403).json({
        message: req.query.locale === "es" ? "Acceso denegado." : "Access denied."
      });
    }

    // Pagination params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Extract search and filter queries
    const searchQuery = req.query.search || "";
    const roleFilter = req.query.role || "";
    const statusFilter = req.query.isVerified || "";

    // Build dynamic filter object
    const filter = {};
    if (searchQuery) {
      filter.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } }
      ];
    }

    if (roleFilter) filter.role = roleFilter;
    if (statusFilter !== "") filter.isVerified = statusFilter === "true";

    // Fetch users with pagination and filtering
    const users = await db
      .collection("users")
      .find(filter, {
        projection: { password: 0, verificationToken: 0, verificationTokenExpires: 0, resetPasswordExpires: 0, resetPasswordToken: 0 }
      })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count of filtered users
    const totalUsers = await db.collection("users").countDocuments(filter);

    return res.status(200).json({
      message: req.query.locale === "es" ? "Usuarios obtenidos con éxito." : "Users fetched successfully.",
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page
    });

  } catch (error) {
    console.error("Error fetching users:");
    return res.status(500).json({
      message: req.query.locale === "es" ? "Error al obtener los usuarios." : "Error fetching users."
    });
  }
}
