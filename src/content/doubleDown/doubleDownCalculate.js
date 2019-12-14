const BIG = "BIG";
const SMALL = "SMALL";
const THREE_THE_SAME = "THREE_THE_SAME";

const SAME = "SAME";
const OPPOSITE = "OPPOSITE";

export class DoubleDown {
  static diceNumber = 3;
  static diceMaximumNumber = 6;
  gamePlay = 0;
  gameWin = 0;
  gameLost = 0;
  threeTheSame = 0;
  highestDouble = 0;
  highestWin = 0;
  highestLose = 0;

  currentBalance = 0;
  currentPurchaseAmount = 0;
  isLastGameLose = false;
  lastGameResult = SMALL;
  purchaseLimit = 0;
  startPurchaseAmount = 0;
  makeUpMethod = OPPOSITE;
  target = 0;

  gamesDetail = [];

  constructor(
    base,
    purchaseLimit,
    startPurchaseAmount,
    target,
    makeUpMethod = OPPOSITE
  ) {
    this.currentBalance = base;
    this.currentPurchaseAmount = startPurchaseAmount;
    this.isLastGameLose = false;
    this.lastGameResult = SMALL;
    this.purchaseLimit = purchaseLimit;
    this.makeUpMethod = makeUpMethod;
    this.startPurchaseAmount = startPurchaseAmount;
    this.target = target;
  }

  calculate() {
    do {
      this.gamePlay++;
      let gameDetail = this.generateGame();
      this.gamesDetail.push(this.generateGameDetail(gameDetail));
      this.setupPurchase();
    } while (this.isAbleToGamble());
    return this.generateSimullateReport();
  }

  generateGameDetail(gameDetail) {
    let { gameWin, playerPurchase, casinoPurchase } = gameDetail;
    return {
      currentBalance: this.currentBalance,
      currentPurchaseAmount: this.currentPurchaseAmount,
      gameWin,
      playerPurchase,
      casinoPurchase
    };
  }

  generateSimullateReport() {
    let {
      currentBalance,
      gamePlay,
      gameWin,
      gameLost,
      threeTheSame,
      highestDouble,
      highestWin,
      highestLose,
      gamesDetail
    } = this;
    return {
      win: this.currentBalance >= this.target,
      currentBalance,
      gamePlay,
      gameWin,
      gameLost,
      threeTheSame,
      highestDouble,
      highestWin,
      highestLose,
      gamesDetail
    };
  }

  generateGame() {
    let playerPurchase = this.generatePlayerPurchase();
    let casinoPurchase = this.generateCasinoPurchase();
    let gameWin;
    if (playerPurchase === casinoPurchase) {
      this.gameWin++;
      this.isLastGameLose = false;
      this.currentBalance += this.currentPurchaseAmount;
      this.highestWin =
        this.currentPurchaseAmount > this.highestWin
          ? this.currentPurchaseAmount
          : this.highestWin;
      gameWin = true;
    } else {
      this.gameLost++;
      this.isLastGameLose = true;
      this.currentBalance -= this.currentPurchaseAmount;
      this.highestLose =
        this.currentPurchaseAmount > this.highestLose
          ? this.currentPurchaseAmount
          : this.highestLose;
      gameWin = false;
    }
    return { gameWin, playerPurchase, casinoPurchase };
  }

  setupPurchase() {
    if (this.isLastGameLose === true) {
      this.currentPurchaseAmount *= 2;
      if (this.currentPurchaseAmount > this.highestDouble) {
        this.highestDouble = this.currentPurchaseAmount;
      }
    } else {
      this.currentPurchaseAmount = this.startPurchaseAmount;
    }
  }

  generatePlayerPurchase() {
    switch ((this, this.makeUpMethod)) {
      case SAME:
        return this.lastGameResult === SMALL ? SMALL : BIG;
      case OPPOSITE:
        return this.lastGameResult === SMALL ? BIG : SMALL;
      default:
        return SMALL;
    }
  }

  generateCasinoPurchase() {
    let diceSum = 0;
    let diceSet = new Set();
    for (let i = 0; i < DoubleDown.diceNumber; i++) {
      let randomNumber = Math.floor(
        Math.random() * DoubleDown.diceMaximumNumber + 1
      );
      diceSum += randomNumber;
      diceSet.add(randomNumber);
    }
    if (diceSet.size === 1) {
      this.threeTheSame++;
      return THREE_THE_SAME;
    }
    return diceSum >= 11 ? BIG : SMALL;
  }

  isAbleToGamble() {
    if (this.currentBalance >= this.target) {
      return false;
    }
    if (this.currentPurchaseAmount > this.currentBalance) {
      return false;
    }
    if (this.currentPurchaseAmount > this.purchaseLimit) {
      return false;
    }
    return true;
  }

  generateReport() {
    return {
      gamePlay: this.gamePlay,
      gameWin: this.gameWin,
      gameLost: this.gameLost,
      threeTheSame: this.threeTheSame,
      highestDouble: this.highestDouble,
      highestWin: this.highestWin,
      highestLose: this.highestLose,
      currentBalance: this.currentBalance,
      win: this.currentBalance >= this.target,
      gamesDetail: this.gamesDetail
    };
  }
}
