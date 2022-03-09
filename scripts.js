//Creating the app
const Application = PIXI.Application;


const app = new Application({
    width: 500,
    height: 500,
    transparent: false,
    antialias: true
});

app.renderer.backgroundColor = 0xf0d8c9;

app.renderer.resize(window.innerWidth, window.innerHeight);

app.renderer.view.style.position = 'absolute'; //removing the excess screen space

document.body.appendChild(app.view);

//Adding Background Music By Using Howler.js
const sound = new Howl({
    src: ['./sounds/backgroundsound.mp3'],
    loop: true,
    volume: 0.3
})

sound.play();


const Graphics = PIXI.Graphics;

//Creating Particle Container for the Images from the Spritesheet
const particleContainer = new PIXI.ParticleContainer(1000, {
    position: true,
    rotation: true,
    vertices: true,
    tint: true,
    uvs: true
});

const loader = PIXI.Loader.shared;

//Loading Images from Spritesheet
loader.add('tileset', './images/spritesheet.json')
    .load(setup);

function setup(loader, resources) {
    const textures = [];
    for (let i = 1; i < 13; i++) {
        const texture = PIXI.Texture.from(`drag${i}.png`);
        textures.push(texture);
    }

    //When a Arrow key is detected, the Sprite moves Up, 
    //Down, Left, Right or Diagnaly on the X-axis/Y-axis depeding on 
    //which Arrow Key/Combination of Arrow Keys is used

    let keysdown = {};

    document.addEventListener('keydown', function(evt) {

        console.log(evt);
        keysdown[evt.key] = true;

        // if (e.key === 'ArrowRight')
        //     drag.x += 10;
        // if (e.key === 'ArrowLeft')
        //     drag.x -= 10;
        // if (e.key === 'ArrowDown')
        //     drag.y += 10;
        // if (e.key === 'ArrowUp')
        //     drag.y -= 10;

        if (keysdown["ArrowUp"] === true && keysdown["ArrowLeft"] === true) {
            drag.y -= 10;
            drag.x -= 10;

        } else if (keysdown["ArrowUp"] === true && keysdown["ArrowRight"] === true) {
            drag.y -= 10;
            drag.x += 10;

        } else if (keysdown["ArrowDown"] === true && keysdown["ArrowLeft"] === true) {
            drag.y += 10;
            drag.x -= 10;

        } else if (keysdown["ArrowDown"] === true && keysdown["ArrowRight"] === true) {
            drag.y += 10;
            drag.x += 10;

        } else if (keysdown["ArrowUp"] === true) {
            drag.y -= 10;

        } else if (keysdown["ArrowDown"] === true) {
            drag.y += 10;

        } else if (keysdown["ArrowRight"] === true) {
            drag.x += 10;

        } else if (keysdown["ArrowLeft"] === true) {
            drag.x -= 10;
        }
    })

    document.addEventListener('keyup', function(evt) {
        keysdown[evt.key] = false;
    })

    //Creating an Animated Sprite
    const drag = new PIXI.AnimatedSprite(textures);
    drag.position.set(800, 300);
    drag.scale.set(1.5, 1.5);
    app.stage.addChild(drag);
    drag.animationSpeed = 0.12;
    drag.play();
};

//Loading Clouds and Setting them to match the screen width/height and repeating the image when it goes off screen
const cloudsTexture = PIXI.Texture.from('./images/Clouds.png');
const cloudsSprite = new PIXI.TilingSprite(
    cloudsTexture,
    app.screen.width,
    app.screen.height,
);

cloudsSprite.tileScale.set(1.2, 1.2);

app.ticker.add(function() {
    cloudsSprite.tilePosition.x += 1;
})

app.stage.addChild(cloudsSprite);

//Loading and Setting up the Ground
const bgSprite = PIXI.Sprite.from('./images/background.png');

bgSprite.position.set(-50, 500);
bgSprite.scale.set(4, 4)

app.stage.addChild(bgSprite);