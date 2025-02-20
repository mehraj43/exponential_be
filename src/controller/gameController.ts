import { Request, Response } from 'express';
import { getUserScore, incrementScoreAndCheckRewards } from '../jobs/gameLogic';

export const handleButtonClick = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    const { _id: id } = req?.user;

    if (!id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const gameResult = await incrementScoreAndCheckRewards(id);
    res.status(200).json(gameResult);
  } catch (err: any) {
    res.status(500).json({ error: err?.message });
  }
};

export const getScore = async (req: Request | any, res: Response) => {
  try {
    const { _id: id } = req?.user;

    if (!id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const userScore = await getUserScore(id);
    res.status(200).json(userScore);
  } catch (err: any) {
    res.status(500).json({ error: err?.message });
  }
};
