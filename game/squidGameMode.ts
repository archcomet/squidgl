import {GameMode} from 'cog2/cog2';

import {SquidEntity} from 'game/gameplay/squidEntity';

export class SquidGameMode extends GameMode {

    onStart(gameMode:SquidGameMode) {

        var squidEntity = gameMode.spawn(SquidEntity);
        console.log('START', squidEntity);
    }
}