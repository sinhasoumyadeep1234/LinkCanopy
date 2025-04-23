"use client"
import React, {Suspense} from "react";
import Generate from "./generate-content";
export const dynamic = 'force-dynamic';

export default function GeneratePage(){
  return(
    <Suspense fallback={<div>Loading...please wait</div>}>
      <Generate/>
    </Suspense>
  );
}