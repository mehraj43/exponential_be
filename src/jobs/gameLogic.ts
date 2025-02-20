import GameModel from '../models/game.model';
import UserModel from '../models/user.model';

interface IGameResult {
  totalScore: number;
  prizesWon: number;
  prizeMessage?: string;
}

const getPrizeMessage = (): string | undefined => {
  if (Math.random() < 0.25) {
    return 'Congratulations! You won a generic prize!';
  }
  return undefined;
};

const handleRewards = (game: any): string | undefined => {
  game.totalScore += 1;

  if (Math.random() < 0.5) {
    game.totalScore += 9;
  }

  const prizeMessage = getPrizeMessage();
  if (prizeMessage) {
    game.prizesWon += 1;
  }

  return prizeMessage;
};

export const incrementScoreAndCheckRewards = async (
  userId: string
): Promise<IGameResult> => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    let game = await GameModel.findOne({ user_id: userId });

    if (!game) {
      game = new GameModel({
        user_id: userId,
        totalScore: 1,
        prizesWon: 0,
      });
      await game.save();
    }

    const prizeMessage = handleRewards(game);

    await game.save();

    if (prizeMessage) {
      return {
        totalScore: game.totalScore,
        prizesWon: game.prizesWon,
        prizeMessage,
      };
    }

    return {
      totalScore: game.totalScore,
      prizesWon: game.prizesWon,
    };
  } catch (err: any) {
    throw new Error('Error in game logic: ' + err?.message);
  }
};

export const getUserScore = async (userId: string): Promise<IGameResult> => {
  try {
    let game = await GameModel.findOne({ user_id: userId });
    if (!game) {
      game = new GameModel({
        user_id: userId,
        totalScore: 0,
        prizesWon: 0,
      });
      await game.save();
    }
    return {
      totalScore: game.totalScore,
      prizesWon: game.prizesWon,
    };
  } catch (err: any) {
    throw new Error('Error in game logic: ' + err?.message);
  }
};
