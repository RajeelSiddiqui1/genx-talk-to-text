"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Music, Loader2, CheckCircle, AlertCircle, Save, Mic, X, Send, User, Bot } from "lucide-react";
import axios from "axios";

export default function ChatBoatUI() {
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messagesEndRef = useRef(null);

  const userId = "mock-user-123";

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAudioBlob(null);
      setError(null);
      
      // Add file message to chat
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: "user",
        content: "",
        file: selectedFile,
        timestamp: new Date()
      }]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.startsWith("audio/") || droppedFile.type.startsWith("video/"))) {
      setFile(droppedFile);
      setAudioBlob(null);
      setError(null);
      
      // Add file message to chat
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: "user",
        content: "",
        file: droppedFile,
        timestamp: new Date()
      }]);
    } else {
      setError("Please drop an audio or video file.");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(audioBlob);
        const recordedFile = new File([audioBlob], "recording.webm", { type: "audio/webm" });
        setFile(recordedFile);
        setError(null);
        
        // Add recording message to chat
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "user",
          content: "",
          file: recordedFile,
          isRecording: true,
          timestamp: new Date()
        }]);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      setError("Failed to access microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setAudioBlob(null);
      setFile(null);
      setError("Recording cancelled.");
    }
  };

  const handleUpload = async () => {
    if (!file && !audioBlob) {
      setError("Please select or record an audio/video file first.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", file || audioBlob);

    try {
      setLoading(true);
      setError(null);
      setResponse(null);
      setProgress(0);

      const res = await axios.post("http://127.0.0.1:5000/chat/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      const cleanedResponse = formatResponse(res.data);
      setResponse(cleanedResponse);
      
      // Add response to chat
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: "bot",
        content: cleanedResponse,
        timestamp: new Date()
      }]);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleSaveToHistory = async () => {
    if (!response) return;

    try {
      setSaving(true);
      await axios.post("http://127.0.0.1:5000/history", {
        user_id: userId,
        response: response,
      });
      alert("Response saved to history!");
    } catch (err) {
      setError("Failed to save to history");
    } finally {
      setSaving(false);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    // Add text message to chat
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    }]);
    
    setInputMessage("");
    
    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: "bot",
        content: "I received your text message. Please upload an audio or video file for analysis.",
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const formatResponse = (data) => {
    if (!data.response) return data;

    let formatted = typeof data.response === "string" ? data.response : JSON.stringify(data.response, null, 2);
    
    // Parse the response to extract sections based on the required headings
    const sections = {
      abstractSummary: "",
      keyPoints: [],
      actionItems: [],
      sentimentAnalysis: "",
      properTranscript: ""
    };
    
    // Split the response by the main headings
    const parts = formatted.split(/\d\.\s+/);
    
    if (parts.length >= 2) {
      // Extract Abstract Summary
      const abstractMatch = parts[1].match(/(.*?)(?=2\.|$)/s);
      if (abstractMatch) {
        sections.abstractSummary = abstractMatch[1].replace(/- Provide a short overview.*?\./s, '').trim();
      }
    }
    
    if (parts.length >= 3) {
      // Extract Key Points
      const keyPointsMatch = parts[2].match(/(.*?)(?=3\.|$)/s);
      if (keyPointsMatch) {
        const pointsText = keyPointsMatch[1];
        const points = pointsText.split(/-/).filter(point => point.trim().length > 0);
        sections.keyPoints = points.map(point => point.trim());
      }
    }
    
    if (parts.length >= 4) {
      // Extract Action Items
      const actionItemsMatch = parts[3].match(/(.*?)(?=4\.|$)/s);
      if (actionItemsMatch) {
        const itemsText = actionItemsMatch[1];
        const items = itemsText.split(/\d+\./).filter(item => item.trim().length > 0);
        sections.actionItems = items.map(item => item.trim());
      }
    }
    
    if (parts.length >= 5) {
      // Extract Sentiment Analysis
      const sentimentMatch = parts[4].match(/(.*?)(?=5\.|$)/s);
      if (sentimentMatch) {
        sections.sentimentAnalysis = sentimentMatch[1].replace(/- Identify the overall sentiment.*?\./s, '').trim();
      }
    }
    
    if (parts.length >= 6) {
      // Extract Proper Transcript
      sections.properTranscript = parts[5].replace(/- Provide the cleaned.*?\./s, '').trim();
    }
    
    return sections;
  };

  const renderMessage = (message) => {
    if (message.type === "user") {
      return (
        <div key={message.id} className="flex justify-end mb-4">
          <div className="flex items-end max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
            <div className="bg-blue-600 text-white rounded-l-xl rounded-t-xl px-4 py-2">
              {message.content && <p>{message.content}</p>}
              {message.file && (
                <div className="mt-2 flex items-center">
                  <Music size={16} className="mr-2" />
                  <span className="text-sm">{message.file.name}</span>
                  {message.isRecording && <span className="ml-2 text-xs">(Recording)</span>}
                </div>
              )}
              <span className="text-xs text-blue-200 block mt-1">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2">
              <User size={16} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={message.id} className="flex justify-start mb-4">
          <div className="flex items-end max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
              <Bot size={16} />
            </div>
            <div className="bg-gray-700 text-white rounded-r-xl rounded-t-xl px-4 py-2">
              {typeof message.content === 'object' ? (
                <div className="p-2 bg-gray-800 rounded-xl">
                  <h3 className="text-lg font-semibold text-pink-300 mb-2">Meeting Analysis</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-md font-bold text-green-300 mb-1">Abstract Summary</h4>
                    <p className="text-sm text-gray-200">
                      {message.content.abstractSummary || "No abstract summary available."}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-md font-bold text-green-300 mb-1">Key Points</h4>
                    <ul className="text-sm text-gray-200 list-disc pl-5">
                      {message.content.keyPoints && message.content.keyPoints.length > 0 ? (
                        message.content.keyPoints.map((point, index) => (
                          <li key={index} className="mb-1">{point}</li>
                        ))
                      ) : (
                        <li>No key points extracted.</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-md font-bold text-green-300 mb-1">Action Items</h4>
                    <ol className="text-sm text-gray-200 list-decimal pl-5">
                      {message.content.actionItems && message.content.actionItems.length > 0 ? (
                        message.content.actionItems.map((item, index) => (
                          <li key={index} className="mb-1">{item}</li>
                        ))
                      ) : (
                        <li>No action items identified.</li>
                      )}
                    </ol>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-md font-bold text-green-300 mb-1">Sentiment Analysis</h4>
                    <p className="text-sm text-gray-200">
                      {message.content.sentimentAnalysis || "No sentiment analysis available."}
                    </p>
                  </div>
                  
                  <div className="mb-2">
                    <h4 className="text-md font-bold text-green-300 mb-1">Proper Transcript</h4>
                    <p className="text-sm text-gray-200">
                      {message.content.properTranscript || "No transcript available."}
                    </p>
                  </div>
                </div>
              ) : (
                <p>{message.content}</p>
              )}
              <span className="text-xs text-gray-400 block mt-1">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mr-3">
              <Bot size={24} />
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              ChatBoat
            </h1>
          </div>
          <div className="text-sm text-gray-400">
            Audio/Video Chat Assistant
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 border-r border-gray-700 hidden md:block">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-pink-300 mb-2">Upload Options</h2>
            
            {/* Drag-and-Drop Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition mb-4 ${
                isDragging ? "border-pink-500 bg-pink-900/20" : "border-gray-500"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              role="button"
              aria-label="Upload audio or video file"
            >
              {file ? (
                <p className="text-pink-400 flex items-center justify-center gap-2 text-sm">
                  <Music size={16} /> {file.name}
                </p>
              ) : (
                <p className="text-gray-400 flex flex-col items-center text-sm">
                  <Upload size={24} className="mb-2" />
                  Click or drag audio/video file here
                </p>
              )}
              <input
                type="file"
                accept="audio/*,video/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
                aria-label="Select audio or video file"
              />
            </div>

            {/* Recording Controls */}
            <div className="mb-4">
              <button
                onClick={recording ? stopRecording : startRecording}
                className={`w-full py-2 rounded-xl flex items-center justify-center gap-2 transition ${
                  recording
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white text-sm`}
                aria-label={recording ? "Stop audio recording" : "Start audio recording"}
              >
                <Mic size={16} />
                {recording ? "Stop Recording" : "Start Recording"}
              </button>
              {recording && (
                <button
                  onClick={cancelRecording}
                  className="mt-2 w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 text-sm"
                  aria-label="Cancel audio recording"
                >
                  <X size={16} /> Cancel Recording
                </button>
              )}
            </div>

            {/* Upload Button with Progress */}
            <div className="mb-4">
              <button
                onClick={handleUpload}
                disabled={loading || (!file && !audioBlob)}
                className={`w-full py-2 rounded-xl flex items-center justify-center gap-2 transition text-sm ${
                  (loading || (!file && !audioBlob)) 
                    ? "bg-gray-600 cursor-not-allowed" 
                    : "bg-pink-500 hover:bg-pink-600"
                } text-white`}
                aria-label="Upload file and get response"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} /> Processing...
                  </>
                ) : (
                  "Analyze Content"
                )}
              </button>
              {loading && (
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-pink-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-800 rounded-xl flex items-center gap-2 text-sm">
                <AlertCircle size={16} className="text-red-400" />
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Bot size={48} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Welcome to ChatBoat!</h3>
                  <p className="max-w-md mx-auto">
                    Upload an audio or video file, record a message, or type a question to get started.
                  </p>
                </div>
              </div>
            ) : (
              messages.map(renderMessage)
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message or upload/record audio..."
                className="flex-1 bg-gray-700 text-white rounded-l-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={`bg-pink-500 text-white py-3 px-4 rounded-r-xl ${
                  !inputMessage.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'
                } transition`}
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="flex justify-center mt-2 md:hidden">
              <button
                onClick={() => fileInputRef.current.click()}
                className="text-sm text-gray-400 hover:text-gray-300 flex items-center mx-2"
              >
                <Upload size={16} className="mr-1" /> Upload
              </button>
              <button
                onClick={recording ? stopRecording : startRecording}
                className={`text-sm flex items-center mx-2 ${
                  recording ? 'text-red-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Mic size={16} className="mr-1" /> {recording ? 'Stop' : 'Record'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}