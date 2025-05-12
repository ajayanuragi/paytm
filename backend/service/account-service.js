import mongoose from "mongoose";
import { Account } from "../model/account-model.js";

export const findBalance = async (userId) => {
  const account = await Account.findOne({ userId });
  if (!account) {
    throw new Error("Account not found");
  }
  return account.balance / 100;
};
export const transferAmount = async (senderId, recipientId, amount) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (isNaN(amount) || amount <= 0) {
      throw new Error("Invalid transfer amount");
    }
    const transferAmountInPaise = amount * 100;

    const senderAccount = await Account.findOne({ userId: senderId }).session(
      session
    );
    if (!senderAccount) {
      throw new Error(`Sender account with user ID ${senderId} not found`);
    }

    if (senderAccount.balance < transferAmountInPaise) {
      throw new Error("Insufficient balance in sender's account");
    }

    const recipientAccount = await Account.findOne({
      userId: recipientId,
    }).session(session);
    if (!recipientAccount) {
      throw new Error(
        `Recipient account with user ID ${recipientId} not found`
      );
    }

    senderAccount.balance -= transferAmountInPaise;
    recipientAccount.balance += transferAmountInPaise;

    await senderAccount.save({ session });
    await recipientAccount.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { message: "Transfer successful" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction failed: ", error);
    throw error;
  } finally {
    if (session.inTransaction()) {
      await session.endSession();
    }
  }
};
