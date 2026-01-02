import express from "express";
import Thread from "../models/Thread.js";
const router = express.Router();
import getDataFromOpenAi from "../utils/openai.js";

// router.post("/test", async (req, res) => {
//   try {
//     let thread = new Thread({
//       threadId: "1234abcds",
//       title: "Hello",
//     });
//     let savedData = await thread.save();
//     res.send(savedData);
//     console.log(savedData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

router.get("/thread", async (req, res) => {
  try {
    let allThread = await Thread.find({}).sort({ updated_At: -1 }); // -1 means decending order me sort kardo
    res.status(200).json({ thread: allThread });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.get("/thread/:thread", async (req, res) => {
  try {
    const { thread } = req.params;
    let oneThread = await Thread.findOne({ threadId: thread });

    if (!oneThread) {
      res.status(404).json({ error: "Thread not found" });
    }
    res.json({ data: oneThread.messages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

router.delete("/thread/:thread", async (req, res) => {
  const { thread } = req.params;
  try {
    let deletedThread = await Thread.findOneAndDelete({ threadId: thread });

    if (!deletedThread) {
      res.status(404).json({ error: "Thread not found" });
    }
    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

router.post("/chat", async (req, res) => {
  let { threadID, message } = req.body;

  if (!threadID || !message) {
    res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId: threadID });

    if (!thread) {
      thread = new Thread({
        threadId: threadID,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    const assistantReply = await getDataFromOpenAi(message);
    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updated_At = new Date();
    await thread.save();
    res.json({ reply: assistantReply });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err });
  }
});

export default router;
