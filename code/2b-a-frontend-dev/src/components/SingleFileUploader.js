import React from 'react';

const SingleFileUploader = ({ setFile, file }) => {

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && file.fileContent && (
        <section>
          File details:
          <ul>
            <li>Name: {file.fileContent}</li>
            <li>Type: {file.fileContent}</li>
            <li>Size: {file.fileContent} bytes</li>
          </ul>
        </section>
      )}
    </>
  );
};

export default SingleFileUploader;