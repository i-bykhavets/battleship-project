import {IWinner} from "../models/winner";

class WinnersStorage {
    winners: IWinner[] = [];

    addWinner = (userName: string): void => {
        const existWinnerIndex = this.winners
            .findIndex((winner) => winner.name === userName);

        if (existWinnerIndex !== -1) {
            this.winners[existWinnerIndex].wins++;
        } else {
            this.winners.push({
                name: userName,
                wins: 1,
            });
        }
    }

    getWinners = (): IWinner[] => {
        return this.winners;
    }
}

export default new WinnersStorage();
