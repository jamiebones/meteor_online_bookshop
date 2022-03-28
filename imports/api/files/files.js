import { Meteor } from "meteor/meteor";
import { FilesCollection } from "meteor/ostrio:files";
import BooksCollection from "../books/books";
import fs from "fs";

export const Files = new FilesCollection({
  storagePath: "assets/app/uploads/uploadedFiles",
  downloadRoute: "/files/documents",
  collectionName: "Files",
  permissions: 0o755,
  allowClientCode: true,
  cacheControl: "public, max-age=31536000",
  onbeforeunloadMessage() {
    return "Upload is still in progress! Upload will be aborted if you leave this page!";
  },
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in pdf/png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|pdf|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    return false;
  },
  onAfterUpload(file) {
    if (Meteor.isServer) {
      const fileExtension = ["jpg", "jpeg", "png", "gif"];
      if (fileExtension.includes(file.extension)) {
        //we have an image here
        const fileData = fs.readFileSync(file.path);
        const fileToBase64 = fileData.toString("base64");
        BooksCollection.update(
          {
            _id: file.meta.bookId,
          },
          {
            $set: {
              coverImage: fileToBase64,
            },
          }
        );
        //delete the file here
        this.remove(file._id);
      }

      if (file.extension == "pdf") {
        //save the Id of the upload here here,so we can retrieve the book easily
        BooksCollection.update({
          _id: file.meta.bookId
        }, {
          $set: {
            bookurl: file._id
          }
        })
      }
    }
  },
});
