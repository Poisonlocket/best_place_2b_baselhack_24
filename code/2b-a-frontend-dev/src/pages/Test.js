import React, {useState} from 'react';
import SingleFileUploader from '../components/SingleFileUploader';
import SendFilesButton from '../components/SendFilesButton';

function Test() {
  const [files, setFiles] = useState(null)

  return (
    <div class="h-96 space-y-40 outline-20">
      <div>
        <h1>Stores test file to backend. Need to start backend first: </h1>
      </div>
      <div class="flex justify-between space-x-4 space-y-4">
        <SingleFileUploader class="flex-1" setFile={(e => setFiles([e]))} />
        <SendFilesButton class="flex-1" filesWithID={files}/>
      </div>
    </div>
  );
}

export default Test;