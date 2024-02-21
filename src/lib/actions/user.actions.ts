"use server";

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mogoose";

// Create
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {}
}

// Read
export async function getUser(clerkId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (err) {}
}

// Update
export async function UpdateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User could not update");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (err) {}
}

// Delete
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user by clerkId
    const user = await User.findOne({ clerkId });

    if (!user) throw new Error("User not found");

    // delete user from database
    const deletedUser = await User.findByIdAndDelete(user._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (err) {}
}

// Update credits
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true },
    );

    if (!updatedUserCredits) throw new Error("User credits could not update");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (err) {}
}
