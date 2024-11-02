import React, {useState} from 'react';
import SingleFileUploader from '../components/SingleFileUploader';
import SendFilesButton from '../components/SendFilesButton';
import FileWithID from '../components/FileWithID';

function Test() {
  const [files, setFiles] = useState([null, null, null])

  return (
    <div class="flex-row h-96 space-y-40 outline-20">
      <div>
        <h1>Stores test file to backend. Need to start backend first: </h1>
      </div>
      <div>
        <SingleFileUploader setFile={(e => setFiles(prevFiles => [new FileWithID(e, 0, 0, true), prevFiles[1], prevFiles[2]]))} />
        <SingleFileUploader setFile={(e => setFiles(prevFiles => [prevFiles[0], new FileWithID(e, 0, 1, true), prevFiles[2]]))} />
        <SingleFileUploader setFile={(e => setFiles(prevFiles => [prevFiles[0], prevFiles[1], new FileWithID(e, 0, 2, false)]))} />
        <SendFilesButton filesWithID={files}/>
      </div>
    </div>
  );
}

export default Test;