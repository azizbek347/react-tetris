import {action, observable, makeObservable} from 'mobx'
import deepClone from "./utils/deepClone";
import {randomTetromino, TETROMINOS} from './utils/tetromino'
import {checkCollision, generateBoard, rotateMatrix} from './utils/gameHelpers';

class State {
    static HEIGHT = 20;
    static WIDTH = 10;
    static TIMING = 1000;

    stage = generateBoard(State.HEIGHT, State.WIDTH);
    isPlaying = true;
    intervalID = null;
    player = {
        pos: {x: 0, y: -1},
        tetromino: TETROMINOS[0].shape,
        collided: false
    }

    constructor() {
        makeObservable(this, {
            stage: observable,
            isPlaying: observable,
            intervalID: observable,
            player: observable,
            startGame: action.bound,
            movePlayer: action.bound,
            updatePlayerPos: action.bound,
            resetPlayer: action.bound,
            drop: action.bound,
            updateStage: action.bound,
            playerRotate: action.bound,
            sweepRows: action.bound,
        })

        this.startGame();
    }

    startGame() {
        this.stage = generateBoard(State.HEIGHT, State.WIDTH);
        this.resetPlayer();
        this.intervalID = setInterval(this.drop, State.TIMING);
        this.isPlaying = true;
    }

    movePlayer(dir) {
        if (!checkCollision(this.player, this.stage, {x: dir, y: 0})) {
            this.updatePlayerPos({x: dir, y: 0});
        }
    }

    updatePlayerPos({x, y, collided}) {
        this.player = {
            ...this.player,
            pos: {x: this.player.pos.x + x, y: this.player.pos.y + y},
            collided
        };
        this.updateStage();
    }

    resetPlayer() {
        const tetromino = rotateMatrix(randomTetromino().shape, Math.random() > 0.5 ? 1 : -1);
        const x = Math.floor((State.WIDTH - tetromino.length) / 2);
        this.player = {
            pos: {x, y: -1},
            tetromino,
            collided: false
        }
    }

    drop() {
        if (!checkCollision(this.player, this.stage, {x: 0, y: 1})) {
            this.updatePlayerPos({x: 0, y: 1, collided: false});
        } else {
            if (this.player.pos.y < 1) {
                clearInterval(this.intervalID);
                this.isPlaying = false;
            } else {
                this.updatePlayerPos({x: 0, y: 0, collided: true});
            }
        }
    }

    updateStage(stage = this.stage) {
        const newStage = stage.map(row => row.map(cell => cell[1] === 'clear' ? [0, 'clear'] : cell));
        this.player.tetromino.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    newStage[y + this.player.pos.y][x + this.player.pos.x] = [value, `${this.player.collided ? 'merged' : 'clear'}`]
                }
            })
        })
        this.stage = newStage;
        if (this.player.collided) {
            this.resetPlayer();
            this.sweepRows(newStage);
        }
    }

    playerRotate(dir, stage = this.stage) {
        const clonedPlayer = deepClone(this.player);
        clonedPlayer.tetromino = rotateMatrix(clonedPlayer.tetromino, dir);
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) return;
        }
        this.player = clonedPlayer;
        this.updateStage();
    }

    sweepRows(newStage) {
        const stage = newStage.reduce((ack, row) => {
            if (row.findIndex(cell => cell[0] === 0) === -1) {
                ack.unshift(new Array(newStage[0].length).fill([0, 'clear']))
                return ack;
            }
            ack.push(row);
            return ack;
        }, []);
        this.stage = stage;
    }
}

export default new State();
