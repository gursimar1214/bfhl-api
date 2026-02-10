const { validateInput } = require("../utils/validator");
const mathService = require("../services/math.service");
const aiService = require("../services/ai.service");

exports.handleBFHL = async (req, res) => {
  try {
    const validation = validateInput(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        is_success: false,
        official_email: process.env.OFFICIAL_EMAIL,
        error: validation.message
      });
    }

    const { key, value } = validation;
    let result;

    switch (key) {
      case "fibonacci":
        result = mathService.fibonacci(value);
        break;

      case "prime":
        result = mathService.primes(value);
        break;

      case "lcm":
        result = mathService.lcmArray(value);
        break;

      case "hcf":
        result = mathService.hcfArray(value);
        break;

      case "AI":
        result = await aiService.askAI(value);
        break;
    }

    return res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      data: result
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      is_success: false,
      official_email: process.env.OFFICIAL_EMAIL,
      error: "Processing failed"
    });
  }
};

exports.healthCheck = (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL
  });
};
