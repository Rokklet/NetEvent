import express from "express";
import Comment from "../models/Comment";
import { auth , AuthRequest, requireRole } from "../middleware/auth";


const router = express.Router();
/*
router.get("/:eventId/comments", async (req, res) =>
 );

 
router.post("/:eventId/comments", auth, async (req: AuthRequest, res) =>
);
*/

export default router;
