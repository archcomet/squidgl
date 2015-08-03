

/// <reference path='./types.d.ts' />

import { GameMode, GameState, Entity, Component, Mesh, Game, Renderer, System, defaults, components, meshes, renderers, systems } from './cog2/cog2';

class SquidMesh extends Mesh {}
class Box2DComponent extends Component {}
class SteeringComponent extends Component {}

@meshes([
    SquidMesh
])

@components([
    Box2DComponent,
    SteeringComponent
])

class Squid extends Entity {}



class SquidGameMode extends GameMode {}
class SquidGameState extends GameState {}

class ThreeRenderer extends Renderer {}
class Box2DPhysicsSystem extends System {}
class SteeringSystem extends System {}


@renderers([
    ThreeRenderer
])

@systems([
    SteeringSystem,
    Box2DPhysicsSystem
])

class SquidGame extends Game {
    defaultGameModeClass = SquidGameMode;
    defaultGameStateClass = SquidGameState;
}


export = SquidGame;

// client-> join
// server-> connect (send client data)
// server-> preLogin (verify we are still valid)
// server-> login (spawn player)

