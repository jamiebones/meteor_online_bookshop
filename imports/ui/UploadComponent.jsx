import React, { useEffect, useState } from "react";
import { Files } from "../api/files/files.js";

export default MultipleUploads = ({ bookId, closeUploadComponent }) => {
  const [progress, setProgress] = useState([]);
  const [fileEvent, setFileEvent] = useState([]);
  const [fileStatus, setFileStatus] = useState([]);
  const [error, setError] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [count, setCount] = useState("0");

  useEffect(() => {
    if (count == 2 ) {
      //we have succesfully uploaded all files
      closeUploadComponent();
    }
  }, [count]);

  useEffect(() => {
    if (fileUploading) {
      const fileInput = document.getElementById("multifile-input");
      fileInput.value = "";
    }
  }, [fileUploading]);

  const showUploads = (progress, fileStatus) => {
    if (fileEvent.length == 0) {
      return null;
    }
    return (
      <div>
        <p> {fileStatus}</p>
        <div className="progress">
          <div
            style={{ width: progress + "%" }}
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow={progress || 0}
            role="progressbar"
            className="progress-bar"
          >
            <span className="center-text">{progress} %</span>
          </div>
        </div>
      </div>
    );
  };

  const fileUploadFunction = (file, index) => {
    let uploadInstance = Files.insert(
      {
        file: file,
        meta: {
          bookId: bookId,
        },
        transport: "ddp",
        chunkSize: "dynamic",
      },
      false
    );

    uploadInstance.start(); // Must manually start the upload

    setFileEvent((prev) => {
      const newFileEvent = [...prev];
      newFileEvent[index] = uploadInstance;
      return newFileEvent;
    });

    uploadInstance.on("start", function (error, fileObj) {
      setFileStatus((prevFileStatus) => {
        const newFileStatus = [...prevFileStatus];
        newFileStatus[index] = "starting uploading for " + fileObj.name;
        return newFileStatus;
      });
    });

    uploadInstance.on("end", function (error, fileObj) {
      setFileStatus((prevFileStatus) => {
        const newFileStatus = [...prevFileStatus];
        newFileStatus[index] = "finish uploading for " + fileObj.name;
        return newFileStatus;
      });
    });

    uploadInstance.on("uploaded", function (error, fileObj) {
      //remove the instance here
      setFileEvent((prev) => {
        return prev.slice(index, 1);
      });
      setCount((prevCount) => +prevCount + 1);
    });

    uploadInstance.on("error", function (error, fileObj) {
      setError((prevError) => {
        const newError = [...prevError];
        newError[index] = `Error uploading ${fileObj.name} : error`;
        return newError;
      });
    });

    uploadInstance.on("progress", function (progress, fileObj) {
      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] = progress;
        return newProgress;
      });
    });
  };

  const uploadFunction = (e) => {
    e.preventDefault();
    //set the state variable to their default value
    setProgress([]);
    setFileEvent([]);
    setFileStatus([]);
    setError([]);
    setFileUploading(false);
    if (e.target.files) {
      let files = e.target.files;
      let filesArr = Array.from(files);
      setFileUploading(true);
      for (let i = 0; i < 2; i++) {
        const file = filesArr[i];
        //please do validation here
        try {
          fileUploadFunction(file, i);
        } catch (error) {
          console.log("error ", error);
        }
      }
    }
  };

  return (
    <div className="container-div">
      <p className="title">Uploading the book and cover image</p>
      <input
        type="file"
        onChange={uploadFunction}
        multiple
        id="multifile-input"
      />

      {error.length > 0 &&
        error.map((error, index) => {
          return (
            <p key={index} className="text-danger">
              {error}
            </p>
          );
        })}

      {progress &&
        progress.length > 0 &&
        progress.map((prog, index) => {
          return (
            <div key={index}>
              {showUploads(prog, fileStatus[index])}
            </div>
          );
        })}
    </div>
  );
};
