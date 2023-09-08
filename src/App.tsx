import React, { useRef } from "react";
import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebase_setup/firebase"

const App = () => {
  const dataRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const ref = collection(firestore, "test") 
    
    try {
        addDoc(ref, {data: dataRef.current!.value})
    } catch(err) {
        console.log(err)
    }
  
    dataRef.current!.value = "";
  }

  return (
    <div>
      <p>Your cleaned App component</p>
      <form onSubmit={handleSubmit}>
        <input type= "text" ref={dataRef} />
        <button type = "submit">Save</button>
      </form>
    </div>
    
  );
};

export default App;
