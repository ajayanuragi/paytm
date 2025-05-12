import { Account } from "../model/account-model.js";

export const findBalance = async (userId) => {
  const account = await Account.findOne({userId});
  if (!account) {
    throw new Error("Account not found");
  }
  return account.balance / 100;
};
