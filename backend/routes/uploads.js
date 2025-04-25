// backend/routes/uploads.js
import { Router } from "express";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// POST /api/uploads/:courseId
router.post("/:courseId", upload.single("file"), async (req, res) => {
  const { courseId } = req.params;
  if (!req.file) return res.status(400).json({ msg: "No llega archivo" });

  const path = `${courseId}/${Date.now()}_${req.file.originalname}`;
  const { error: upErr } = await sb.storage
    .from("curso-files")
    .upload(path, req.file.buffer, {
      contentType: req.file.mimetype
    });

  if (upErr) return res.status(500).json(upErr);

  // guarda la referencia en BD
  await sb.from("course_files").insert({
    course_id: courseId,
    file_url: path,
    name: req.file.originalname
  });

  res.json({ ok: true, path });
});

export default router;
