export default async function handler(req, res) {

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "URL kosong"
    });
  }

  try {

    const response = await fetch(
      `https://v1.tikkdown.my.id/api/v1?url=${encodeURIComponent(url)}`
    );

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).json(data);

  } catch (err) {

    return res.status(500).json({
      status: false,
      error: err.toString()
    });

  }

}
