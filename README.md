
# Media Sharing Platform


**Running the Project**

1. **Prerequisites:** Ensure your database is running and properly configured. Double-check the connection strings in `connectDB.ts` (using MongoDb). If necessary, you can modify these strings directly in the file.

2. **Backend Server:**

   - Open a terminal and navigate to the `backend` directory within your project root.
   - Run the following command to start the backend server using TypeScript and Node.js:

     ```bash
     npx ts-node src/index.ts
     ```

3. **Frontend (Mobile or Web):**

   - Open a separate terminal and navigate to the desired frontend directory (either `mobile/mediasharing` or `web/mediasharing`).
   - Run the following command to start the frontend development server:

     ```bash
     npm start
     ```

**Key Points:**

- **Database:** Verify that your database is running and accessible by the backend server.
- **Ports:** If you plan on using different ports than the ones defined in `index.ts`, make sure you add it.
- **Connection Strings:** Review and adjust the connection strings in `connectDB.ts` if needed.
- **Terminal Navigation:** Use separate terminal instances for running the backend and frontend servers.


