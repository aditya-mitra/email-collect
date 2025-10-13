import { databases } from "./appwrite";
import { Query } from "appwrite";

const DATABASE_ID = "68ed0bf800127cc12bc0";
const COLLECTION_ID = "emails_collected";

export const emailService = {
  async getAllEmails() {
    try {
      const response = await databases.listRows(DATABASE_ID, COLLECTION_ID, [
        Query.orderDesc("$createdAt"),
      ]);
      return response.rows;
    } catch (error) {
      console.error("Error fetching emails:", error);
      throw error;
    }
  },

  async addEmail(email: string) {
    try {
      const response = await databases.createRow(
        DATABASE_ID,
        COLLECTION_ID,
        "unique()",
        { email }
      );
      return response;
    } catch (error) {
      console.error("Error adding email:", error);
      throw error;
    }
  },

  async getEmailById(documentId: string) {
    try {
      const response = await databases.getRow(
        DATABASE_ID,
        COLLECTION_ID,
        documentId
      );
      return response;
    } catch (error) {
      console.error("Error fetching email:", error);
      throw error;
    }
  },

  async deleteEmail(documentId: string) {
    try {
      await databases.deleteRow(DATABASE_ID, COLLECTION_ID, documentId);
    } catch (error) {
      console.error("Error deleting email:", error);
      throw error;
    }
  },
};
