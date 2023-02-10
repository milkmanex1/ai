import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSurpriseMe(e) {
    e.preventDefault();
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  }
  async function generate(e) {
    e.preventDefault();
    console.log("starting generate..");
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:3020/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        if (!response.ok) {
          console.log(response);
          if (response.status === 500) {
            alert(
              "Your prompt may contain violent or adult language. Please remove them and try again. Otherwise, it may be a server issue."
            );
          }
        }
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        console.log(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  }

  //Share function seems to be working, because reponse status is 200
  async function handleShare(e) {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        //call our Post image route
        const response = await fetch("http://localhost:3020/api/v1/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form }),
        });
        if (response.status === 201) {
          console.log(response.status);
          console.log("shared successfully");
          //go back to home page
          navigate("/");
        } else {
          console.log(response.status);
          console.log("unable to share. sorry");
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  }

  return (
    <section className="max-w-7xl mx-auto">
      {/*----------------- title--------------- */}
      <div>
        <h1 className="font-extrabold text-black text-2xl">Create</h1>
        <p className="mt-2 text-slate-500 text-md max-w-[800px]">
          Our AI engine can create original, realistic images and art from a
          text description. It can combine concepts, attributes, and styles.
        </p>
        <p className="mt-2 text-slate-500 text-md max-w-[800px]">
          Don't believe us? Enter something in the Prompt below and hit
          'Generate'!
        </p>
      </div>
      <form className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          ></FormField>
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="a fortune-telling shiba inu reading your fate in a giant hamburger, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe={true}
            handleSurpriseMe={handleSurpriseMe}
          ></FormField>

          {/*--------------- generate button-------------- */}
          <div className=" flex gap-5">
            <button
              type="submit"
              className="text-white bg-green-700 font-medium rounded-md text-sm sm:w-auto w-full  px-5 py-2.5 text-center hover:bg-green-700/90"
              onClick={generate}
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>

          {/* --------------image----------- */}
          <div className="relative bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 w-64 p-3  h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.photo}
                className="w-full h-full object-contain"
              ></img>
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              ></img>
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-black rounded-lg">
                <Loader></Loader>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-gray-500 text-md">
            Why not share your masterpiece with the community?
          </p>
          <button
            onClick={handleShare}
            type="submit"
            className="mt-3 text-white bg-indigo-500 font-md rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-indigo-500/90"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
