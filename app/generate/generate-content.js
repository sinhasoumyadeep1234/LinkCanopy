"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const Generate = () => {
  // getting search params from home page input box
  const searchParams = useSearchParams();

  //state to hold multiple link datas
  const [Linkdata, setLinkdata] = useState([]);

  // state for holding the current handler
  const [currenthandler, setcurrenthandler] = useState("");

  // state to freeze the handler value from changing, can only be changed when finally all links of a particular handler are submitted
  const [handleFrozen, sethandeFrozen] = useState(false);

  // state to hold link and other properties..in handle input field we can store the handle received from frontend input box using search params which can also be changed if needed..just for the sake of autofill
  const [data, setdata] = useState({
    link: "",
    linkText: "",
    handler: searchParams?.get("handle") || "",
  });

  // state to hold image url:
  const [imgUrl, setimgUrl] = useState("");

  // handleChange function for inputs
  const handlChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const addLink = async () => {
    if (!data.handler || !data.link || !data.linkText) {
      toast.warning("Please fill all the required fields");
      return;
    }

    if (!currenthandler) {
      setcurrenthandler(data.handler); // If handler is not set, assign it from data
    }

    console.log("Data has", data);
    console.log("Linkdata has", Linkdata);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      link: data.link,
      linkText: data.linkText,
      handler: data.handler,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        toast.success("✅ Link added successfully");
        // Re-fetch from DB after POST completes
        const res = await fetch("/api/getlinks");
        const fetched = await res.json();

        // only add the
        setLinkdata(fetched.result);

        // Lock the handler after the first successful link is added
        sethandeFrozen(true); //so that we cant change handler value, we can again change only after final submit...

        // then empty the state that holds the current link data without the handler value
        setdata({ ...data, link: "", linkText: "" });
      })
      .catch((error) => {
        toast.error("❌ Link insertion failure", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
        setdata({ link: "", linkText: "", handler: "" });
        console.error(error);
      });
  };

  //submission of all the links finally
  const handleSubmitLinks = async () => {
    if (Linkdata.length === 0) {
      toast("⚠️ No links to save!");
      return;
    }
    if (imgUrl === "") {
      toast.warning("Please add the image url and then submit");
      return;
    }

    // Use the currentHandler instead of the first link's handler
    const handler = currenthandler;

    // now create an array that will have only the links that have same handler names rather than updating the linkdata state that has all the links...this approach is better
    const filteredLinks = Linkdata.filter((link) => link.handler === handler);

    // now instead of sending the linkdata state as links send this array instead

    const res = await fetch("/api/finalize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        handler: handler,
        links: filteredLinks,
        imgUrl: imgUrl,
      }),
    });

    const result = await res.json();

    if (result) {
      toast.dark(result.message);

      // reset the frozen state to accept new handler
      sethandeFrozen(false);
      // reset the link storing state
      setLinkdata([]);
      setimgUrl("");
      setdata({ link: "", linkText: "", handler: "" });
      setcurrenthandler(""); // Reset the handler after submission

      // call the fetch links again to fetch added links
      // Re-fetch from DB after POST completes
      const res = await fetch("/api/getlinks");
      const fetched = await res.json();
      setLinkdata(fetched.result);
    }
  };

  // useeffect hook to load previously added links from database
  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch("/api/getlinks");
      const data = await res.json();
      setLinkdata(data.result);
    };
    fetchLinks();
  }, []);

  return (
    <div className="bg-[#D5A334] grid grid-cols-1 sm:grid-cols-2 min-h-screen px-8 py-20 sm:py-40">
      <div className="col1 flex justify-center items-center flex-col">
        <h1 className="font-bold text-5xl">Join LinkCanopy</h1>
        <h5 className="text-xl text-[#676B79] font-medium p-2 sm:2">
          Enter your links below
        </h5>
        {/* input form goes below */}
        <div className="formdiv flex flex-col gap-3 my-2 w-100 sm:w-full">
          <h5 className="text-lg text-[#970303] font-medium">
            Step 1: Choose your handler (Please note you can only change this
            handler after final submission⚠️)
          </h5>
          {handleFrozen && (
            <p className="text-sm text-red-800">
              🔒 Handler is locked after first link is added. Handler can be
              again added after final submission
            </p>
          )}
          {/* disable this input based on freeze state value */}
          <input
            type="text"
            name="handler"
            value={data.handler}
            placeholder="Choose a handle"
            className="rounded-lg px-4 py-2 bg-[#F6F7F5]"
            required
            disabled={handleFrozen}
            onChange={handlChange}
          />
          <h5 className="text-lg text-[#eaeaea] font-medium">
            Step 2: Add your link
          </h5>
          <div className="flex gap-2 justify-between">
            <input
              type="text"
              name="linkText"
              value={data.linkText}
              placeholder="Enter link text"
              className="rounded-lg px-4 py-2 bg-[#F6F7F5] w-1/2"
              required
              onChange={handlChange}
            />
            <input
              type="text"
              name="link"
              value={data.link}
              placeholder="Enter link"
              className="rounded-lg px-4 py-2 bg-[#F6F7F5] w-1/2"
              required
              onChange={handlChange}
            />
          </div>
          <button
            className="px-3 py-2 bg-[#66BB6A] text-white font-semibold rounded-lg cursor-pointer m-auto w-1/4 hover:bg-green-600"
            onClick={addLink}
          >
            Add link
          </button>

          {Linkdata && (
            <>
              <h2 className="text-white font-semibold text-lg">
                Your previously added links :
              </h2>

              <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {Linkdata.map((item, index) => (
                  <div key={index} className="cursor-pointer rounded-xl my-1">
                    <h5 className="text-slate font-semibold text-xs sm:text-xl bg-amber-100 p-2 rounded-xl">
                      Link no : {index + 1} , Link text : {item.linkText} , Link
                      url : {item.link}
                    </h5>
                  </div>
                ))}
              </div>
            </>
          )}

          <h5 className="text-lg text-[#eaeaea] font-medium">
            Step 3: Add a picture and finalize
          </h5>
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            placeholder="Enter link to your image"
            className="rounded-lg px-4 py-2 bg-[#F6F7F5]"
            required
            onChange={(e) => setimgUrl(e.target.value)}
          />
          <button
            className="px-3 py-2 bg-[#1d7521] text-white font-semibold rounded-lg cursor-pointer m-auto w-1/3 hover:bg-green-900 text-sm sm:text-lg"
            onClick={handleSubmitLinks}
          >
            Add your Link to LinkCanopy
          </button>
        </div>
      </div>
      <div className="col2 h-full flex justify-center items-center">
        <img
          style={{ height: "695px" }}
          src="/generate2.png"
          alt="generate"
          className="max-h-[90vh] object-contain"
        />
        {/* toast container can be added anywhere */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={false}
          rtl={false}
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Generate;
