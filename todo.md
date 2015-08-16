
## re-implement meshes in game

* system types
* component types

* threeRenderer - create scene, find container
* threeMesh - add to scene (or another mesh)
* entity - e

* squidGame (threeRenderer, squidGameMode)
* squidGameMode (squidEntity) 
* onStart spawns squidEntity
* mesh position copy from entity vector

### game engine

* entity 
* components
* system
* game mode
* game state
* game
* replication
* pawn?
* server/client

### game play spike 1 player  
 
 basic swimming
 basic chirping - sound, graphic, indicator

bootstrap(MyApp, { ... config })

-------------------

@App({
	interval: 16,
	systems: [a
		... systems
	]
})
export class MyApp {
	... game events
	... cool game logic
}

------------------------

@World({
	name: 'uniqueWorldName',
	state: StateClass,
	level: LevelClass
})
@WorldView({
	scene: Scene,
	camera: Camera,
	renderer: Renderer
})
export class MyWorld {
	... game events
	... cool world logic
}

@State()
export class MyState {
	@replicate
	@save
	... game events
	... cool state machine
}

@Level()
export class MyLevel {
	... game events
	... cool level logic
}

---------------------------

@Entity({
	name: 'uniqueEntityName',
	components: [
		Component  		
	]
})
@EntityView({
	sceneComponents: [
		SceneComponent
	] 
})
export class MyEntity {
	... game events
	... cool entity logic
}

@Component({
  	name: 'uniqueComponentName'
})
export class MyComponent {
	@replicate
	@save
	... game events
	... cool gameplay logic?
}

@System('need an identifier')
export class MySystem {
	... game events
	... cool gameplay logic
}

---------------------------

@Scene({
	... transferable props
})
export class MyScene {
	... renderer events
}

@SceneComponent({
	... transferable props
})
export class MySceneComponent {
	... renderer events
}

@SceneRenderer({
	... transferable props
})
export class MyRenderer {
 	... renderer events
}

@SceneCamera({
	... transferable props
})
export class MySceneView {
	... renderer events
}

