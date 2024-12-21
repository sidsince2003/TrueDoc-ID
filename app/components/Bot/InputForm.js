import { Loader2, Plus, Send, Mic } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const InputForm = ({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
  stop,
}) => {
  const [images, setImages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emoji, setEmoji] = useState("");

  const handleImageSelection = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const imagePromises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const base64String = e.target?.result?.toString();
          resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    try {
      const base64Strings = await Promise.all(imagePromises);
      setImages((prevImages) => [...prevImages, ...base64Strings]);
    } catch (error) {
      console.error("Error reading image:", error);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    const recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!recognition) {
      console.error("Speech Recognition is not supported in this browser.");
      setIsRecording(false);
      return;
    }

    const speechRecognition = new recognition();

    speechRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleInputChange({ target: { value: input + transcript } });
      setIsRecording(false);
    };

    speechRecognition.onerror = () => {
      setIsRecording(false);
    };

    speechRecognition.start();
  };

  const handleEmojiSelect = (selectedEmoji) => {
    setEmoji((prev) => prev + selectedEmoji);
    setShowEmojiPicker(false);
  };

  const emojis = ["😀", "😂", "😍", "😎", "🙌", "👍", "🎉", "🌟"];

  return (
    <div className="relative">
      {showEmojiPicker && (
        <div className="absolute z-10 bg-gray-800 rounded shadow-lg p-2">
          {emojis.map((emoji) => (
            <span
              key={emoji}
              className="cursor-pointer text-lg"
              onClick={() => handleEmojiSelect(emoji)}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              images: JSON.stringify(images),
              input: input + emoji,
            },
          });
          setEmoji("");
        }}
        className="w-full flex flex-row gap-2 items-center"
      >
        <Input
          type="text"
          placeholder={isLoading ? "Generating..." : "Message Bot"}
          value={input + emoji}
          disabled={isLoading}
          onChange={handleInputChange}
          className="text-black"
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="p-2 rounded-full"
        >
          <Plus className="h-8 w-8 stroke-stone-500" />
        </button>
        <button
          type="button"
          onClick={startRecording}
          className={`p-2 rounded-full ${isRecording ? "bg-gray-700" : ""}`}
        >
          <Mic className="h-8 w-8 stroke-stone-500" />
        </button>
        <button
          type="submit"
          className="rounded-full shadow-md border flex flex-row"
        >
          {isLoading ? (
            <Loader2
              onClick={stop}
              className="p-3 h-10 w-10 stroke-stone-500 animate-spin"
            />
          ) : (
            <Send className="p-3 h-10 w-10 stroke-stone-500" />
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
