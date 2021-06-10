export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, initialFrame) {
        super(scene, x, y, texture, initialFrame)
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(0.9);
        
        this.horizontalVelocity = 200;
        this.jumpForce= 600;

        this.controls = scene.input.keyboard.createCursorKeys();

        this.initialFrame = 6;
        this.jumpFrame = 5;

    }

    update(time) {

        let onGround = this.body.blocked.down || this.body.touching.down;

        if(this.controls.left.isDown) {
            this.setVelocityX(-this.horizontalVelocity);
            this.flipX = true;
            if(!this.anims.isPlaying && onGround) {
                this.anims.play("walking");
            }
        } else if (this.controls.right.isDown) {
            this.setVelocityX(this.horizontalVelocity);
            this.flipX = false;
            if(!this.anims.isPlaying && onGround) {
                this.anims.play("walking");
            }
        } else {
            this.setVelocityX(0);
            if(this.anims.isPlaying && onGround) {
                this.anims.stop("walking");
                this.setFrame(this.initialFrame);
            }
        }

        if(!onGround) {
            this.setFrame(this.jumpFrame);
        } 

        if(onGround && this.controls.space.isDown) {
            this.setVelocityY(-this.jumpForce);
        }
    }
}