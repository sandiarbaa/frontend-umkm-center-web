"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";

type FileInputExampleProps = {
  title: string;
  setter: React.Dispatch<React.SetStateAction<File | null>>;
  setPreview?: React.Dispatch<React.SetStateAction<string>>;
  error?: string; 
};

export default function FileInputExample({ title, setter, error, setPreview }: FileInputExampleProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      alert("Format file tidak valid. Hanya jpg, jpeg, atau png yang diperbolehkan.");
      event.target.value = ""; // reset input file
      return;
    }

    if (file.size > maxSize) {
      alert("Ukuran file maksimal 2MB.");
      event.target.value = "";
      return;
    }

    setter(file);
    if (setPreview) setPreview(URL.createObjectURL(file));
  };


  return (
    <ComponentCard title={title} className="w-full md:w-[500px] 2xl:w-[700px] h-60">
      <div>
        <Label>Upload file</Label>
        <FileInput onChange={handleFileChange} className="custom-class" />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </ComponentCard>
  );
}
