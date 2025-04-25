import { Router } from "express";
import { nanoid } from "nanoid";
import { createClient } from "@supabase/supabase-js";

const router = Router();
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

router.post("/", async (req, res) => {
  const { title, description, teacher_id } = req.body;
  const code = "TEC-" + nanoid(4).toUpperCase();
  const { data, error } = await sb
      .from("courses")
      .insert({ title, description, teacher_id, code })
      .select()
      .single();
  if (error) return res.status(400).json(error);
  res.json(data);
});

export default router;
