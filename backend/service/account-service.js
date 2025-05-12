import { Account } from "../model/account-model.js";

export const findBalance = async (userId) => {
  const account = await Account.findOne({ userId });
  if (!account) {
    throw new Error("Account not found");
  }
  return account.balance / 100;
};
export const transferAmount = async (senderId, recipientId, amount) => {
  const senderAccount = await Account.findOne({ userId: senderId });
  if (!senderAccount) {
    throw new Error("Account not found");
  }
  if (senderAccount.balance < amount) {
    throw new Error("Insufficient balance");
  }
  const recipientAccount = await Account.findOne({ userId: recipientId });
  if (!recipientAccount) {
    throw new Error("Account not found");
  }
  amount = amount * 100;
  senderAccount.balance -= amount;
  recipientAccount.balance += amount;
  await senderAccount.save();
  await recipientAccount.save();
  return { message: "Transfer successful" };
};
