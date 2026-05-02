module.exports = async (req, res) => {

  const { url, type } = req.query;

  if (!url) {
    return res.status(400).send("URL kosong");
  }

  try {

    // AMBIL DATA TIKTOK
    const api = await fetch(
      `https://v1.tikkdown.my.id/api/v1?url=${encodeURIComponent(url)}`
    );

    const data = await api.json();

    // MODE JSON
    if (!type) {
      return res.status(200).json(data);
    }

    // PILIH FILE
    const fileUrl =
      type === "mp3"
      ? data.download.mp3
      : data.download.nowm;

    // FETCH FILE
    const file = await fetch(fileUrl);

    // CONTENT TYPE
    res.setHeader(
      "Content-Type",
      type === "mp3"
      ? "audio/mpeg"
      : "video/mp4"
    );

    // FORCE DOWNLOAD
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=tiktok.${type === "mp3" ? "mp3" : "mp4"}`
    );

    // STREAM FILE
    const buffer =
      Buffer.from(await file.arrayBuffer());

    res.send(buffer);

  } catch (e) {

    res.status(500).json({
      status:false,
      error:e.toString()
    });

  }

};
