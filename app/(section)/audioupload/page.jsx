"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/app/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Upload, Music, Video, X, CheckCircle, Download } from "lucide-react";

export function SidebarDemo() {
  const links = [
    { label: "Home", href: "#", icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-200 transition-colors duration-200 hover:text-blue-400" /> },
    { label: "Profile", href: "#", icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-200 transition-colors duration-200 hover:text-blue-400" /> },
    { label: "Settings", href: "#", icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-200 transition-colors duration-200 hover:text-blue-400" /> },
    { label: "Logout", href: "#", icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-200 transition-colors duration-200 hover:text-blue-400" /> },
  ];

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [summaryStats, setSummaryStats] = useState({
    totalFiles: 0,
    totalTranscriptions: 0,
    totalSummaries: 0,
    lastUpdated: new Date().toLocaleString(),
  });

  useEffect(() => {
    setSummaryStats((prev) => ({
      ...prev,
      totalFiles: files.length,
      totalTranscriptions: files.filter((f) => f.transcription && !f.transcription.startsWith("Error:")).length,
      totalSummaries: files.filter((f) => f.summary && !f.summary.startsWith("Could not generate")).length,
      lastUpdated: new Date().toLocaleString(),
    }));
  }, [files]);

  const handleFileSelect = async (selectedFiles) => {
    const newFiles = Array.from(selectedFiles)
      .filter((file) => file.type.startsWith("audio/") || file.type.startsWith("video/"))
      .map((file) => ({
        file,
        title: file.name.split('.').slice(0, -1).join('.'),
        progress: 0,
        status: "uploading",
        transcription: null,
        summary: null,
        audioUrl: URL.createObjectURL(file),
      }));

    const startIndex = files.length;
    setFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach(async (newFile, index) => {
      const fileIndex = startIndex + index;
      
      const interval = setInterval(() => {
        setFiles((prev) => {
          const updatedFiles = [...prev];
          if (updatedFiles[fileIndex] && updatedFiles[fileIndex].progress < 90) {
            updatedFiles[fileIndex].progress += 10;
            return updatedFiles;
          }
          return prev;
        });
      }, 200);

      try {
        const formData = new FormData();
        formData.append("file", newFile.file);

        const response = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });

        clearInterval(interval);

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.error || "API call failed");
        }
        
        const result = await response.json();

        setFiles((prev) => {
          const updatedFiles = [...prev];
          if (updatedFiles[fileIndex]) {
              updatedFiles[fileIndex].progress = 100;
              updatedFiles[fileIndex].status = "completed";
              updatedFiles[fileIndex].transcription = result.transcription;
              updatedFiles[fileIndex].summary = result.summary;
          }
          return updatedFiles;
        });

      } catch (error) {
        console.error("Error processing file:", error);
        clearInterval(interval);
        setFiles((prev) => {
          const updatedFiles = [...prev];
          if (updatedFiles[fileIndex]) {
            updatedFiles[fileIndex].status = "error";
            updatedFiles[fileIndex].transcription = `Error: ${error.message}`;
            updatedFiles[fileIndex].progress = 100;
          }
          return updatedFiles;
        });
      }
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTitleChange = (index, value) => {
    setFiles((prev) => {
      const updated = [...prev];
      updated[index].title = value;
      return updated;
    });
  };

  const downloadAudio = (audioUrl, fileName) => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <div
      className={cn(
        "flex h-screen w-full flex-col md:flex-row bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody
          className={cn(
            "flex h-full flex-col justify-between gap-10 bg-gradient-to-b from-black via-gray-900 to-gray-800",
            "md:border-r md:border-gray-700"
          )}
        >
          <div className="flex flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className="hover:bg-gray-700/50 rounded-md transition-colors duration-200"
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
              className="hover:bg-gray-700/50 rounded-md transition-colors duration-200"
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 flex-col p-6 overflow-auto">
        <div className="max-w-3xl w-full mx-auto">
          <h1 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            AudioSync Dashboard
          </h1>
          <h2 className="text-2xl font-bold mb-6">Upload Audio/Video</h2>

          <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 rounded-lg p-4 shadow-lg mb-6">
            <h2 className="text-lg font-semibold mb-4">Summary Statistics</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Total Files Uploaded:</p>
                <p className="text-gray-300">{summaryStats.totalFiles}</p>
              </div>
              <div>
                <p className="font-medium">Total Transcriptions:</p>
                <p className="text-gray-300">{summaryStats.totalTranscriptions}</p>
              </div>
              <div>
                <p className="font-medium">Total Summaries:</p>
                <p className="text-gray-300">{summaryStats.totalSummaries}</p>
              </div>
              <div>
                <p className="font-medium">Last Updated:</p>
                <p className="text-gray-300">{summaryStats.lastUpdated}</p>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center mb-6 bg-gradient-to-b from-black via-gray-900 to-gray-800 transition-colors duration-200",
              isDragging ? "border-blue-500 bg-blue-500/20" : "border-gray-600"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="audio/*,video/*"
              multiple
              onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            />
            <Upload className="mx-auto h-12 w-12 text-gray-300 mb-4 transition-colors duration-200 hover:text-blue-400" />
            <p className="text-lg font-medium mb-2">
              {isDragging
                ? "Drop your audio or video files here"
                : "Drag and drop audio or video files here"}
            </p>
            <p className="text-gray-400 mb-4">or</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Files
            </button>
          </div>

          {files.length > 0 && (
            <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 rounded-lg p-4 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Uploading Files</h2>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 p-3 border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 rounded-md transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    {file.file.type.startsWith("video/") ? (
                      <Video className="h-6 w-6 text-gray-300" />
                    ) : (
                      <Music className="h-6 w-6 text-gray-300" />
                    )}
                    <div className="flex-1">
                      <input
                        type="text"
                        value={file.title}
                        onChange={(e) => handleTitleChange(index, e.target.value)}
                        placeholder="Enter title"
                        className="w-full bg-gray-800 text-white text-sm rounded-md p-1 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-sm truncate font-medium">
                        {file.file.name}
                      </p>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                    {file.status === "completed" ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <button
                        onClick={() => removeFile(index)}
                        aria-label={`Remove ${file.file.name}`}
                      >
                        <X className="h-6 w-6 text-gray-400 hover:text-red-500 transition-colors duration-200" />
                      </button>
                    )}
                  </div>
                  {file.status === "completed" && file.audioUrl && (
                    <div className="ml-10">
                      <h3 className="text-md font-semibold">
                        {file.title || "Extracted Audio"}
                      </h3>
                      <audio controls src={file.audioUrl} className="w-full my-2" />
                      <button
                        onClick={() => downloadAudio(file.audioUrl, `${file.title || file.file.name}.mp3`)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-lg transition-colors duration-300"
                      >
                        <Download className="h-5 w-5" />
                        Download Audio
                      </button>
                      {file.transcription && (
                        <div className="mt-2">
                          <h4 className="text-sm font-semibold">Transcription</h4>
                          <p className="text-sm text-gray-300">{file.transcription}</p>
                        </div>
                      )}
                      {file.summary && (
                        <div className="mt-2">
                          <h4 className="text-sm font-semibold">Summary</h4>
                          <p className="text-sm text-gray-300">{file.summary}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {file.status === "error" && (
                    <p className="text-sm text-red-500 ml-10">{file.transcription}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="font-medium whitespace-pre text-white"
      >
        Acet Labs
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white" />
    </a>
  );
};

export default SidebarDemo;