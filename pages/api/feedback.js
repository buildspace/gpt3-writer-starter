import prisma from "../../lib/prisma";

export default async function addFeedback(req, res) {
  const { method } = req;

  //   const feedback = await prisma.Model.create({
  //     data: {
  //       data: JSON.stringify(req.body),
  //     },
  //   });
  //   console.log(req.body);
  try {
    const addFeedback = await prisma.Model.create({
      data: {
        data: JSON.stringify(req.body),
      },
    });
    return res.status(200).json(addFeedback, { success: true });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Error adding feedback", success: false });
  }
}
