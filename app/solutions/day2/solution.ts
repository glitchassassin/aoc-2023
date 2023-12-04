const getCount = (color: string, round: string) => {
    const digits = round.match(new RegExp("(\\d+) " + color))?.[1];
    if (digits) return parseInt(digits);
    return 0;
}
const getId = (game: string) => {
    return parseInt(game.match(/Game (\d+)/)![1]);
}

export const gameIsPossibleWith = ({ red, green, blue }: { red: number, green: number, blue: number}) => (game: string) => {
    for (const round of game.split(";")) {
        if (getCount("red", round) > red || getCount("green", round) > green || getCount("blue", round) > blue) return false;
    }
    return true;
}

export const allGamesArePossibleWith = ({ red, green, blue }: { red: number, green: number, blue: number}) => (games: string[]) => {
    return games.filter(gameIsPossibleWith({ red, green, blue })).reduce((sum, game) => sum + getId(game), 0)
}

export const fewestCubesPower = (game: string) => {
    const fewest = {
        red: 0,
        green: 0,
        blue: 0
    }
    for (const round of game.split(";")) {
        fewest.red = Math.max(getCount("red", round), fewest.red);
        fewest.blue = Math.max(getCount("blue", round), fewest.blue);
        fewest.green = Math.max(getCount("green", round), fewest.green);
    }
    return fewest.red * fewest.blue * fewest.green;
}

export const fewestCubesSum = (games: string[]) => games.reduce((sum, game) => sum + fewestCubesPower(game), 0)