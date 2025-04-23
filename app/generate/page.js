<<<<<<< HEAD
"use client"
import React, {Suspense} from "react";
import Generate from "./generate-content";
=======
"use client";
export const dynamic = 'force-dynamic';
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
>>>>>>> 50210a67f32fa0f6f049fbb9dc45f83475f91bae

export default function GeneratePage(){
  return(
    <Suspense fallback={<div>Loading...please wait</div>}>
      <Generate/>
    </Suspense>
  );
}