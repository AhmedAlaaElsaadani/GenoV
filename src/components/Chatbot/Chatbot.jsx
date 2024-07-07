// src/ChatBot.js
import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "./Chatbot.module.css";
import ApiManager from "../../Utilies/ApiManager";
import { motion } from "framer-motion";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "This is GenoV chat bot, how can I help you?", sender: "bot" },
  ]);
  const [isAppeared, setIsAppeared] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatBotRef = useRef();
  const messagesEndRef = useRef();

  //close the chat bot when the user clicks outside the chat bot or press the escape key
  useEffect(() => {
    //close the chat bot when the user press the escape key
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setIsAppeared(false);
      }
    };
    //close the chat bot when the user clicks outside the chat bot
    const handleClickOutside = (event) => {
      if (chatBotRef.current && !chatBotRef.current.contains(event.target)) {
        setIsAppeared(false);
      }
    };

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //send message to the chat bot
  const sendMessage = async (values, { resetForm }) => {
    setLoading(true);
    setMessages([
      ...messages,
      { text: values.message, sender: "user" },
      {
        text: `loading .......`,
        sender: "bot",
      },
    ]);
    resetForm();

    const botResponse = await ApiManager.getChatCompletion(values.message);
    if (botResponse) {
      setLoading(false);
    }
    //overwrite the loading message with the bot response
    setMessages([
      ...messages,
      { text: values.message, sender: "user" },
      { text: botResponse, sender: "bot" },
    ]);
  };
  //formik form
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string()
        .matches(
          /^[A-Za-z\s!@#$%^&*(),.?":{}|<>]+$/,
          "Only English characters are allowed"
        )
        .required("Message is required"),
    }),
    onSubmit: sendMessage,
  });
  //scroll to the last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      {isAppeared && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 100 },
          }}
          transition={{ duration: 0.5 }}
          className={style["layer"]}
        >
          <div className={style["chat-bot"]} ref={chatBotRef}>
            <div className={style["chat-header"]}>GenoV Chat bot</div>
            <div className={style["chat-messages"]}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${style["chat-message"]} ${
                    style[message.sender]
                  }`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className={style["chat-input-container"]}
            >
              <fieldset>
                <input
                  type="text"
                  className={style["chat-input"]}
                  disabled={loading}
                  id="message"
                  name="message"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  placeholder="Send message..."
                />
                <button
                  type="submit"
                  className={
                    "btn btn-outline-dark " + style["chat-send-button"]
                  }
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-send"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                  </svg>
                </button>
              </fieldset>
              {formik.touched.message && formik.errors.message ? (
                <div className=" text-danger mt-1 text-center ">
                  {formik.errors.message}
                </div>
              ) : null}
            </form>
          </div>
        </motion.div>
      )}

      {/* bot icon */}
      {!isAppeared && (
        <motion.div
        initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 100 },
          }}
          transition={{ duration: 0.5 }}
         
          className={style["bot-icon"]}
          onClick={() => setIsAppeared(!isAppeared)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-robot"
            viewBox="0 0 16 16"
          >
            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135" />
            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
          </svg>
        </motion.div>
      )}
    </>
  );
};

export default ChatBot;
