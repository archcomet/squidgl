

/// <reference path='./types.d.ts' />


@SquidMesh([

])

@Box2DBodyComponent({
    mass: 2,
    friction: 0.1
});

class Squid extends IEntity {

}

@defaults({
    gameMode: SquidGameMode,
    gameState: SquidGameState,
    playerController: SquidPlayerController,
    configs: [
        squidGameDefaultConfig
    ]
})

@renderers([
    ThreeRenderer
])

@systems([
    SteeringSystem,
    Box2DPhysicsSystem
])

class SquidGame extends IGame {

}


export = SquidGame;


// client-> join
// server-> connect (send client data)
// server-> preLogin (verify we are still valid)
// server-> login (spawn player)

