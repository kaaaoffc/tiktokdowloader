module.exports = async (req, res) => {

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false
    });
  }

  try {

    const response = await fetch(
      `https://v1.tikkdown.my.id/api/v1?url=${encodeURIComponent(url)}`
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (e) {

    return res.status(500).json({
      status: false,
      error: e.toString()
    });

  }

};
