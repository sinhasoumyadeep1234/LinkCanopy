"use client"
// /handle page to accept user input for handle and navigate user to dynamic that route to have their respective links
import { useState } from "react";
import { useRouter } from "next/navigation";


const HandleForm = ()=>{
    const [handleInput, sethandleInput] = useState("");
    const router = useRouter();

    // function to handle the submit feature of form and to redirect user to that specific dynamic handle page
    const handleSubmit = (e)=>{
        e.preventDefault();
        // path should not contain any trailing spaces
        if(handleInput.trim()){
            router.push(`/${handleInput.trim()}`);
        }
    };

    return(
        <div className="gradientDiv min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#333]">Enter Your Handle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="text"
          value={handleInput}
          onChange={(e) => sethandleInput(e.target.value)}
          placeholder="e.g. soumo123"
          className="px-4 py-2 border rounded-lg text-lg"
        />
        <button
          type="submit"
          className="bg-[#ff719a] text-white font-semibold py-2 rounded-lg hover:bg-[#ff4d85] transition-all cursor-pointer"
        >
          Go to LinkCanopy Page
        </button>
        <button
          className="bg-[#10531e] text-white font-semibold py-2 rounded-lg hover:bg-[#413b78] transition-all cursor-pointer" onClick={()=>router.push(`/`)}
        >
          Go back to Home Page
        </button>
      </form>
    </div>
    );
};

export default HandleForm;